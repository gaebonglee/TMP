import React, { useState } from "react";
import styles from "./login.module.scss";
import { BiSolidMessageRounded } from "react-icons/bi";
import { SiNaver } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [memberDivision, setMemberDivision] = useState("일반");
  const memberDivisionHandler = (e) => {
    e.target.value === "일반"
      ? setMemberDivision("일반")
      : setMemberDivision("코치");
  };

  const handlerKakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_LOGIN_REST_KEY}&response_type=code&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}`;
  };
  return (
    <div className={styles.loginBox}>
      <h1 className={styles.loginTitle}>{memberDivision} 로그인</h1>

      <div className={styles.loginBtns}>
        <button
          onClick={handlerKakaoLogin}
          className={`${styles.loginBtn} ${styles.loginBtn1}`}
        >
          <BiSolidMessageRounded />{" "}
          <span className={styles.loginName}>카카오</span> 로그인
        </button>
        <button className={`${styles.loginBtn} ${styles.loginBtn2}`}>
          <SiNaver /> <span className={styles.loginName}>네이버</span> 로그인
        </button>
        <button className={`${styles.loginBtn} ${styles.loginBtn3}`}>
          <span className={styles.loginGoogle}>
            <FcGoogle />
          </span>{" "}
          <span className={`${styles.loginName} ${styles.loginNameGoogle}`}>
            구글
          </span>{" "}
          로그인
        </button>
      </div>
      <hr className={styles.hr} />
      <div className={styles.memberDivision}>
        <button
          className={styles.btnDivision}
          onClick={memberDivisionHandler}
          value={"일반"}
        >
          일반 로그인
        </button>
        <button
          className={styles.btnDivision}
          onClick={memberDivisionHandler}
          value={"코치"}
        >
          코치 로그인
        </button>
      </div>
    </div>
  );
};

export default Login;
