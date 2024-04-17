import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
const Header = () => {
  return (
    <header>
      <div className="header_container">
        <div className="main_logo">
          <Link to="/"></Link>
        </div>
        <div className="find_container">
          <Link to="/trainermap" className="find_trainer">
            트레이너 찾기
          </Link>
          <Link to="/centermap" className="find_center">
            센터 찾기
          </Link>
        </div>
        <div className="account_container">
          <button>
            <Link to="#" className="login_btn">
              로그인
            </Link>
          </button>
          <span></span>
          <button>
            <Link to="#" className="join_btn">
              회원가입
            </Link>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
