import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "../shared/sidebardata";
import { Sling as Hamburger } from "hamburger-react";
import "./styles/Navbar.scss";
import { IconContext } from "react-icons";
import { motion } from "framer-motion";

function SideBar({ user }) {
  const [sidebar, setSidebar] = useState(false);
  const [nav, showNav] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

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
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className={`navbar ${nav === true ? "nav-show" : ""} `}>
          <div className="menu-bars">
            <Hamburger
              toggled={sidebar}
              onToggle={showSidebar}
              direction="left"
              easing="ease"
              size={20}
            />
          </div>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items">
            <li className="navbar-toggle"></li>
            {SidebarData.map((item, index) => {
              if (user && item.title === "Login") return;
              else if (!user && item.title === "Profile") return;
              return (
                <li key={index} className={item.cName}>
                  <Link
                    to={item.path}
                    style={{ textDecoration: "none" }}
                    onClick={showSidebar}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <a href="/home" className="header-link">
          <img
            src="/assets/images/TA_LOGO(W).png"
            alt="logo"
            width="150px"
            style={{ zIndex: 3 }}
          />
        </a>
      </IconContext.Provider>
    </>
  );
}

export default SideBar;
