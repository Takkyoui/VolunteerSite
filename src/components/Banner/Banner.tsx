import React, { FC } from "react";
import "./Banner.css";

interface BannerProps {
  title: string;
  subtitle: string;
  image: string;
  color: string;
}

const Banner: FC<BannerProps> = ({ title, subtitle, image, color }) => {
  return (
    <div className="mainbanner-banner" style={{ backgroundColor: `${color}` }}>
      <div className="mainbanner-banner-content">
        <div className="mainbanner-text-container">
          <h2 className="mainbanner-banner-title">{title}</h2>
          <h4>{subtitle}</h4>
        </div>
        <div className="mainbanner-image-container">
          <img
            src={image}
            alt="Banner Image"
            className="mainbanner-banner-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
