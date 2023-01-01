import React, { useState } from "react";

import axios from "axios";

import PostList from "./PostList";

const PostCreate = () => {
    const [title, setTitle] = useState("");
    const [render, setRender] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post("http://127.0.0.1:3001/posts", {
            title,
        });

        setTitle("");
        setRender(!render);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <br />
                <button type="submit" className="btn btn-dark">
                    Submit
                </button>
            </form>
            <hr />
            <h1>Posts</h1>
            <PostList render={render} />
        </>
    );
};

export default PostCreate;
