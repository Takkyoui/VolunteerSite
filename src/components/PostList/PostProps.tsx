import React from "react";
import "./PostProps.css";
import { Link } from "react-router-dom";

interface PostProps {
  title: string;
  content: string;
  author: string;
  slug: string;
  // profileImage: string;
  date: string;
  path: string;
}

const Post: React.FC<PostProps> = ({
  title,
  content,
  author,

  path,
  slug,
  date,
}) => {
  return (
    <div className="postprops-post">
      <Link to={`/${path}/${slug}`} className="link">
        <h2 className="postprops-post-title">{title}</h2>
        <hr style={{ color: "#AACB73" }} />
        <p className="postprops-post-content">{content}</p>
        <div className="postprops-post-author">
          <span>{author}</span>
        </div>
        <p className="postprops-post-date">{date.slice(0, 10)}</p>
      </Link>
    </div>
  );
};

export default Post;
