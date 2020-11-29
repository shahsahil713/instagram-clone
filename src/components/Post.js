import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import { db } from "../config/firbase";
import { Button, TextField } from "@material-ui/core";
import firebase from "firebase";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

function Post({ postId, username, imageUrl, caption, user }) {
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [comment, setComment] = useState("");
  let unsubscribe;
  useEffect(() => {
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, []);
  useEffect(() => {
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("likes")
        .onSnapshot((snapshot) => {
          setLikes(
            snapshot.docs.map((doc) => ({ id: doc.id, like: doc.data() }))
          );
        });
    }
    return () => {
      unsubscribe();
    };
  }, []);
  const postComment = (e) => {
    e.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };
  const handleLiked = (findLike) => {
    if (findLike !== null) {
      db.collection("posts")
        .doc(postId)
        .collection("likes")
        .doc(findLike)
        .delete();
    } else {
      db.collection("posts").doc(postId).collection("likes").add({
        like: true,
        username: user.displayName,
      });
    }
  };
  let findLike = null;
  return (
    <div className="post">
      <div className="post__header">
        <Avatar alt={username} src="s.jpg" className="post__avatar" />
        <h3>{username}</h3>
      </div>

      <img className="post__image" src={imageUrl} />
      <div className="likeBtnDiv">
        <div style={{ display: "none" }}>
          {likes.map(({ id, like }) => (
            <span key={id}>
              {like.username === user.displayName ? (findLike = id) : null}
            </span>
          ))}
        </div>
        {findLike !== null ? (
          <FavoriteIcon
            className="likedBtn"
            onClick={() => handleLiked(findLike)}
          />
        ) : (
          <FavoriteBorderIcon
            className="likeBtn"
            onClick={() => handleLiked(findLike)}
          />
        )}
        <span>{likes.length} Likes </span>
        {/* {
          if(user.displayName === )
        } */}
      </div>

      <h4 className="post__footer">
        <strong>{username}</strong> {caption}
      </h4>

      {user && (
        <>
          <div className="post_comments">
            {comments.map((comment, index) => {
              return (
                <p key={index}>
                  <strong>{comment.username} </strong>
                  {comment.text}
                </p>
              );
            })}
          </div>
          <form className="comment-box">
            <TextField
              type="text"
              label=""
              placeholder="Comment"
              className="commentinput"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              variant="outlined"
            />
            <Button
              variant="contained"
              className="comment_btn"
              color=""
              onClick={postComment}
              disable={!comment}
              type="submit"
            >
              Post
            </Button>
          </form>
        </>
      )}
    </div>
  );
}

export default Post;
