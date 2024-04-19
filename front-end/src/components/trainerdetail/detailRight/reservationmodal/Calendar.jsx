import React, { useState } from "react";
import "./Calendar.scss"; // 모달창 스타일

const Modal = ({ isOpen, close }) => {
  return (
    <div className={`modal ${isOpen ? "show" : ""}`} onClick={close}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={close}>
          &times;
        </span>
        <p>여기에 예약 시스템 내용을 넣으세요.</p>
      </div>
    </div>
  );
};

function MyApp() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>예약하기</button>
      <Modal isOpen={modalOpen} close={closeModal} />
    </div>
  );
}

export default MyApp;
