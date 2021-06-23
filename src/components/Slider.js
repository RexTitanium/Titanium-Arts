import React, { useEffect, useState } from "react";
import "./styles/Slider.css";
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

function Slider({ slides, current, setCurrent }) {
  const length = slides.length;

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  return (
    <div className="slide-container">
      <div className="slider">
        <FaChevronCircleLeft className="left_arrow" onClick={prevSlide} />
        <FaChevronCircleRight className="right_arrow" onClick={nextSlide} />
        {slides.map((card, i) => {
          return (
            <div
              className={`slide ${i === current ? "active" : "out"}`}
              key={i}
            >
              {i === current && (
                <Link to={`/work/${card.id}/${card.title}`}>
                  <img src={card.image} alt="wallpaper" className="image" />
                </Link>
              )}
            </div>
          );
        })}
        <div className="empty-row"></div>
      </div>

      <div className="in">
        {slides.map((card, i) => {
          return (
            <button
              key={i}
              className={`button ${i === current ? "btn-active" : ""}`}
            ></button>
          );
        })}
      </div>
    </div>
  );
}

export default Slider;
