import React from "react";
import "./Write.css";
import { useGetCounts } from "../../hooks/countHooks";

interface TotalPostsProps {
  path: string;
  onWritePost: () => void;
}

const TotalPosts: React.FC<TotalPostsProps> = ({ path, onWritePost }) => {
  const { data, isLoading, error } = useGetCounts(path);

  return isLoading ? (
    <></>
  ) : error ? (
    <></>
  ) : (
    <div className="total-posts-container">
      <div className="total-posts-count">
        전체 글 수: <span style={{ color: "red" }}>{data}</span>
      </div>
      <button className="write-post-button" onClick={onWritePost}>
        글쓰기
      </button>
    </div>
  );
};

export default TotalPosts;
