import React, { useState } from "react";
import DayTime from "./reservation/DayTime";
import Purpose from "./reservation/Purpose";
import Confirmation from "./reservation/Confirmation";
import { IoClose } from "react-icons/io5";
import "./Reservation.scss";

const Reservation = ({ handleClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="reservation_container">
      <div className="reservation_content">
        <button className="modal_close_btn" onClick={handleClose}>
          <IoClose />
        </button>
        {currentPage === 1 && (
          <div style={{ flexGrow: 1 }}>
            <DayTime setDate={setSelectedDate} setTime={setSelectedTime} />
            <div className="button_wrapper">
              <button className="reservation_next_btn" onClick={handleNext}>
                다음
              </button>
            </div>
          </div>
        )}
        {currentPage === 2 && (
          <div style={{ flexGrow: 1 }}>
            <Purpose setSubCategories={setSelectedSubCategories} />
            <div className="button_wrapper">
              <button className="reservation_prev_btn" onClick={handlePrev}>
                이전
              </button>
              <button className="reservation_next_btn" onClick={handleNext}>
                다음
              </button>
            </div>
          </div>
        )}
        {currentPage === 3 && (
          <div style={{ flexGrow: 1 }}>
            <Confirmation
              date={selectedDate}
              time={selectedTime}
              subCategories={selectedSubCategories}
            />
            <div className="button_wrapper">
              <button className="reservation_prev_btn" onClick={handlePrev}>
                이전
              </button>
              <button className="reservation_next_btn" onClick={handleNext}>
                결제 및 예약내역 확인
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservation;
