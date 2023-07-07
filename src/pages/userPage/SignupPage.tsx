import React, { useState, ChangeEvent, FormEvent } from "react";
import "./SignupPage.css";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../apiClient";
import getErrorMessage from "../../utils/getError";

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("비밀번호랑 비밀번호 확인이 다릅니다");
      return;
    }
    // const num = password.search(/[0-9]/g);
    // const eng = password.search(/[a-z]/gi);
    // const spe = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    // if (password.length < 8 || password.length > 20) {
    //   alert("8자리 ~ 20자리 이내로 입력해주세요.");
    //   return;
    // } else if (password.search(/\s/) != -1) {
    //   alert("비밀번호는 공백 없이 입력해주세요.");
    //   return;
    // } else if (num < 0 || eng < 0 || spe < 0) {
    //   alert("영문,숫자, 특수문자를 혼합하여 입력해주세요.");
    //   return;
    // } else {
    //   console.log("통과");
    // }

    try {
      await apiClient.post("/api/signup", {
        email,
        name,
        password,
      });

      navigate("/signin");
    } catch (error) {
      // 오류 객체를 AxiosError로 타입 지정
      const errorMessage = getErrorMessage(error);
      alert(getErrorMessage(error));
      console.error("회원 가입 요청 에러:", errorMessage);
    }
  };

  return (
    <div className="signup-container">
      <h2>회원 가입</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
            placeholder="이메일"
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
            placeholder="이름"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
            placeholder="영문(대소문자)/숫자 포함/비밀번호 자리 8~20자"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
            placeholder="영문(대소문자)/숫자 포함/비밀번호 자리 8~20자"
          />
        </div>
        <button type="submit" className="signup-btn">
          가입하기
        </button>
      </form>
      <div className="mt-3">
        <Link to="/signin">이미 계정이 있으신가요?</Link>
      </div>
    </div>
  );
};

export default SignupPage;
