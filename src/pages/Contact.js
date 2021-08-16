import React, { useEffect, useState } from "react";
import "./styles/home.scss";
import { motion } from "framer-motion";
import { Tooltip, Zoom, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import "./styles/contact.scss";
import { db } from "../shared/firebase";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Contact({ banner, setLoc }) {
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState(false);
  const [details, setDetails] = useState([
    { name: "", email: "", message: "" },
  ]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSubmit(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    db.collection("allcontacts")
      .add({ ...details })
      .then(() => {
        setSubmit(true);
      })
      .catch((error) => {
        setError(true);
      });

    resetForm();
  };
  const resetForm = () => {
    setDetails({
      name: "",
      email: "",
      message: "",
    });
  };

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setLoc(3);
  });
  return (
    <div className="contact-container">
      <div className="header-container">
        <img className="header-image" src={banner} alt="backdrop" />
        <div className="header-text">
          <h1>CONTACT</h1>
        </div>

        <div className="empty"></div>
      </div>

      <div className="container form-group">
        <motion.div
          initial={{ x: "-50vw" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 90 }}
          className="col-12 col-md-5 form-header"
        >
          <h1>How to Contact :</h1>
          <motion.div
            initial={{ y: "-10vw", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 150, delay: 0.5 }}
          >
            <p>
              If you have any questions or want to collaborate just fill out the
              form, and I will answer back to you shortly. If you want to
              contact me directly, you can mail me at
            </p>
            <Tooltip TransitionComponent={Zoom} title="Gmail" arrow>
              <a
                href="mailto:s4samyak@gmail.com"
                className="mail-link"
                style={{ textDecoration: "none" }}
              >
                {" "}
                s4samyak@gmail.com
              </a>
            </Tooltip>
          </motion.div>
        </motion.div>

        <div className=" col-15 col-md-5">
          <div className="contact-form">
            <form
              className="contact-form"
              onSubmit={handleSubmit}
              name="contact"
            >
              <input type="hidden" name="form-name" value="contact" />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 50, delay: 0.2 }}
                className="group"
              >
                <input
                  type="text"
                  name="name"
                  value={details.name}
                  onChange={handleChange}
                  required
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Name</label>
              </motion.div>

              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 50, delay: 0.4 }}
                className="group"
              >
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={details.email}
                  onChange={handleChange}
                  required
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label for="email">Email</label>
              </motion.div>
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 50, delay: 0.6 }}
                className="group"
              >
                <input
                  type="text"
                  name="message"
                  required
                  className="textbox"
                  value={details.message}
                  onChange={handleChange}
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Message</label>
              </motion.div>
              <div className="col-md-3 col-sm-3 col-xs-6 buttons">
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.45, delay: 1 }}
                  type="submit"
                  className="btn btn-sm animated-button send"
                >
                  Submit
                </motion.button>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.45, delay: 1 }}
                  type="button"
                  className="btn btn-sm animated-button clear"
                  onClick={resetForm}
                >
                  Clear
                </motion.button>
              </div>
            </form>

            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              open={submit}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert onClose={handleClose} severity="success">
                You have successfully submitted the form
              </Alert>
            </Snackbar>
            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              open={error}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert onClose={handleClose} severity="error">
                The form could not be submitted. Retry after some time
              </Alert>
            </Snackbar>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
