import React, { useContext, useState } from "react";
import "./Signin.css";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../apiClient";
import getErrorMessage from "../../utils/getError";
import { StateContext } from "../../State";

const SigninPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(StateContext);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await apiClient.post("/api/login", {
        email,
        password,
      });
      dispatch({ type: "SET_USER", payload: response.data });
      localStorage.setItem("user", JSON.stringify(response.data));

      navigate("/");
    } catch (error) {
      alert(getErrorMessage(error));
      console.error("로그인 실패:", error);
    }
  };

  return (
    <div className="signin-container">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
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
          />
        </div>
        <button type="submit" className="signin-btn">
          로그인
        </button>
      </form>
      <div className="mt-3">
        <Link to="/signup"> 아직 계정이 없으신가요?</Link>
      </div>
    </div>
  );
};

export default SigninPage;
