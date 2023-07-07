import React, { useContext } from "react";
import "./CommunityDetailPage.css";
import CommentForm from "../../components/CommentForm/CommentForm";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteSpecificCommunity,
  useGetSpecificCommunity,
} from "../../hooks/communityHooks";
import Loading from "../../components/Loading_Error/Loading";
import Error from "../../components/Loading_Error/Error";
import { useGetComments } from "../../hooks/commentHooks";
import Comment from "../../components/Comment/Comment";
import { StateContext } from "../../State";

const CommunityDetailPage = () => {
  const params = useParams();
  const { slug } = params;
  const navigate = useNavigate();
  const {
    data: post,
    isLoading: isPostLoading,
    error: PostError,
  } = useGetSpecificCommunity(slug as string);
  const {
    state: { user },
  } = useContext(StateContext);
  console.log(user?._id);
  console.log(post?.userId._id);
  const {
    data: comments,
    isLoading: isCommentLoading,
    error: CommentError,
  } = useGetComments("community", slug as string);
  const useDelete = useDeleteSpecificCommunity();
  const deletePost = () => {
    useDelete.mutateAsync(slug as string);
    navigate("/community");
  };
  return isPostLoading || isCommentLoading ? (
    <Loading />
  ) : PostError || CommentError ? (
    <Error message={"에러가 발생했습니다"} />
  ) : (
    <>
      <div className="community-detail-page">
        <div className="community-detail-page-title-edit">
          <h2 className="community-detail-title">{post!.title}</h2>
          {user?._id === post?.userId._id && (
            <div className="community-detail-edit">
              <Link to={`/community/edit/${slug}`}>
                <button style={{ color: "green" }}>수정하기</button>
              </Link>

              <button style={{ color: "red" }} onClick={deletePost}>
                삭제하기
              </button>
            </div>
          )}
        </div>

        {post!.image?.length !== 0 && (
          <img
            className="community-detail-image"
            src={`http://localhost:8000/${post!.image}`}
            alt="게시글 이미지"
          />
        )}
        <p className="community-detail-content">{post!.content}</p>
        <div className="community-detail-info">
          <p className="community-detail-date">
            작성 날짜: {post!.createdAt.slice(0, 10)}
          </p>
          <p className="community-detail-author">작성자: {post!.userId.name}</p>
        </div>
      </div>
      <div className="review-detail-page">
        <CommentForm path={"community"} id={slug as string} />
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
  );
};

export default CommunityDetailPage;
