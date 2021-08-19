import React, { useState, useEffect } from "react";
import "./styles/IndCard.scss";
import { motion } from "framer-motion";
import Cards from "../components/Cards";
import "./styles/Slider.css";
import "react-gallery-carousel/dist/index.css";

function IndCard({ cards, setLoc, similar }) {
  useEffect(() => {
    setLoc(1);
  });

  const [checkout, setCheckOut] = useState([]);
  let n = 2;
  const defaultText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";


  useEffect(() => {
    function setBg() {
      setCheckOut(similar &&
        similar
          .sort(function () {
            return 0.5 - Math.random();
          })
          .slice(0, n)
      );
    }
    setBg();
  }, [setCheckOut]);

  return (
    <div className="card__container">
      <motion.div
        className="card__body"
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        exit={{ x: "-100vw" }}
        transition={{ type: "spring", stiffness: 120 }}
      >
         
      <img src={cards && cards.image} />
      </motion.div>
      <motion.div
        initial={{ y: "-200%" }}
        animate={{ y: 0 }}
        exit={{ y: "-200%" }}
        transition={{ type: "spring", stiffness: 80, delay: 0.5 }}
        className="col-12 col-md-6 card_info"
      >
        <motion.div
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          transition={{
            type: "spring",
            stiffness: 60,
            delay: 0.7,
          }}
          className="card_title"
        >
          <h1>{cards && cards.title}</h1>
        </motion.div>
        <motion.div
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          transition={{
            type: "spring",
            stiffness: 60,
            delay: 0.8,
          }}
          className="card_description"
        >
          <p>{cards?.description == "" ? defaultText : cards?.description }</p>
        </motion.div>
        <motion.div
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          transition={{
            type: "spring",
            stiffness: 60,
            delay: 0.9,
          }}
          className="card_softwares"
        >
          <h1>Softwares Used:</h1>
          <p>{cards?.text}</p>
        </motion.div>

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
            Explore More :{" "}
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
        <motion.div
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          transition={{
            type: "spring",
            stiffness: 60,
            delay: 1.1,
          }}
          id="container"
          style={{
            textAlign: "left",
            marginBottom: "30px",
          }}
        >
          <a
            className="learn-more"
            href={cards?.link}
            download={cards?.title}
            target="_blank"
          >
            <span className="circle" aria-hidden="true">
              <span className="icon arrow"></span>
            </span>
            <span className="button-text">Download</span>
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default IndCard;
