import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import LoginModal from "../loginModal/LoginModal";
import axios from "axios";

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loginInfo, setLoginInfo] = useState({});
  const handleModalOpen = (value) => {
    setModalOpen(value);
  };
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("http://localhost:5000/session/checkSession");
      const result = res.data;
      setLoginInfo(result);
    }
    fetchData();
  }, []);

  console.log("login info:", loginInfo.user_id);
  return (
    <header>
      <div className="header_container">
        <div className="main_logo">
          <Link to="/">
            <img alt="mainlogo" src="/image/tmp_mainlogo.png" />
          </Link>
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
          {!!loginInfo.user_id === true ? (
            <div className="setLogin">로그인됨</div>
          ) : (
            <button className="account_btn" onClick={() => setModalOpen(true)}>
              회원가입 / 로그인
            </button>
          )}
        </div>
        {modalOpen && (
          <LoginModal modalOpen={modalOpen} handleModalOpen={handleModalOpen} />
        )}
      </div>
    </header>
  );
};

export default Header;
