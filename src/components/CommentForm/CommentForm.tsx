import React, { useState } from "react";
import "./CommentForm.css";
import { useCreateComment } from "../../hooks/commentHooks";
import { useNavigate } from "react-router-dom";

type CommentFormProps = {
  path: string;
  id: string;
};

const CommentForm: React.FC<CommentFormProps> = ({ path, id }) => {
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const createcomment = useCreateComment();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createcomment.mutateAsync({ comment, path, id });
    alert("댓글 생성");
    console.log(path);
    navigate(`/${path}/${id}`);
    setComment("");
  };

  return (
    <form className="CommentForm-comment-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="CommentForm-comment-input"
        placeholder="댓글을 작성하세요"
        value={comment}
        style={{ border: "none", borderBottom: "1px solid gray" }}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="submit" className="CommentForm-comment-button">
        작성
      </button>
    </form>
  );
};

export default CommentForm;
