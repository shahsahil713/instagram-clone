import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Post from "./Post";
import { db } from "../config/firbase";

function Posts({ user }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
        );
      });
  }, []);
  return (
    <div className="posts">
      {posts.map(({ id, post }) => (
        <Post
          key={id}
          username={post.username}
          imageUrl={post.imageUrl}
          caption={post.caption}
          postId={id}
          user={user}
        />
      ))}
    </div>
  );
}

export default Posts;
