import React, { useState, useEffect } from "react";
import axios from "axios";

const CommentList = ({ postId, render, comments }) => {
    // const [comments, setComments] = useState([]);

    // const fetchComments = async (e) => {
    //     const response = await axios.get(
    //         `http://127.0.0.1:3002/posts/${postId}/comments`
    //     );

    //     setComments(response.data);
    // };

    // useEffect(() => {
    // fetchComments();
    // }, [render]);

    const commentsToRender = comments?.map((comment) => {
        let content;

        if (comment.status === "approved") {
            content = comment.content;
        }

        if (comment.status === "pending") {
            content = "comment under moderation";
        }

        if (comment.status === "rejected") {
            content = "comment rejected";
        }

        return <li key={comment.id}>{content}</li>;
    });

    return (
        <>
            <ul>{commentsToRender}</ul>
        </>
    );
};

export default CommentList;
