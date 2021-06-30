import React, { useState, useEffect } from "react";
import "./styles/IndCard.scss";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Cards from "../components/Cards";
import "./styles/Slider.css";
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";
import Carousel from "react-gallery-carousel";
import "react-gallery-carousel/dist/index.css";

function IndCard({ cards, setLoc, similar }) {
  useEffect(() => {
    setLoc(1);
  });

  const [checkout, setCheckOut] = useState([]);
  let n = 2;

  useEffect(() => {
    function setBg() {
      setCheckOut(
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
        {cards.images ? (
          <Carousel
            className="carousel"
            images={cards.images}
            hasMediaButton={false}
            hasSizeButton={false}
            hasThumbnails={false}
            hasDotButtons="bottom"
            shouldLazyLoad={true}
            leftIcon={<FaChevronCircleLeft className="left_arrow dark" />}
            rightIcon={<FaChevronCircleRight className="right_arrow dark" />}
            activeIcon={<button className="button btn-active"></button>}
            passiveIcon={<button className="button"></button>}
            hasTransition={true}
            objectFit={"contain"}
          />
        ) : (
          <img src={cards.image} />
        )}
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
          <h1>{cards.title}</h1>
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
          <p>{cards?.description}</p>
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
          <p>{cards.text}</p>
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
            {checkout.map((card) => {
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
            href={cards.link}
            download={cards.images ? cards.title + ".rar" : cards.title}
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
