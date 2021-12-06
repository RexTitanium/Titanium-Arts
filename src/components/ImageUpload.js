import React, { useEffect, useState } from "react";
import { storage, db } from "../shared/firebase";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import * as FcIcons from "react-icons/fc";
import "./styles/ImageUpload.scss";
import { makeStyles } from "@material-ui/core/styles";
import { LinearProgress, Snackbar, Button } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import InputTag from "./InputTag";
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ImageUpload({ user, handleLogout, auth }) {
  let history = useHistory();

  const classes = useStyles();
  const [submit, setSubmit] = useState({ sub: false, message: "" });
  const [error, setError] = useState({ err: false, message: "" });
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [details, setDetails] = useState({
    title: "",
    image: "",
    link: "",
    description: "",
    text: "",
    tags: [],
    featured: false,
    isNew: false,
    isBanner: false,
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSubmit({ sub: false });
    setError({ err: false });
  };

  const handleText = (e) => {
    setDetails({
      ...details,
      [e.target.name]:
        e.target.value == "true" ? e.target.checked : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    db.collection("CardData")
      .add({ ...details })
      .then(() => {
        setSubmit({
          sub: true,
          message: `Successfully posted ${details.title} card`,
        });
      })
      .catch((error) => {
        setError({
          err: true,
          message: "Could not post card. Retry after some time",
        });
      });
    resetForm();
  };

  const resetForm = () => {
    setDetails({
      title: "",
      link: "",
      description: "",
      text: "",
      tags: [],
      featured: false,
      isNew: false,
      isBanner: false,
    });
    setImage(null);
    setUrl("");
    setProgress(0);
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (image == null) {
      setError({ err: true, message: "No file selected" });
    } else {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setProgress(
            Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          );
        },
        (error) => {
          setError({ err: true, message: { error } });
        },
        (complete) => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              setUrl(url);
              setDetails({ ...details, link: url, image: url });
              setSubmit({ sub: true, message: "Image Uploaded Successfully" });
            });
        }
      );
    }
  };

  return (
    <div className="data-form">
      <div className="data-wrapper">
        <div className="go-back-div">
          <a href="/login" className="go-back">
            <span>
              <FcIcons.FcAdvance />
            </span>{" "}
            Go Back
          </a>
        </div>
        <div className="image-upload">
          <div className={classes.root}>
            <LinearProgress variant="determinate" value={progress} />
          </div>
          <div className="image-upload-container">
            <div className="image-upload-wrapper">
              <input
                accept="image/*"
                className="file-upload"
                id="icon-button-file"
                type="file"
                onChange={handleChange}
              />
              <label htmlFor="icon-button-file">
                <IconButton aria-label="upload picture" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
              <Button className="btn-upload" onClick={handleUpload}>
                Upload
              </Button>
            </div>
            <img className="image-uploaded" src={url} />
          </div>
        </div>
        <div>
          <form
            className="card-data-form"
            onSubmit={handleSubmit}
            name="card-data"
          >
            <input type="hidden" name="form-name" value="data" />
            <label>
              {" "}
              Image Title:
              <input
                type="text"
                name="title"
                value={details.title}
                onChange={handleText}
              />
            </label>
            <label>
              {" "}
              Image Description:
              <input
                type="text"
                name="description"
                value={details.description}
                onChange={handleText}
              />
            </label>
            <label>
              {" "}
              Image Url:
              <input type="text" name="link" value={details.link} disabled />
            </label>
            <label>
              {" "}
              Softwares Used:
              <input
                type="text"
                name="text"
                value={details.text}
                onChange={handleText}
              />
            </label>
            <label>
              {" "}
              New Post?:
              <input
                type="checkbox"
                name="isNew"
                value="true"
                onChange={handleText}
                checked={details.isNew}
              />
            </label>
            <label>
              {" "}
              Featured?:
              <input
                type="checkbox"
                name="featured"
                value="true"
                onChange={handleText}
                checked={details.featured}
              />
            </label>
            <label>
              {" "}
              Publish on Banner?:
              <input
                type="checkbox"
                name="isBanner"
                value="true"
                onChange={handleText}
                checked={details.isBanner}
              />
            </label>
            <label>
              <InputTag setDetails={setDetails} details={details} />
            </label>
            <br />
            <button type="submit">Submit</button>
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </form>
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            open={submit.sub}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="success">
              {submit.message}
            </Alert>
          </Snackbar>
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            open={error.err}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="error">
              {error.message}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
}

export default ImageUpload;
