import React, { useRef } from "react";
import { IoClose } from "react-icons/io5";
import "../RightIntro.scss";
import Reservation from "./Reservation";

const ReservationModal = (props) => {
  const modalBackground = useRef();
  const { handleModalOpen } = props;
  return (
    <div
      className="reservationModal_container"
      ref={modalBackground}
      onClick={(e) => {
        if (e.target === modalBackground.current) {
          handleModalOpen(false);
        }
      }}
    >
      <div className="reservation_content" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal_close_btn"
          onClick={() => handleModalOpen(false)}
        >
          <IoClose />
        </button>
        <Reservation />
      </div>
    </div>
  );
};

export default ReservationModal;
