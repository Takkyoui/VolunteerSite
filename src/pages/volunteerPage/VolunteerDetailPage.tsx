import React, { useState } from "react";
import "./VolunteerDetailPage.css";

import {
  useGetVolunteerDetail,
  useParticipateVolunteer,
} from "../../hooks/volunteerHooks";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading_Error/Loading";
import Error from "../../components/Loading_Error/Error";
import CommentForm from "../../components/CommentForm/CommentForm";
import Comment from "../../components/Comment/Comment";
import { useGetComments } from "../../hooks/commentHooks";
import getErrorMessage from "../../utils/getError";

const VolunteerDetailPage: React.FC = () => {
  const [currentItem, setCurrentItem] = useState("활동소개");
  const params = useParams();
  const { slug } = params;

  const {
    data: post,
    isLoading,
    error,
  } = useGetVolunteerDetail(slug as string);

  const {
    data: comments,
    isLoading: isCommentLoading,
    error: isError,
  } = useGetComments("volunteer", slug as string);
  console.log(comments);
  const handleItemClick = (item: string) => {
    setCurrentItem(item);
  };
  const useParicipate = useParticipateVolunteer();

  const participate = async () => {
    try {
      const response = await useParicipate.mutateAsync({
        postId: slug as string,
        action: "참여하기",
      });
      alert("참여완료");
    } catch (err) {
      alert(getErrorMessage(err));
    }
  };
  return isLoading || isCommentLoading ? (
    <Loading />
  ) : error || isError ? (
    <Error message="오류가 발생했습니다" />
  ) : (
    <>
      <div className="volunteer-detail-container">
        <h1 className="volunteer-detail-title">{post!.title}</h1>
        <div className="hr-bar"></div>
        <div className="volunteer-detail-info">
          <div style={{ marginTop: "10px" }}>
            <div>작성자: {post!.userId.name}</div>
            {post!.createdAt && <div>날짜: {post!.createdAt.slice(0, 10)}</div>}
          </div>
        </div>
        {post!.image?.length !== 0 && (
          <img
            src={`http://localhost:8000/${post!.image}`}
            alt="봉사 이미지"
            className="volunteer-detail-image"
          />
        )}
        <br></br>
        <br></br>
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
                currentItem === "작성자 소개" ? "active" : ""
              }`}
              onClick={() => handleItemClick("작성자 소개")}
            >
              작성자 소개
            </li>
            <li
              className={`breadcrumb-item ${
                currentItem === "댓글" ? "active" : ""
              }`}
              onClick={() => handleItemClick("댓글")}
            >
              댓글
            </li>
            <li
              className={`breadcrumb-item ${
                currentItem === "참가신청" ? "active" : ""
              }`}
              onClick={() => handleItemClick("참가신청")}
            >
              참가신청
            </li>
          </ul>
          {/* TODO: 클릭한 항목에 따라 관련된 내용을 보여주는 컴포넌트 추가 */}
        </div>
        {currentItem === "활동소개" && (
          <div className="volunteer-detail-content">
            <div className="volunteer-detail-content-detail">
              <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}></div>
              <div className="vdmt">| 기본 정보</div>
              <div className="volunteer-detail-content-detail-info-box">
                <div>
                  활동 장소: <span>{post!.location}</span>
                </div>
                <div>
                  모집기간: <span>{post!.recruitmentPeriod}</span>
                </div>
                <div>
                  봉사기간:{" "}
                  <span>
                    {post!.volunteerStartDate} ~ {post?.volunteerEndDate}
                  </span>
                </div>
                <div>
                  카테고리: <span>{post!.category}</span>
                </div>
              </div>

              <div className="vdmt"> | 어떤 활동을 하나요?</div>
              <div className="volunteer-detail-content-detail-box">
                {post!.content}
                <br></br>
              </div>
            </div>
          </div>
        )}
        {currentItem === "댓글" && (
          <>
            {" "}
            <div className="volunteer-detail-container-comment">
              <CommentForm path={"volunteer"} id={slug as string} />
            </div>
            <div className="volunteer-detail-container-comment">
              {comments && comments.length > 0 ? (
                comments.map((comment) => (
                  <Comment
                    key={comment._id}
                    author={comment.userId.name}
                    date={comment.createdAt}
                    comment={comment.content}
                  />
                ))
              ) : (
                <p>댓글이 없습니다.</p>
              )}
            </div>
          </>
        )}

        {currentItem === "작성자 소개" && (
          <div className="volunteer-detail-content">
            <div className="volunteer-detail-content-detail">
              <div className="volunteer-detail-content-detail-intro">
                <div className="author-name">{post!.userId.name}</div>
                <div className="author-description">
                  {post!.userId.selfIntro}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentItem === "참가신청" && (
          <div className="volunteer-detail-join-page">
            <h1 className="volunteer-detail-join-page-title">참가신청</h1>
            <div className="volunteer-detail-join-page-info">
              <div className="volunteer-detail-info-item">
                <div className="volunteer-detail-info-label">
                  현재 모집 상태:
                </div>
                <div className="volunteer-detail-info-value">모집중</div>
              </div>
              <div className="volunteer-detail-info-item">
                <div className="volunteer-detail-info-label">
                  현재 신청 인원:
                </div>
                <div className="volunteer-detail-info-value">
                  {Array.isArray(post!.registeredUsers)
                    ? post!.registeredUsers.length
                    : 0}
                  /{post!.recruitmentLimit}(명)
                </div>
              </div>

              <div className="volunteer-detail-info-item">
                <div className="volunteer-detail-info-label">종료 날짜:</div>
                <div className="volunteer-detail-info-value">
                  2023년 12월 31일
                </div>
              </div>
              <div className="volunteer-detail-info-item">
                <div className="volunteer-detail-info-label">모집 기한:</div>
                <div className="volunteer-detail-info-value">
                  2023년 11월 30일
                </div>
              </div>
            </div>
            <button
              className="volunteer-detail-join-button"
              onClick={participate}
            >
              참가하기
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default VolunteerDetailPage;
