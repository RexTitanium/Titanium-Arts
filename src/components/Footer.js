import React from "react";
import { Link } from "react-router-dom";
import "./styles/Footer.css";
import { makeStyles } from "@material-ui/core/styles";
import { Tooltip, Zoom } from "@material-ui/core";

const instaBootstrap = makeStyles((theme) => ({
  arrow: {
    color: "rgb(255, 79, 138)",
  },
  tooltip: {
    backgroundColor: "rgb(255, 79, 138)",
    color: "white",
    fontFamily: "Poppins",
  },
}));
const linkedinBootstrap = makeStyles((theme) => ({
  arrow: {
    color: "rgb(45, 146, 219)",
  },
  tooltip: {
    backgroundColor: "rgb(45, 146, 219)",
    color: "white",
    fontFamily: "Poppins",
  },
}));

const githubBootstrap = makeStyles((theme) => ({
  arrow: {
    color: "rgb(58, 58, 58)",
  },
  tooltip: {
    backgroundColor: "rgb(58, 58, 58)",
    color: "white",
    fontFamily: "Poppins",
  },
}));

const twitterBootstrap = makeStyles((theme) => ({
  arrow: {
    color: "rgb(0, 174, 255)",
  },
  tooltip: {
    backgroundColor: "rgb(0, 174, 255)",
    color: "white",
    fontFamily: "Poppins",
  },
}));

function GithubTooltip(props) {
  const classes = githubBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

function TwitterTooltip(props) {
  const classes = twitterBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

function InstaTooltip(props) {
  const classes = instaBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

function LinkedinTooltip(props) {
  const classes = linkedinBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

function Footer(props) {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="row footer-wrapper">
          <div className="social">
            <h4>TITANIUM ARTS</h4>
            <div className=" logos">
              <InstaTooltip
                TransitionComponent={Zoom}
                title="Instagram"
                arrow
                placement="bottom-start"
              >
                <a
                  className="btn btn-social-icon btn-instagram"
                  href="https://www.instagram.com/titaniumarts/"
                >
                  <i className="fa fa-instagram fa-lg"></i>
                </a>
              </InstaTooltip>
              <LinkedinTooltip
                TransitionComponent={Zoom}
                title="Linkedin"
                arrow
                placement="bottom-start"
              >
                <a
                  className="btn btn-social-icon btn-linkedin"
                  href="https://www.linkedin.com/in/samyak-shah-5312a31b0"
                >
                  <i className="fa fa-linkedin fa-lg"></i>
                </a>
              </LinkedinTooltip>
              <GithubTooltip
                TransitionComponent={Zoom}
                title="Github"
                arrow
                placement="bottom-start"
              >
                <a
                  className="btn btn-social-icon btn-github"
                  href="https://www.github.com/RexTitanium"
                  style={{ borderRadius: "50%" }}
                >
                  <i className="fa fa-github fa-lg"></i>
                </a>
              </GithubTooltip>
              <TwitterTooltip
                TransitionComponent={Zoom}
                title="Twitter"
                arrow
                placement="bottom-start"
              >
                <a
                  className="btn btn-social-icon btn-twitter"
                  href="https://www.twitter.com/sumyuck"
                >
                  <i className="fa fa-twitter fa-lg"></i>
                </a>
              </TwitterTooltip>
            </div>
          </div>

          <div className="codes">
            <h5>CODES / PACKAGES USED</h5>
            <ul className="list-unstyled links2">
              <li>&#60;React JS&#62;</li>

              <li>&#60;Font-Awesome&#62;</li>
              <li>&#60;SASS&#62;</li>
              <li>&#60;Material UI&#62;</li>
              <li>&#60;Framer-Motion&#62;</li>
            </ul>
          </div>
          <div className="link-nav">
            <h5>LINKS</h5>
            <ul className="list-unstyled links">
              <li>
                <Link to="./home">
                  <strong>Home</strong>
                </Link>
              </li>
              <li>
                <Link to="./work">
                  <strong>Work</strong>
                </Link>
              </li>
              <li>
                <Link to="./aboutus">
                  <strong>About</strong>
                </Link>
              </li>
              {
                <li>
                  <Link to="./contactus">
                    <strong>Contact</strong>
                  </Link>
                </li>
              }
            </ul>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-auto">
            <p>© Copyright 2021 Titanium Arts</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
