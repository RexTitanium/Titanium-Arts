import React from "react";
import { baseUrl } from "../shared/baseUrl";

const DownloadButton = ({ image }) => {
  const download = () => {
    var element = document.createElement("a");
    var file = new Blob([baseUrl + image.image], { type: "image/*" });
    element.href = URL.createObjectURL(file);
    element.download = "image.jpg";
    element.click();
  };
  return (
    <div className="App">
      <a href={baseUrl + image.image} download onClick={() => download()}>
        <i className="fa fa-download" />
        download
      </a>
    </div>
  );
};

export default DownloadButton;
