import React, { useState, useEffect } from "react";
import firebase from "../shared/firebase";
import "./styles/Login.scss";
import { FcGoogle } from "react-icons/fc";
import Profile from "../pages/Profile";

function Login({ user, setUser, setLoc, setAuth, handleLogout, auth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(true);

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
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });
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
                  {hasAccount ? (
                    <>
                      <button onClick={handleLogin} className="btn-sign">
                        Sign in
                      </button>

                      <p className="message-account">
                        Don't have an account?
                        <span onClick={() => setHasAccount(!hasAccount)}>
                          Sign Up
                        </span>
                      </p>
                    </>
                  ) : (
                    <>
                      <button onClick={handleSignup} className="btn-sign">
                        Sign Up
                      </button>
                      <p className="message-account">
                        Have an account?
                        <span onClick={() => setHasAccount(!hasAccount)}>
                          Sign in
                        </span>
                      </p>
                    </>
                  )}
                </div>
              </div>
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
