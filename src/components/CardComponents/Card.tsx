import React from "react";
import "./Card.css";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { useParticipateVolunteer } from "../../hooks/volunteerHooks";
import getErrorMessage from "../../utils/getError";

interface CardProps {
  id: string;
  image: string;
  title: string;
  author: string;
  recruitmentStatus: string;
  createdAt: string;
  mypage: boolean;
  recruitmentPeriod: string;
}

const Card: React.FC<CardProps> = ({
  id,
  image,
  title,
  author,
  recruitmentStatus,
  createdAt,
  mypage,
  recruitmentPeriod,
}) => {
  const getDaysRemaining = () => {
    const today = moment();
    const createdAtDate = moment(recruitmentPeriod);
    const daysRemaining = createdAtDate.diff(today, "days");
    return daysRemaining;
  };
  const useParicipate = useParticipateVolunteer();
  const slug = id;
  console.log(recruitmentPeriod);
  const cancelparticipate = async () => {
    try {
      const response = await useParicipate.mutateAsync({
        postId: slug as string,
        action: "참여취소",
      });
      alert("참여취소 완료");
    } catch (err) {
      alert(getErrorMessage(err));
    }
  };

  return (
    <div className="volunteer-card">
      {" "}
      <Link to={`/volunteer/${id}`} className="link">
        {image.length > 0 ? (
          <img
            className="volunteer-card-image"
            src={`http://localhost:8000/${image}`}
            alt="Card"
          />
        ) : (
          <img
            className="volunteer-card-image"
            src={`./mainlogo.png`}
            alt="Card"
          />
        )}
        <div className="volunteer-card-status">
          {recruitmentStatus === "모집중" ? (
            <span className="status-open">
              {`[${recruitmentStatus}]`} {getDaysRemaining()} 일
            </span>
          ) : (
            <span className="status-closed">
              {`[${recruitmentStatus}]`} {getDaysRemaining()} 일
            </span>
          )}
        </div>
        <div className="volunteer-card-content">
          {title.slice(0, 8) + "..."}
        </div>
        <div className="volunteer-card-author">작성자: {author}</div>
      </Link>
      {mypage && (
        <div className="volunteer-card-author-cancel">
          <button onClick={cancelparticipate}>참여취소</button>
        </div>
      )}
    </div>
  );
};

export default Card;
