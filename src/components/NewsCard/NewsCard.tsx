import React from "react";
import "./NewsCard.css";

interface NewsCardProps {
  title: string;
  description: string;
  imageUrl: string;
  isEven: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  description,
  imageUrl,
  isEven,
}) => {
  return (
    <div className={`news-card ${isEven ? "even-card" : "odd-card"}`}>
      {imageUrl && (
        <div
          className={`news-card-image ${isEven ? "right-image" : "left-image"}`}
        >
          <img src={imageUrl} alt={title} />
        </div>
      )}
      <div className="news-card-content">
        <h3 className="news-card-title">{title}</h3>
        <p className="news-card-description">{description}</p>
      </div>
    </div>
  );
};

export default NewsCard;
