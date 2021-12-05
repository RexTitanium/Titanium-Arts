import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import ImageUpload from "../components/ImageUpload";
import "./styles/profile.scss";
import { ProfileBackground } from "../shared/data";

function Profile({ user, handleLogout, auth }) {
  const [upload, setUpload] = useState(false);
  const [profileBanner, setProfileBanner] = useState("");

  useEffect(() => {
    function setBg() {
      setProfileBanner(
        ProfileBackground[Math.floor(Math.random() * ProfileBackground.length)]
      );
    }
    setBg();
  });

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
            <img className="user-image" src={user.photoURL} />
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
                    setUpload(true);
                  }}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
