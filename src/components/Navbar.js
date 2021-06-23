import React, { useState, useEffect } from "react";
import "./styles/Navbar.scss";
import { Turn as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar({ loc }) {
  const [sidebar, showSidebar] = useState(false);
  const [nav, showNav] = useState(false);

  const handleClick = () => {
    showSidebar(!sidebar);
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        showNav(true);
      } else {
        showNav(false);
      }
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div
      className={`navbar ${nav === true || sidebar === true ? "show" : ""} `}
    >
      <div className="nav-header">
        <motion.h1
          whileHover={{
            scale: 1.2,
            textShadow: "0px 0px 5px white",
            duration: "450ms",
          }}
        >
          <a href="/home">
            <img
              src="/assets/images/TA_LOGO(W).png"
              alt="logo"
              width="150px"
              style={{ zIndex: 3 }}
            />
          </a>
        </motion.h1>
      </div>
      <motion.div className="menu-icon">
        <Hamburger toggled={sidebar} onToggle={handleClick} direction="left" />
      </motion.div>
      <div className={`nav-links ${sidebar ? "clicked" : ""}`}>
        <Link
          style={{ textDecoration: "none" }}
          to="/home"
          className={`${loc === 0 ? "link-active" : "underline "}`}
        >
          <motion.h1
            whileHover={{
              scale: 1.2,
              duration: "300ms",
            }}
          >
            Home
          </motion.h1>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          to="/work"
          className={`${loc === 1 ? "link-active" : "underline "}`}
        >
          <motion.h1
            whileHover={{
              scale: 1.2,
              duration: "300ms",
            }}
          >
            Work
          </motion.h1>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          to="/aboutus"
          className={`${loc === 2 ? "link-active" : "underline "}`}
        >
          <motion.h1
            whileHover={{
              scale: 1.2,
              duration: "300ms",
            }}
          >
            About
          </motion.h1>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          to="/contactus"
          className={` ${loc === 3 ? "link-active" : " underline"}`}
        >
          <motion.h1
            whileHover={{
              scale: 1.2,
              duration: "300ms",
            }}
          >
            Contact
          </motion.h1>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
