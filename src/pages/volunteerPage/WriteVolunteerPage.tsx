import React, { useState, ChangeEvent } from "react";
import "./WriteVolunteerPage.css";
import { useCreateVolunteer } from "../../hooks/volunteerHooks";
import { useNavigate } from "react-router-dom";

const VolunteerWritePage: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [recruitmentPeriod, setRecruitmentPeriod] = useState("");
  const [volunteerStartDate, setVolunteerStartDate] = useState("");
  const [volunteerEndDate, setVolunteerEndDate] = useState("");
  const [recruitmentLimit, setRecruitmentLimit] = useState(0);
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [titleCharCount, setTitleCharCount] = useState(0);
  const [contentCharCount, setContentCharCount] = useState(0);

  const createVolunteerMutation = useCreateVolunteer();

  const handleSubmit = async () => {
    if (
      !title ||
      !content ||
      !category ||
      !recruitmentPeriod ||
      !volunteerStartDate ||
      !volunteerEndDate ||
      recruitmentLimit === 0 ||
      !location
    ) {
      alert("모든 필수 항목을 채워주세요!");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("recruitmentPeriod", recruitmentPeriod);
    formData.append("volunteerStartDate", volunteerStartDate);
    formData.append("volunteerEndDate", volunteerEndDate);
    formData.append("recruitmentLimit", String(recruitmentLimit));
    formData.append("location", location);
    if (image) {
      formData.append("image", image);
    }

    // 글쓰기 폼 데이터를 서버로 전송하는 로직 작성
    await createVolunteerMutation.mutateAsync(formData as any);
    alert("게시글이 생성되었습니다.");
    navigate("/volunteer");
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    setTitleCharCount(value.length);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    setContentCharCount(value.length);
  };

  return (
    <div className="volunteer-write-page-container">
      <h2 className="volunteer-write-page-title">봉사활동 글쓰기</h2>
      <div className="volunteer-write-form">
        <div className="form-group">
          <label htmlFor="title">제목 * </label>
          <input
            type="text"
            id="title"
            value={title}
            maxLength={40}
            onChange={handleTitleChange}
          />
          <br></br>
          <div className="char-count">{titleCharCount} / 40</div>
        </div>
        <div className="form-group">
          <label htmlFor="content">내용 *</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            maxLength={500}
          ></textarea>
          <br></br>

          <div className="char-count">{contentCharCount} / 500</div>
        </div>

        <div className="form-group">
          <label htmlFor="category">카테고리 * </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">선택하세요</option>
            <option value="노인">노인</option>
            <option value="어린이">어린이</option>
            <option value="동물">동물</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="recruitmentPeriod">모집 기간 * </label>
          <input
            type="date"
            id="recruitmentPeriod"
            value={recruitmentPeriod}
            onChange={(e) => setRecruitmentPeriod(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="volunteerStartDate">봉사 시작일 * </label>
          <input
            type="date"
            id="volunteerStartDate"
            value={volunteerStartDate}
            onChange={(e) => setVolunteerStartDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="volunteerEndDate">봉사 종료일 * </label>
          <input
            type="date"
            id="volunteerEndDate"
            value={volunteerEndDate}
            onChange={(e) => setVolunteerEndDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="recruitmentLimit">모집 인원 * </label>
          <input
            type="number"
            id="recruitmentLimit"
            value={recruitmentLimit === 0 ? "" : recruitmentLimit}
            onChange={(e) => setRecruitmentLimit(Number(e.target.value))}
            min={0}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">활동 장소 * </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">이미지</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        {image && (
          <div className="image-preview">
            <img src={URL.createObjectURL(image)} alt="이미지 미리보기" />
          </div>
        )}
        <button type="submit" className="submit-button" onClick={handleSubmit}>
          글쓰기
        </button>
      </div>
    </div>
  );
};

export default VolunteerWritePage;
