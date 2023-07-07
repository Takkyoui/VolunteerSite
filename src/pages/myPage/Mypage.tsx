import React, { useState } from "react";
import "./MyPage.css";
import Navbar from "../../components/Navbar/Navbar";
import { useGetMyInfo } from "../../hooks/myInfoHooks";
import Loading from "../../components/Loading_Error/Loading";
import Error from "../../components/Loading_Error/Error";
import { BsGear } from "react-icons/bs";
import Modal from "../../components/Modal/Modal";

interface UserProfile {
  name: string;
  age: number;
  email: string;
  profileImage: string;
  phoneNumber: string;
  introduction: string;
}

const MyPage: React.FC = () => {
  const { data, isLoading, error } = useGetMyInfo();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveModal = () => {
    setIsModalOpen(false);
  };

  return isLoading ? (
    <Loading />
  ) : error ? (
    <Error message="오류가 발생했습니다" />
  ) : (
    <>
      {" "}
      <Navbar />
      <div className="my-page-container">
        <div className="my-page-container-edit">
          <h2 className="my-page-title">MyInfo</h2>
          <BsGear onClick={handleOpenModal} />
        </div>

        <div className="user-profile">
          <div className="user-profile-image">
            <img
              src={`http://localhost:8000/${data!.image}` || "./profile.png"}
              alt="프로필 이미지"
              className={`profile-image`}
            />
          </div>
          <div className="profile-info">
            <h3 className="profile-name">{data!.name}</h3>
            <div className="profile-email">이메일: {data!.email}</div>{" "}
            <div className="profile-phone-number">
              전화번호: {data!.phoneNumber}
            </div>{" "}
          </div>
        </div>

        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <h2>Self Intro</h2>
        <h5>봉사모집을 할때 기본 자기소개로 나타납니다</h5>
        <div className="user-profile">{data!.selfIntro}</div>
      </div>
      {isModalOpen && (
        <Modal onClose={handleCloseModal} onSave={handleSaveModal} />
      )}
    </>
  );
};

export default MyPage;
