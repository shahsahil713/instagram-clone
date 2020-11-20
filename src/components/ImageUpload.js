import { Button, LinearProgress, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { db, storage } from "../config/firbase";
import firebase from "firebase";

function ImageUpload({ username }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //   progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (err) => {
        //error function
        console.log(err);
        alert(err.message);
      },
      () => {
        //complete function
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //post image inside database
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };
  return (
    <div className="imageupload">
      <div className="imageupload__input">
        <TextField
          type="text"
          label=""
          placeholder="Enter Caption"
          className="signup__body__feild"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          variant="outlined"
        />
        <Button variant="contained" component="label">
          Upload Photo
          <input type="file" hidden onChange={handleChange} />
        </Button>
      </div>
      <progress
        type="progress"
        className="imageupload__progress"
        value={progress}
        max="100"
      />
      <Button
        variant="contained"
        className="imageupload__btn"
        color="primary"
        onClick={handleUpload}
      >
        Post
      </Button>
    </div>
  );
}

export default ImageUpload;
