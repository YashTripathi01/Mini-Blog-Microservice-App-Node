const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvents = (type, data) => {
    if (type === "postCreated") {
        const { id, title } = data;

        posts[id] = { id, title, comments: [] };
    }
    if (type === "commentCreated") {
        const { postId, id, content, status } = data;

        const post = posts[postId];
        post.comments.push({ id, content, status });
    }
    if (type === "commentUpdated") {
        const { postId, id, content, status } = data;

        const post = posts[postId];
        const commentToUpdate = post.comments.find((comment) => {
            return comment.id === id;
        });

        commentToUpdate.status = status;
        commentToUpdate.content = content;
    }
};

app.get("/posts", (req, res) => {
    res.send(posts);
});

// processes the data received from event bus and store it
app.post("/events", (req, res) => {
    const { type, data } = req.body;

    handleEvents(type, data);

    // console.log(posts);

    res.send({});
});

app.listen(3003, async () => {
    console.log(`query service listing on port 3003`);

    try {
        // to get all the events after coming back online
        const response = await axios.get(
            "http://event-bus-clusterip-service:3005/events"
        );

        for (let event of response.data) {
            console.log("processing event:", event.type);

            handleEvents(event.type, event.data);
        }
    } catch (error) {
        console.log(error.message);
    }
});
