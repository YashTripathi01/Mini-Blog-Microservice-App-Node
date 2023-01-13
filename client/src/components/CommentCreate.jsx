import React, { useState } from "react";

import axios from "axios";

const CommentCreate = ({ postId, render, fetch }) => {
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post(`http://posts.com/posts/${postId}/comments`, {
            content,
        });

        setContent("");
        // render(true);
        fetch();
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>New Comment</label>
                    <input
                        type="text"
                        className="form-control"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <br />
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </>
    );
};

export default CommentCreate;
