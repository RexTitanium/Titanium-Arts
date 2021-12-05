import React, { useState, useEffect } from "react";
import Slider from "../components/Slider";
import Cards from "../components/Cards";
import { motion } from "framer-motion";
import "./styles/work.scss";
import ImageUpload from "../components/ImageUpload";

function Work({ user, cards, setLoc, handleLogout }) {
  const [current, setCurrent] = useState(0);
  const [items, setItems] = useState(cards);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    setLoc(1);
  });

  const handleChange = (e) => {
    setSearchItem(e.target.value.toLowerCase());
    let result = [];
    result = cards.filter((card) => {
      let tmpcard;
      card.tags?.map((tag) => {
        if (tag.toLowerCase().includes(searchItem)) {
          tmpcard = true;
        }
      });
      return (
        card.title.toLowerCase().search(searchItem) !== -1 ||
        card.text.toLowerCase().search(searchItem) !== -1 ||
        tmpcard
      );
    });
    setItems(result);
  };
  return (
    <div className="home">
      <Slider
        slides={cards && cards.filter((card) => card.isBanner === true)}
        current={current}
        setCurrent={setCurrent}
      />

      <div className="search-wrapper">
        <label htmlFor="search-form" className="search-form">
          <input
            type="search"
            name="search-form"
            id="search-form"
            className="search-input"
            placeholder="Enter Tag or name such as futuristic or aesthetic or similar"
            value={searchItem}
            /*
                  // set the value of our useState q
                  //  anytime the user types in the search box
                  */
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="card-container">
        {items &&
          items.map((card, i) => {
            return (
              <div
                key={i}
                className="col-12 col-md-4 col-sm-6 col-lg-3 card-list"
              >
                <motion.div
                  initial={{ x: "-100vw" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100vw" }}
                  transition={{ type: "spring", stiffness: 120 }}
                >
                  <Cards cards={card} />
                </motion.div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Work;
