import React from "react";
import * as FaIcons from "react-icons/fa";
import * as FcIcons from "react-icons/fc";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as Io5Icons from "react-icons/io5";

export const SidebarData = [
  {
    title: "Home",
    path: "/home",
    icon: <FcIcons.FcHome />,
    cName: "nav-text",
  },
  {
    title: "Work",
    path: "/work",
    icon: <FcIcons.FcGallery />,
    cName: "nav-text",
  },
  {
    title: "About Us",
    path: "/aboutus",
    icon: <FcIcons.FcAbout />,
    cName: "nav-text",
  },
  {
    title: "Contact",
    path: "/contactus",
    icon: <FcIcons.FcAssistant />,
    cName: "nav-text",
  },
  {
    title: "Login",
    path: "/login",
    icon: <FcIcons.FcAddressBook />,
    cName: "nav-text",
  },
  {
    title: "Profile",
    path: "/login",
    icon: <FcIcons.FcButtingIn />,
    cName: "nav-text",
  },
];
