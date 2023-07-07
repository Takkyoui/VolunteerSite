import React, { useState } from "react";
import "./MyParticipate.css";
import Navbar from "../../../components/Navbar/Navbar";
import {
  useGetMyParticipateVolunteer,
  useGetMyVolunteer,
  useParticipateVolunteer,
} from "../../../hooks/volunteerHooks";
import Loading from "../../../components/Loading_Error/Loading";
import Error from "../../../components/Loading_Error/Error";
import Card from "../../../components/CardComponents/Card";
import { useParams } from "react-router-dom";
import getErrorMessage from "../../../utils/getError";

interface MyParticipateProps {
  // 필요한 프롭스 추가
}

const MyParticipate: React.FC<MyParticipateProps> = () => {
  const { data, isLoading, error } = useGetMyParticipateVolunteer();
  console.log(data);
  return isLoading ? (
    <Loading />
  ) : error ? (
    <Error message="오류가 발생했습니다" />
  ) : (
    <>
      <Navbar />
      <div className="my-participate-container">
        <div className="card-list">
          {" "}
          {data!.map((volunteer) => (
            <>
              <Card
                key={volunteer._id}
                id={volunteer._id}
                image={volunteer.image}
                title={volunteer.title}
                recruitmentStatus={volunteer.recruitmentStatus}
                author={volunteer.userId.name}
                createdAt={volunteer.createdAt}
                mypage={true}
              />
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyParticipate;
