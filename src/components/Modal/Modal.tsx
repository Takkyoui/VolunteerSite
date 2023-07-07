import React, { useState, useEffect } from "react";
import "./Modal.css";
import { useChangeInfo } from "../../hooks/changeInfo";
import getErrorMessage from "../../utils/getError";
import { useGetMyInfo } from "../../hooks/myInfoHooks";
import Loading from "../Loading_Error/Loading";
import Error from "../Loading_Error/Error";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  onClose: () => void;
  onSave: (formData: FormData) => void;
  // Add any additional props for your modal content
}

const Modal: React.FC<ModalProps> = ({ onClose, onSave }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [selfIntro, setSelfIntro] = useState("");

  const { data, isLoading, error } = useGetMyInfo();

  useEffect(() => {
    if (data) {
      setName(data.name);
      setPhoneNumber(data.phoneNumber);
      setSelfIntro(data.selfIntro);
      if (data.image) {
        setImageUrl(`http://localhost:8000/${data.image}`);
      }
    }
  }, [data]);

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/\D/g, "").slice(0, 11); // 최대 11자리로 제한

    // 하이픈 삽입
    const formattedValue = numericValue.replace(
      /(\d{3})(\d{4})(\d{4})/,
      "$1-$2-$3"
    );

    setPhoneNumber(formattedValue);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const changeUserInfo = useChangeInfo();

  const handleSaveModal = async () => {
    if (!name || !phoneNumber || !selfIntro) {
      alert("모든 필드를 작성해야 합니다.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phoneNumber", phoneNumber);
    formData.append("selfIntro", selfIntro);
    if (image) {
      formData.append("image", image);
    }
    console.log({ name, phoneNumber, image, selfIntro });

    try {
      await changeUserInfo.mutateAsync(formData as any);

      alert("정보가 변경되었습니다.");
      onClose();
      navigate("/mypage");
    } catch (error) {
      console.error(getErrorMessage(error));
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message="오류가 발생했습니다" />;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">회원정보 수정</h2>
        <h4>변경할 것만 값을 작성해 주세요!</h4>
        <div className="modal-body">
          {/* Add your modal content and form elements */}
          <label className="modal-label">이름</label>
          <input
            type="text"
            className="modal-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="modal-label">전화번호</label>
          <input
            type="text"
            className="modal-input"
            placeholder="- 없이 숫자만 입력"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />

          <label className="modal-label">프로필 이미지</label>
          <input
            type="file"
            accept="image/*"
            className="modal-input"
            onChange={handleImageChange}
          />
          {imageUrl && (
            <div className="modal-label-image">
              <img
                src={imageUrl}
                alt="프로필 이미지"
                className="modal-preview-image"
              />
            </div>
          )}

          <label className="modal-label">자기소개</label>
          <input
            type="text"
            className="modal-input"
            value={selfIntro}
            onChange={(e) => setSelfIntro(e.target.value)}
          />

          <div className="modal-buttons">
            <button className="modal-button" onClick={handleSaveModal}>
              저장
            </button>
            <button className="modal-button" onClick={onClose}>
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
