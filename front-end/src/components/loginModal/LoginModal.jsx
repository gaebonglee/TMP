import React, { useRef } from "react";
import styles from "./LoginModal.module.scss";
import { AiOutlineClose } from "react-icons/ai";
import Login from "../login/Login";

const LoginModal = (props) => {
  const modalBackground = useRef();
  const { handleModalOpen } = props;
  return (
    <div
      className={styles.modal_container}
      ref={modalBackground}
      onClick={(e) => {
        if (e.target === modalBackground.current) {
          handleModalOpen(false);
        }
      }}
    >
      <div className={styles.modal_content}>
        <div className={styles.modal_close_btn_box}>
          <button
            className={styles.modal_close_btn}
            onClick={() => handleModalOpen(false)}
          >
            <AiOutlineClose />
          </button>
        </div>

        <Login />
      </div>
    </div>
  );
};

export default LoginModal;
