import React, { useState } from "react";
import DayTime from "./contents/DayTime";
import Purpose from "./contents/Purpose";
import Confirmation from "./contents/Confirmation";
import "../RightIntro.scss";

const Reservation = () => {
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
    <div className="reservation_contents_wrap">
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
  );
};

export default Reservation;
