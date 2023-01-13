const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const { randomBytes } = require("crypto");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
    const commentId = randomBytes(4).toString("hex");

    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id: commentId, content, status: "pending" });

    commentsByPostId[req.params.id] = comments;

    // sending events to event bus
    await axios.post("http://event-bus-clusterip-service:3005/events", {
        type: "commentCreated",
        data: {
            postId: req.params.id,
            id: commentId,
            content,
            status: "pending",
        },
    });

    res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
    const { type, data } = req.body;

    if (type === "commentModerated") {
        const { postId, id, content, status } = data;

        const comments = commentsByPostId[postId];

        const commentToUpdate = comments.find((comment) => {
            return comment.id === id;
        });

        commentToUpdate.status = status;

        // sending events to event bus
        await axios.post("http://event-bus-clusterip-service:3005/events", {
            type: "commentUpdated",
            data: {
                postId,
                id,
                content,
                status,
            },
        });
    }

    res.send({});
});

app.listen(3002, () => {
    console.log(`comments service listing on port 3002`);
});
