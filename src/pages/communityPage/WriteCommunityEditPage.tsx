import React, { useEffect, useState } from "react";

import "./WriteCommunityPage.css";
import {
  useCreateCommunity,
  useEditCommunity,
  useGetSpecificCommunity,
} from "../../hooks/communityHooks";
import getErrorMessage from "../../utils/getError";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading_Error/Loading";
import Error from "../../components/Loading_Error/Error";

interface WriteCommunityData {
  title: string;
  content: string;
  image?: File;
}

const WriteCommunityEditPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const params = useParams();
  const { slug } = params;
  const [content, setContent] = useState("");
  const {
    data: post,
    isLoading,
    error,
  } = useGetSpecificCommunity(slug as string);
  const [image, setImage] = useState<File | null>(null);
  const createCommunityMutation = useEditCommunity(slug as string);
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
      createCommunityMutation.mutateAsync(formData as any);
      alert("게시글이 생성되었습니다.");
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
      <h2 className="community-write-title">커뮤니티 글 수정</h2>
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

export default WriteCommunityEditPage;
