import React, { useState, useEffect } from "react";
import firebase from "../shared/firebase";
import { storage, db } from "../shared/firebase";
import { updateProfile } from "firebase/auth";
import "./styles/Login.scss";
import { FcGoogle } from "react-icons/fc";
import Profile from "../pages/Profile";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { LinearProgress, Snackbar, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

function Login({ user, setUser, setLoc, setAuth, handleLogout, auth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(true);
  const [error, setError] = useState({ err: false, message: "" });
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [submit, setSubmit] = useState({ sub: false, message: "" });
  const classes = useStyles();
  console.log(user);
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSubmit({ sub: false });
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
              setSubmit({ sub: true, message: "Image Uploaded Successfully" });
            });
        }
      );
    }
  };

  const clearInput = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleLogin = (e) => {
    setAuth(false);
    clearErrors();
    if (email == "s4samyak@gmail.com") {
      setAuth(true);
    }
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  const handleSignup = (e) => {
    clearErrors();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((authenticate) => {
        return authenticate.user.updateProfile({
          displayName: displayName,
          photoURL: url ? url : "",
        });
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  const authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setEmail(user.email);
        if (email == "s4samyak@gmail.com") {
          setAuth(true);
        }
        clearInput();
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  const forgotPassword = () => {
    if (email === "") {
      setEmailError("Enter email");
    } else {
      setEmailError("");
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          setSubmit({
            sub: true,
            message: "Link sent to your mail to reset your password",
          });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ..
        });
    }
  };

  const handleGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        var user = result.user;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    authListener();
    setLoc(4);
  }, []);

  if (!user) {
    return (
      <div>
        <div className="login-form">
          <div className="login-wrapper">
            <div className="login-content">
              <div className="login-group">
                {hasAccount ? (
                  <>
                    <div className="group1">
                      <input
                        type="text"
                        name="user"
                        autoFocus
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <span className="highlight1"></span>
                      <span className="bar1"></span>
                      <label>Email</label>
                    </div>
                    <p className="errMess">{emailError}</p>
                    <div className="group1">
                      <input
                        type="password"
                        name="password"
                        value={password}
                        required
                        autoFocus
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span className="highlight1"></span>
                      <span className="bar1"></span>
                      <label>Password</label>
                    </div>
                    <p className="errMess">{passwordError}</p>
                    <div className="btn-container">
                      <button onClick={handleLogin} className="btn-sign">
                        Sign in
                      </button>

                      <p className="message-account">
                        Don't have an account?
                        <span onClick={() => setHasAccount(!hasAccount)}>
                          Sign Up
                        </span>
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="image-upload-wrapper">
                      <div className={classes.root}>
                        <LinearProgress
                          variant="determinate"
                          value={progress}
                        />
                      </div>
                      <input
                        accept="image/*"
                        className="file-upload"
                        id="icon-button-file"
                        type="file"
                        onChange={handleChange}
                      />
                      <label htmlFor="icon-button-file">
                        <IconButton
                          aria-label="upload picture"
                          component="span"
                        >
                          <PhotoCamera />
                        </IconButton>
                      </label>
                      <Button className="btn-upload" onClick={handleUpload}>
                        Upload
                      </Button>
                    </div>
                    <div className="group1">
                      <input
                        type="text"
                        name="firstName"
                        autoFocus
                        required
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                      />
                      <span className="highlight1"></span>
                      <span className="bar1"></span>
                      <label>Display Name</label>
                    </div>
                    <div className="group1">
                      <input
                        type="text"
                        name="user"
                        autoFocus
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <span className="highlight1"></span>
                      <span className="bar1"></span>
                      <label>Email</label>
                    </div>
                    <p className="errMess">{emailError}</p>
                    <div className="group1">
                      <input
                        type="password"
                        name="password"
                        value={password}
                        required
                        autoFocus
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span className="highlight1"></span>
                      <span className="bar1"></span>
                      <label>Password</label>
                    </div>
                    <p className="errMess">{passwordError}</p>
                    <div className="btn-container">
                      <button onClick={handleSignup} className="btn-sign">
                        Sign Up
                      </button>
                      <p className="message-account">
                        Have an account?
                        <span onClick={() => setHasAccount(!hasAccount)}>
                          Sign in
                        </span>
                      </p>
                    </div>
                  </>
                )}
              </div>
              <div className="all-buttons">
                <div className="button-group-signup">
                  <button onClick={handleGoogle} className="btn-googleSign">
                    <span>
                      <FcGoogle />{" "}
                    </span>
                    Sign In With Google
                  </button>
                  <button onClick={forgotPassword} className="btn-forgot-pass">
                    Forgot Password?
                  </button>
                </div>
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
              </div>
            </div>
            <div className="empty-block"></div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Profile user={user} handleLogout={handleLogout} auth={auth} />
      </div>
    );
  }
}

export default Login;
