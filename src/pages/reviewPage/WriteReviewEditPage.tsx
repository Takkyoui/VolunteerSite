import React, { useEffect, useState } from "react";
import "./WriteReviewPage.css";
import {
  useCreateReview,
  useEditReview,
  useGetSpecificReview,
} from "../../hooks/reviewHooks";
import getErrorMessage from "../../utils/getError";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading_Error/Loading";
import Error from "../../components/Loading_Error/Error";

interface WriteReviewData {
  title: string;
  content: string;
  image?: File;
}

const WriteReviewEditPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const params = useParams();
  const { slug } = params;
  const editReviewMutation = useEditReview(slug as string);
  const { data: post, isLoading, error } = useGetSpecificReview(slug as string);

  useEffect(() => {
    if (post) {
      setTitle(post!.title);
      setContent(post!.content);
    }
  }, [post]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    try {
      editReviewMutation.mutate(formData as any);
      alert("게시글이 수정되었습니다.");
    } catch (error) {
      console.error(getErrorMessage(error));
    }
  };

  return isLoading ? (
    <Loading />
  ) : error ? (
    <Error message="오류가 발생했습니다" />
  ) : (
    <div className="community-write-page">
      <h2 className="community-write-title">리뷰 글 수정</h2>
      <form className="community-write-form" onSubmit={handleSubmit}>
        <div className="community-write-input-group">
          <label htmlFor="title" className="community-write-label">
            제목
          </label>
          <input
            type="text"
            id="title"
            className="community-write-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={40}
            required
          />
        </div>
        <div className="community-write-input-group">
          <label htmlFor="content" className="community-write-label">
            내용
          </label>
          <textarea
            id="content"
            className="community-write-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={500}
            required
          />
        </div>
        <div className="community-write-input-group">
          <label htmlFor="image" className="community-write-label">
            이미지
          </label>
          <input
            type="file"
            id="image"
            className="community-write-file-input"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        </div>
        <button type="submit" className="community-write-submit-btn-a">
          제출
        </button>
      </form>
    </div>
  );
};

export default WriteReviewEditPage;
