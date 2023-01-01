import React, { useState, useEffect } from "react";
import axios from "axios";

import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = (props) => {
    const [posts, setPosts] = useState({});
    const [render, setRender] = useState(false);

    const fetchPosts = async (e) => {
        // const response = await axios.get('http://127.0.0.1:3001/posts');
        const response = await axios.get("http://127.0.0.1:3003/posts"); //using query service

        setPosts(response.data);
        setRender(!render);
    };

    useEffect(() => {
        fetchPosts();
    }, [props.render]);

    //Object.values gives back an array of post object
    const postsToRender = Object.values(posts).map((post) => {
        return (
            <div
                className="card"
                style={{ width: "30%", marginBottom: "20px" }}
                key={post.id}
            >
                <div className="card-body">
                    <h3>{post.title}</h3>
                    {/* <CommentList postId={post.id} render={render} /> */}
                    <CommentList comments={post.comments} />
                    {/* <CommentCreate postId={post.id} render={setRender} /> */}
                    <CommentCreate postId={post.id} fetch={fetchPosts} />
                </div>
            </div>
        );
    });

    return (
        <>
            <div className="d-flex flex-row flex-wrap justify-content-between">
                {postsToRender}
            </div>
        </>
    );
};

export default PostList;
