import React from "react";
import styles from "./LoginErrorModal.module.scss";

const LoginErrorModal = (props) => {
  const { roles } = props;
  window.scrollTo({ top: 0, behavior: "smooth" });
  let txt = "";
  switch (roles) {
    case "user":
      txt = `이미 ${roles === "user" ? "트레이너" : "회원"}(으)로 가입한
      계정입니다.`;
      break;
    case "trainer":
      txt = `이미 ${roles === "user" ? "트레이너" : "회원"}(으)로 가입한
      계정입니다.`;
      break;
    case "reservation_need_login":
      txt = `로그인이 필요합니다.`;
      break;
    case "reservation_trainer":
      txt = `트레이너는 예약을 진행할 수 없습니다.`;
      break;
    default:
      break;
  }
  return <div className={styles.error__modal}>{txt}</div>;
};

export default LoginErrorModal;
