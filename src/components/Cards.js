import React from "react";
import "./styles/Cards.scss";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
function Cards({ cards }) {
  return (
    <div className="card-body">
      <Link className="card-link" to={`/work/${cards.id}/${cards.title}`}>
        <figure className="card-img-wrap">
          <img
            className="card-img"
            src={cards.image}
            alt={cards.title}
            loading="lazy"
          />
        </figure>
      </Link>
    </div>
  );
}

export default Cards;
