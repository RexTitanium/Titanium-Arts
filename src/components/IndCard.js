import React, { useState, useEffect } from "react";
import "./styles/IndCard.scss";
import { motion } from "framer-motion";
import Cards from "../components/Cards";
import Avatar from "@mui/material/Avatar";
import { db } from "../shared/firebase";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function IndCard({ user, comments, cards, setLoc, similar }) {
  useEffect(() => {
    setLoc(1);
  });

  const [submit, setSubmit] = useState({ sub: false, message: "" });
  const [error, setError] = useState({ err: false, message: "" });
  const [filterComments, setFilterComments] = useState(null);
  const [commentData, setCommentData] = useState({
    title: "",
    comment: "",
    displayName: "",
    photoURL: "",
    verified: false,
  });

  const [checkout, setCheckOut] = useState([]);
  let n = 2;
  const softwaresused = cards && cards?.text.split(", ");
  const defaultText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      setError({ err: false });
    }

    setError({ err: false });
  };

  const handleText = (e) => {
    setCommentData({
      title: cards && cards.title,
      comment: e.target.value,
      displayName: user.displayName,
      photoURL: user.photoURL,
      verified: false,
    });
  };

  const handleSubmit = (e) => {
    if (user) {
      e.preventDefault();

      db.collection("Comments")
        .add({ ...commentData })
        .then(() => {
          setSubmit({
            sub: true,
            message: `Successfully posted comment`,
          });
          setCommentData({
            title: "",
            comment: "",
            displayName: "",
            photoURL: "",
            verified: false,
          });
        })
        .catch((error) => {
          setError({
            err: true,
            message: "Could not post comment. Retry after some time",
          });
        });
    } else {
      setError({
        err: true,
        message: "You have not logged in",
      });
      console.log(error);
    }
  };

  useEffect(() => {
    function setBg() {
      setFilterComments(
        comments &&
          comments.filter(
            (comment) =>
              comment.title === cards.title && comment.verified === true
          )
      );

      setCheckOut(
        similar &&
          similar
            .sort(function () {
              return 0.5 - Math.random();
            })
            .slice(0, n)
      );
    }
    setBg();
  }, [setCheckOut]);
  console.log(filterComments);
  return (
    <div className="card__container">
      <div className="indcard-container">
        <div className="indcard-wrapper">
          <div className="indcard-image-card">
            <div className="indcard-image">
              <img src={cards && cards.image} />
            </div>
            <div className="indcard-info">
              <div className="indcard-heading">
                <div className="indcard-title">
                  <h1>{cards && cards.title}</h1>
                </div>
                <div className="indcard-softwares">
                  {softwaresused?.map((software) => {
                    return (
                      <div className="softwares-used">
                        <h1>{software}</h1>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="indcard-description">
                <p>
                  {cards?.description == "" ? defaultText : cards?.description}
                </p>
              </div>
            </div>
          </div>
          <div className="indcard-side">
            <div className="indcard-comment-container">
              <div className="indcard-comment-title">
                <h1>COMMENTS</h1>
              </div>
              <div className="indcard-top-comments">
                {filterComments === null ? (
                  <div></div>
                ) : (
                  <div className="indcard-comment-window">
                    {filterComments &&
                      filterComments?.map((comment) => {
                        return (
                          <div className="indcard-commentbox">
                            <div className="indcard-comment-avatar">
                              <Avatar
                                alt="Samyak Shah"
                                src={comment.photoURL}
                                sx={{ width: 40, height: 40 }}
                              />
                            </div>
                            <div className="indcard-comment-text">
                              <div className="indcard-comment-name">
                                <h1>{comment.displayName}</h1>
                              </div>
                              <div className="indcard-comment">
                                <p>{comment.comment}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
                <div className="indcard-enter-comment">
                  <textarea
                    className="indcard-commentbox"
                    placeholder="Enter comment"
                    value={commentData.comment}
                    onChange={handleText}
                  />
                  <div className="indcard-comment-submit">
                    <a href="/login">
                      <Avatar src={user.photoURL} />
                    </a>
                    <button className="btn-upload" onClick={handleSubmit}>
                      Submit
                    </button>
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
            <div className="indcard-explore-container">
              <div className="check-other">
                <motion.h1
                  initial={{ x: "100vw" }}
                  animate={{ x: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 60,
                    delay: 1,
                  }}
                >
                  EXPLORE MORE
                </motion.h1>
                <div className="check-wrapper">
                  {checkout?.map((card) => {
                    return (
                      <motion.div
                        className="check-container"
                        initial={{ x: "100vw" }}
                        animate={{ x: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 60,
                          delay: 1,
                        }}
                      >
                        <Cards cards={card} />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndCard;
