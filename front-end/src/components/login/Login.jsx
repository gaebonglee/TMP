import React, { useState } from "react";
import styles from "./login.module.scss";

const Login = () => {
  const [memberDivision, setMemberDivision] = useState("일반");
  const memberDivisionHandler = (e) => {
    e.target.value === "일반"
      ? setMemberDivision("일반")
      : setMemberDivision("코치");
  };
  return (
    <div className={styles.loginBox}>
      <h1 className={styles.loginTitle}>{memberDivision} 로그인</h1>

      <div className={styles.loginBtns}>
        <button className={styles.loginBtn}>
          <img
            src={`${process.env.PUBLIC_URL}/img/kakao_login_medium_wide.png`}
            alt="login img"
          />
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
