import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="mypage-navbar">
      <ul className="mypage-navbar-list">
        <Link to="/mypage" className="link">
          <li className="mypage-navbar-item">마이프로필</li>
        </Link>
        <Link to="/myvolunteerpost" className="link">
          <li className="mypage-navbar-item">내 봉사 게시글</li>
        </Link>
        <Link to="/participate" className="link">
          <li className="mypage-navbar-item">내 봉사 관리 목록</li>
        </Link>
        <Link to="/mycommunitypost" className="link">
          <li className="mypage-navbar-item">내 커뮤니티 게시글</li>
        </Link>
        <Link to="/myreviewpost" className="link">
          <li className="mypage-navbar-item">내 후기 게시글</li>
        </Link>
        <Link to="/myparticipate" className="link">
          <li className="mypage-navbar-item">신청한 활동</li>
        </Link>
        <li className="mypage-navbar-item">완료한 활동</li>
        <Link to="/withdraw" className="link">
          <li className="mypage-navbar-item">회원탈퇴</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
