import React, { useState, useEffect } from "react";
import "./styles/home.scss";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Switch, FormControlLabel, Slide, Zoom } from "@material-ui/core";
import { motion } from "framer-motion";
import Loading from "../components/Loading";
function Home({ cards, banner, setLoc }) {
  const BlueSwitch = withStyles({
    switchBase: {
      color: "rgb(126, 219, 255)",
      "& + $track": {
        backgroundColor: "#f4f4f4",
      },
      "&$checked": {
        color: "rgb(126, 219, 255)",
      },
      "&$checked + $track": {
        backgroundColor: "rgb(126, 219, 255)",
      },
    },
    checked: {},
    track: {},
  })(Switch);

  const OrangeSwitch = withStyles({
    switchBase: {
      color: "rgb(255, 231, 126)",
      "& + $track": {
        backgroundColor: "#f4f4f4",
      },
      "&$checked": {
        color: "rgb(255, 231, 126)",
      },
      "&$checked + $track": {
        backgroundColor: "rgb(255, 231, 126)",
      },
    },
    checked: {},
    track: {},
  })(Switch);

  const [checkFeatured, setFeatured] = useState(true);
  const [checkNew, setNew] = useState(false);

  const handleFeatured = () => {
    setFeatured((prev) => !prev);
  };

  const handleNew = () => {
    setNew((prev) => !prev);
  };

  useEffect(() => {
    setLoc(0);
  });

  return (
    <div className="home">
      <div className="header-container">
        <img className="header-image" src={banner} alt="backdrop" />
        <div className="header-text">
          <h1>TITANIUM ARTS</h1>
          <p>Enjoy the Power of Digital Creatives</p>
        </div>

        <div className="empty"></div>
      </div>
      <div className="headlines">
        <div className="images">
          <Zoom
            in={checkFeatured}
            mountOnEnter
            unmountOnExit
            style={{ transitionDelay: checkFeatured ? "500ms" : "0ms" }}
          >
            <div className="featured-image">
              {cards && cards.map((card, i) => {
                if (card.featured === true) {
                  return <RenderCard card={card} key={i + 1} />;
                }
              })}
            </div>
          </Zoom>
          <div className="info">
            <div className="info-wrapper">
              <h1>
                FEATURED{" "}
                <FormControlLabel
                  control={
                    <BlueSwitch
                      checked={checkFeatured}
                      onChange={handleFeatured}
                      color="primary"
                      className="switch"
                    />
                  }
                  label={`${checkFeatured ? "Hide" : "Show"} Featured`}
                />
              </h1>

              <p>
                Featured Work is Portrait artwork, done in Photoshop. The image
                is a Manipulation created using Adobe Photoshop and the images
                used are either stock images or created illustrations. With the
                use of good brushes you can blend the images perfectly
              </p>
              <p>
                You can toggle the button above to show or hide the contents.
              </p>

              <Link
                className="explore feat"
                to="/work"
                onClick={() => {
                  setLoc(1);
                }}
              >
                Explore More
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="headlines">
        <div className="info">
          <div className="info-wrapper">
            <h1 style={{ fontSize: "39px" }}>
              FRESHLY ARRIVED{" "}
              <FormControlLabel
                control={
                  <OrangeSwitch
                    checked={checkNew}
                    onChange={handleNew}
                    color="primary"
                    className="switch"
                  />
                }
                label={`${checkNew ? "Hide" : "Show"} New Content`}
              />
            </h1>

            <p>
              <strong>Want to check out the Newest Content?</strong>
              <br />
              Click on the button above and see the power of Digital Creatives.
              The post was made with Blender. Blender is a 3d modelling
              open-source software with powerful components that give life to
              your imaginations.
            </p>
            <p>You can toggle the button above to show or hide the contents.</p>

            <Link
              className="explore newcont"
              to={`/work/${cards && cards.filter((card) => card.isNew === true)[0].id}/${cards && 
                cards.filter((card) => card.isNew === true)[0].title
              }`}
              onClick={() => {
                setLoc(1);
              }}
            >
              Check Out
            </Link>
          </div>
        </div>
        <div className="images block">
          <Slide in={checkNew} direction="left" mountOnEnter unmountOnExit>
            <div className="new-content">
              {cards && cards.map((card, i) => {
                if (card.isNew === true) {
                  return <RenderCard card={card} key={i + 1} />;
                }
              })}
            </div>
          </Slide>
        </div>
      </div>
      <div className="headlines">
        <div className="images">
          <div className="artist-image">
            <div className="card_container">
              <div className="card_wrapper_artist">
                <Link to="/aboutus">
                  <img src="/assets/images/Samyak.jpg" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="info">
          <div className="info-wrapper">
            <h1 style={{ fontSize: "40px" }}>ARTIST - Samyak Shah</h1>

            <p>
              <strong>Know About Me?</strong>
              <br />I am a young ReactJS developer, making a pathway towards
              excellence in AI/ML. My aim is to excel in the world of Computers
              and develop amazing softwares to curb the need of the world. This
              project is a personal to me as I thought of creating a platform to
              display my digital creatives
            </p>
            <p>
              If you want to collaborate or want to display your work, you can
              contact me
            </p>

            <Link className="explore contact-button" to="/contactus">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function RenderCard({ card }) {
  return (
    <div>
      <Link
        to={`/work/${card.id}/${card.title}`}
        style={{ textDecoration: "none" }}
      >
        <div className="card_container">
          <div className="card_wrapper">
            <motion.img
              initial={{ x: "200vw" }}
              animate={{ x: 0 }}
              exit={{ x: "50vw" }}
              transition={{
                type: "spring",
                stiffness: 200,
              }}
              src={card.link}
              alt={card.title}
              className="card_image"
            />
          </div>
          <h1>{card.title}</h1>
        </div>
      </Link>
    </div>
  );
}

export default Home;
