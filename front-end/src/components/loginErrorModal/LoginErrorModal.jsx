import React from "react";
import styles from "./LoginErrorModal.module.scss";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const LoginErrorModal = (props) => {
  const { roles } = props;
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    iconColor: "white",
    customClass: {
      popup: "colored-toast",
    },
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
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

  Toast.fire({
    icon: "error",
    title: txt,
  });
  return <></>;
};

export default LoginErrorModal;
