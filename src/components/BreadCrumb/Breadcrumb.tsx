import React, { useState } from "react";
import "./Breadcrumb.css";

const Breadcrumb: React.FC = () => {
  const [currentItem, setCurrentItem] = useState("활동소개");

  const handleItemClick = (item: string) => {
    setCurrentItem(item);
    // TODO: 클릭한 항목에 따라 관련된 내용을 보여주는 로직 추가
  };

  return (
    <div className="breadcrumb-container">
      <ul className="breadcrumb-list">
        <li
          className={`breadcrumb-item ${
            currentItem === "활동소개" ? "active" : ""
          }`}
          onClick={() => handleItemClick("활동소개")}
        >
          활동소개
        </li>
        <li
          className={`breadcrumb-item ${
            currentItem === "팀소개" ? "active" : ""
          }`}
          onClick={() => handleItemClick("팀소개")}
        >
          팀소개
        </li>
        <li
          className={`breadcrumb-item ${
            currentItem === "댓글" ? "active" : ""
          }`}
          onClick={() => handleItemClick("댓글")}
        >
          댓글
        </li>
      </ul>
      {/* TODO: 클릭한 항목에 따라 관련된 내용을 보여주는 컴포넌트 추가 */}
    </div>
  );
};

export default Breadcrumb;
