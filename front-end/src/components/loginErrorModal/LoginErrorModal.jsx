import React from "react";
import styles from "./LoginErrorModal.module.scss";

const LoginErrorModal = (props) => {
  const { roles } = props;
  return (
    <div className={styles.error__modal}>
      이미 {roles === "user" ? "트레이너" : "회원"}&#40;으&#41;로 가입한
      계정입니다.
    </div>
  );
};

export default LoginErrorModal;
