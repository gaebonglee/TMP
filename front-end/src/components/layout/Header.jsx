import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
const Header = () => {
  return (
    <header>
      <div className="header_container">
        <div className="main_logo">
          <Link to="/">
            {/* <img src="../../../public/image/luks_logo.jpg" /> */}
          </Link>
        </div>
        <div className="find_container">
          <Link to="#" className="find_trainer">
            트레이너 찾기
          </Link>
          <Link to="#" className="find_center">
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
              로그인
            </Link>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
