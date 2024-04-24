import React from "react";
import "./InfoNav.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const InfoNav = (props) => {
  const navigate = useNavigate();
  const { navInfo, setNavInfo } = props;
  const logoutHandler = () => {
    axios.get("http://localhost:5000/session/logout").then((res) => {
      if (res.status == 200) {
        navigate("/");
        window.location.reload();
      }
    });
  };

  window.addEventListener("click", (e) => {
    const loginArr = ["setLogin", "loginMain", "loginIcon", "loginTitle"];
    if (
      navInfo &&
      e.target.parentElement &&
      !loginArr.includes(e.target.parentElement.className)
    ) {
      setNavInfo(false);
    }
  });
  return (
    <div
      className="btnGroup"
      style={{ visibility: navInfo ? "visible" : "hidden" }}
    >
      <div
        className="myInfoBtn"
        onClick={() => {
          navigate(`/`);
        }}
      >
        마이페이지
      </div>
      <div className="myInfoHr"></div>
      <div>
        <div className="myInfoBtn" onClick={logoutHandler}>
          로그아웃
        </div>
      </div>
    </div>
  );
};

export default InfoNav;
