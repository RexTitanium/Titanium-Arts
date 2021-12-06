import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import ImageUpload from "../components/ImageUpload";
import "./styles/profile.scss";
import { ProfileBackground } from "../shared/data";
import { LinearProgress, Snackbar, Button } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Avatar from "@mui/material/Avatar";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Profile({ user, handleLogout, auth }) {
  const [upload, setUpload] = useState(false);
  const [profileBanner, setProfileBanner] = useState("");
  const [error, setError] = useState({ err: false, message: "" });

  useEffect(() => {
    function setBg() {
      setProfileBanner(
        ProfileBackground[Math.floor(Math.random() * ProfileBackground.length)]
      );
    }
    setBg();
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      setError({ err: false });
    }

    setError({ err: false });
  };

  const handleUpload = (e) => {
    if (user.email !== "s4samyak@gmail.com") {
      setError({ err: true, message: "Only Admins Can Upload at the moment" });
    } else {
      setUpload(true);
    }
  };

  if (upload) {
    return (
      <div>
        <ImageUpload handleLogout={handleLogout} auth={auth} user={user} />
      </div>
    );
  } else {
    return (
      <div className="profile-page">
        <div className="profile-background">
          <img src={profileBanner} />
        </div>

        <div className="profile-page-container">
          <div className="user-id">
            <div className="user-image">
              <Avatar
                alt={user.displayName}
                src={user.photoURL}
                sx={{ width: 100, height: 100 }}
              />
            </div>
            <h1 className="user-name">{user.displayName}</h1>
            <div className="profile-buttons">
              <div className="button-wrapper2">
                <button className="button-upload" onClick={handleLogout}>
                  Logout
                </button>
              </div>
              <div className="button-wrapper">
                <button
                  className="button-upload"
                  onClick={(e) => {
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                    handleUpload();
                  }}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
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
    );
  }
}

export default Profile;
