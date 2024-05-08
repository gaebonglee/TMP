import React, { useState, useEffect } from "react";
import "./UserInfoNav.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserInfoNav = (props) => {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const { navInfo, setNavInfo } = props;

  useEffect(() => {
    // 로그인 세션 정보를 확인하여 userId 상태 업데이트
    const fetchUserId = async () => {
      try {
        const response = await fetch("http://localhost:5000/session/checkSession", {
          credentials: "include",
        });
        const sessionData = await response.json();
        if (sessionData.user_id) {
          setUserId(sessionData.user_id);
        } else {
          throw new Error("No user id found in session");
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  const logoutHandler = () => {
    axios.get("http://localhost:5000/session/logout").then((res) => {
      if (res.status === 200) {
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
          navigate(`/mypage/userinfo`);
        }}
      >
        기본정보
      </div>
      <div className="myInfoHr"></div>
      <div>
        <div className="myInfoBtn" onClick={() => {
          navigate(`/reservationList/${userId}`);
        }}>
          예약목록
        </div>
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

export default UserInfoNav;
