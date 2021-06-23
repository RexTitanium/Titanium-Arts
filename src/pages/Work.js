import React, { useState, useEffect } from "react";
import Slider from "../components/Slider";
import Cards from "../components/Cards";
import { motion } from "framer-motion";

function Work({ cards, setLoc }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setLoc(1);
  });

  return (
    <div className="home">
      <Slider
        slides={cards.filter((card) => card.isBanner === true)}
        current={current}
        setCurrent={setCurrent}
      />

      <div className="card-container">
        {cards.map((card, i) => {
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
