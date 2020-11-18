import React, { useState } from "react";
import { storage } from "../firebase";
import { useAuth } from "../contexts/AuthContext"
import { Form, Button, Card, Alert } from "react-bootstrap"

export default function FileUpload() {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(null);
  const { currentUser, updateProfilePicture } = useAuth()

  const [url, setUrl] = useState();
  function handleChange(e) {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }
  function handleUpload(e) {
    if(!image){
      return
    }
    const uploadTask = storage.ref(`users/${currentUser.uid}/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.error(error);
      },
      () => {
        storage
          .ref(`users/${currentUser.uid}`)
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            updateProfilePicture(url)
            setUrl(url);
          }).catch(err => console.error("callbackError", err));
      }
    );
  }

  return (
    <div>
      <Form>
      <Form.Group>
      <progress value={progress} max="100" />
      <Form.File type="file" onChange={handleChange} />
      <Button style={{marginTop: 4}} onClick={handleUpload}>upload</Button>
      <img src={url} height="200px" width="360px" />
      </Form.Group>
      </Form>
    </div>
  );
}
