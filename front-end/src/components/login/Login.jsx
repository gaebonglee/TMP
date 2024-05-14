import React, { useState } from "react";
import styles from "./login.module.scss";
import { BiSolidMessageRounded } from "react-icons/bi";
import { SiNaver } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [memberDivision, setMemberDivision] = useState("user");
  const memberDivisionHandler = (e) => {
    e.target.value === "user"
      ? setMemberDivision("user")
      : setMemberDivision("trainer");
  };

  const handlerKakaoLogin = () => {
    let redirectUri = "";
    memberDivision === "user"
      ? (redirectUri = process.env.REACT_APP_KAKAO_REDIRECT_URI_USER)
      : (redirectUri = process.env.REACT_APP_KAKAO_REDIRECT_URI_TRAINER);

    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_LOGIN_REST_KEY}&response_type=code&redirect_uri=${redirectUri}`;
  };

  const handlerNaverLogin = () => {
    let redirectUri = "";
    memberDivision === "user"
      ? (redirectUri = process.env.REACT_APP_NAVER_REDIRECT_URI_USER)
      : (redirectUri = process.env.REACT_APP_NAVER_REDIRECT_URI_TRAINER);

    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_LOGIN_CLIENT_ID}&redirect_uri=${redirectUri}&state=RANDOM_STATE`;
  };

  const handlerGoogleLogin = () => {
    let redirectUri = "";
    memberDivision === "user"
      ? (redirectUri = process.env.REACT_APP_GOOGLE_REDIRECT_URI_USER)
      : (redirectUri = process.env.REACT_APP_GOOGLE_REDIRECT_URI_TRAINER);

    console.log("redirectKey :", redirectUri);

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=email profile openid https://www.googleapis.com/auth/user.phonenumbers.read https://www.googleapis.com/auth/user.gender.read`;
  };

  return (
    <div className={styles.loginBox}>
      <h1 className={styles.loginTitle}>
        {memberDivision === "user" ? "회원" : "트레이너"} 로그인
      </h1>

      <div className={styles.loginBtns}>
        <button
          onClick={handlerKakaoLogin}
          className={`${styles.loginBtn} ${styles.loginBtn1}`}
        >
          <BiSolidMessageRounded />{" "}
          <span className={styles.loginName}>카카오</span> 로그인
        </button>
        <button
          onClick={handlerNaverLogin}
          className={`${styles.loginBtn} ${styles.loginBtn2}`}
        >
          <SiNaver /> <span className={styles.loginName}>네이버</span> 로그인
        </button>
        <button
          onClick={handlerGoogleLogin}
          className={`${styles.loginBtn} ${styles.loginBtn3}`}
        >
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
          value={"user"}
        >
          회원 로그인
        </button>
        <button
          className={styles.btnDivision}
          onClick={memberDivisionHandler}
          value={"trainer"}
        >
          트레이너 로그인
        </button>
      </div>
    </div>
  );
};

export default Login;
