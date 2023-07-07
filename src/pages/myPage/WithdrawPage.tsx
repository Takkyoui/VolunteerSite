import React from "react";
import "./WithdrawPage.css";
import Navbar from "../../components/Navbar/Navbar";

const WithdrawPage: React.FC = () => {
  const handleWithdraw = () => {
    // 회원탈퇴 로직을 처리하는 함수
    // ...
    alert(
      "회원탈퇴는 기존 작성 게시글 및 봉사활동 내역이 모두 삭제됩다 진행하시겠습니까?"
    );
  };

  return (
    <>
      <Navbar />
      <div className="withdraw-page-container">
        <h2 className="withdraw-page-title">회원 탈퇴</h2>
        <p className="withdraw-page-description">
          정말로 회원 탈퇴를 진행하시겠습니까?
        </p>
        <button className="withdraw-page-button" onClick={handleWithdraw}>
          회원 탈퇴하기
        </button>
      </div>
    </>
  );
};

export default WithdrawPage;
