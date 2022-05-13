import React from "react";
import "./infobar.css";
import onlineIcon from "../../icons/onlineIcon.png";
import closeIcon from "../../icons/closeIcon.png";

const InfoBar = ({ room }) => {
  return (
    <>
      <div className="infoBar">
        <div className="leftInnerContainer">
          <img src={onlineIcon} alt="images" className="onlineIcon" />
          <h2>{room}</h2>
        </div>
        <div className="rightInnerContainer">
          <a href="/">
            <img src={closeIcon} alt="closeicon" className="closeIcon" />
          </a>
        </div>
      </div>
    </>
  );
};

export default InfoBar;
