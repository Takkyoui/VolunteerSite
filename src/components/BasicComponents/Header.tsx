import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { StateContext } from "../../State";

function Header() {
  const [selectedMenu, setSelectedMenu] = useState("");
  const navigate = useNavigate();
  const {
    state: { user },
    dispatch,
  } = useContext(StateContext);

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "CLEAR_USER" });
    alert("로그아웃 되었습니다.");
    navigate("/signin");
  };
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <Link to="/">
            <img src={"./mainlogo.png"}></img>
          </Link>
        </div>

        <div className="navbar">
          <Link
            to="/volunteer"
            className={selectedMenu === "volunteer" ? "active" : ""}
            onClick={() => setSelectedMenu("volunteer")}
          >
            봉사해요
          </Link>
          <Link
            to="/community"
            className={selectedMenu === "community" ? "active" : ""}
            onClick={() => setSelectedMenu("community")}
          >
            커뮤니티
          </Link>
          <Link
            to="/review"
            className={selectedMenu === "review" ? "active" : ""}
            onClick={() => setSelectedMenu("review")}
          >
            봉사후기
          </Link>
        </div>
        <div className="header-nav">
          {user ? (
            <>
              <Link to="/mypage" className="link">
                <div>마이페이지</div>
              </Link>

              <Link to="#" onClick={logout} className="link">
                <div>로그아웃</div>
              </Link>
            </>
          ) : (
            <>
              <Link to="/signin" className="link">
                <div>로그인</div>
              </Link>

              <Link to="/signup" className="link">
                <div>회원가입</div>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
