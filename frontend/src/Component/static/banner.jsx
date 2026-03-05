import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Banner = ({ title, text, path, buttonText, img, left }) => {
  return (
    <div className={`info-banner${!left ? " reverse" : ""}`}>
      <div className="info-banner-img">
        <img src={img} alt={title} loading="lazy" />
      </div>
      <div className="info-banner-content">
        <h2>{title}</h2>
        <p>{text}</p>
        <Link to={path || "/package"} className="btn-gold" style={{ alignSelf: "flex-start" }}>
          {buttonText} <FaArrowRight style={{ marginLeft: 8 }} />
        </Link>
      </div>
    </div>
  );
};

export default Banner;
