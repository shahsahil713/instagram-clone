import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Post from "./Post";
import { db } from "../config/firbase";
import InfiniteScroll from "react-infinite-scroll-component";

function Posts({ user }) {
  // console.log(user);
  const [posts, setPosts] = useState([]);
  const [lastDoc, setLastDoc] = useState();
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .limit(2)
      .onSnapshot((snapshot) => {
        const lDoc = snapshot.docs[snapshot.docs.length - 1];
        setPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
        );
        setLastDoc(lDoc);
      });
    // db.collection("posts")
    //   .orderBy("id", "desc")
    //   .limit(2)
    //   .get()
    //   .then((collection) => {
    //     const p = collection.docs.map((doc) => ({
    //       id: doc.id,
    //       post: doc.data(),
    //     }));
    //     setPosts(p);
    //   });
  }, []);

  // useEffect(() => {
  //   db.collection("posts")
  //     .orderBy("timestamp", "desc")
  //     .startAfter(lastVisible)
  //     .limit(2)
  //     .onSnapshot((snapshot) => {
  //       // lastVisible += snapshot.docs.length - 1;
  //       // console.log(lastVisible);
  //       setlastVisible(lastVisible + (snapshot.docs.length - 1));

  //       setPosts(
  //         snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
  //       );
  //     });
  // }, [qorder]);
  // next = db
  //   .collection("posts")
  //   .orderBy("timestamp", "desc")
  //   .startAfter(lastVisible)
  //   .limit(2);
  const fetchMore = () => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .startAfter(lastDoc)
      .limit(2)
      .onSnapshot((snapshot) => {
        const lDoc = snapshot.docs[snapshot.docs.length - 1];
        const newposts = snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }));
        setPosts((posts) => [...posts, ...newposts]);
        console.log(posts);
        setLastDoc(lDoc);
      });
  };
  return (
    <InfiniteScroll dataLength={posts.length} next={fetchMore} hasMore={true}>
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
    </InfiniteScroll>
  );
}

export default Posts;
