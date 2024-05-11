import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import LoginModal from "../loginModal/LoginModal";
import { BsPersonCircle } from "react-icons/bs";
import { PiCrownBold } from "react-icons/pi";
import { useQuery } from "@tanstack/react-query";
import TrainerInfoNav from "../trainerInfoNav/TrainerInfoNav";
import UserInfoNav from "../userInfoNav/UserInfoNav";
import AdminInfoNav from "components/adminInfoNav/AdminInfoNav";
const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [navInfo, setNavInfo] = useState(false);
  const handleModalOpen = (value) => {
    setModalOpen(value);
  };

  const renderNav = () => {
    switch (loginInfo.role) {
      case "user":
        return <UserInfoNav navInfo={navInfo} setNavInfo={setNavInfo} />;
      case "admin":
        return <AdminInfoNav navInfo={navInfo} setNavInfo={setNavInfo} />;
      case "trainer":
        return <TrainerInfoNav navInfo={navInfo} setNavInfo={setNavInfo} />;
      default:
        return null;
    }
  };
  const {
    isPending,
    error,
    data: loginInfo,
  } = useQuery({
    queryKey: ["loginInfo"],
    queryFn: () =>
      fetch("http://localhost:5000/session/checkSession", {
        method: "GET",
        credentials: "include",
      }).then((res) => res.json()),
  });

  if (isPending) return <div>Loading...</div>;

  if (error) return "An error has occurred: " + error.message;

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
          <Link to="/servicecenter" className="inquiry_link">
            1:1 문의하기
          </Link>
        </div>
        <div className="account_container">
          {loginInfo.role === "admin" ? (
            <Link
              to="/servicecenter/inquirylist/admin"
              className="user_inquiry_check"
            >
              <span className="aster">*</span>고객 문의내역 확인
              <span className="aster">*</span>
            </Link>
          ) : null}
          {!!loginInfo.user_id === true ? (
            <div
              className="setLogin"
              onClick={() => {
                setNavInfo((prev) => !prev);
              }}
            >
              <div className="loginMain">
                {loginInfo.role === "admin" ? (
                  <span className="loginIcon2">
                    <PiCrownBold />
                  </span>
                ) : (
                  <span className="loginIcon">
                    <BsPersonCircle />
                  </span>
                )}
                <span className="loginTitle">
                  {loginInfo.user_name}{" "}
                  <span style={{ color: "black" }}>님</span>
                </span>
              </div>
            </div>
          ) : (
            <button className="account_btn" onClick={() => setModalOpen(true)}>
              회원가입 / 로그인
            </button>
          )}
        </div>
        {modalOpen && (
          <LoginModal modalOpen={modalOpen} handleModalOpen={handleModalOpen} />
        )}
        {renderNav()}
      </div>
    </header>
  );
};

export default Header;
