import React from "react";

const Confirmation = ({ date, time, subCategories, trainerName }) => {
  return (
    <div className="booking_page">
      <div className="booking_title">
        <h3>예약 확인</h3>
      </div>
      <div className="reservation_trainer_check">
        <p>{trainerName} 선생님</p>
        <div className="reservation_date_check">
          <a>일정</a>
          <a>
            {date ? date.toLocaleDateString() : "날짜가 선택되지 않았습니다."}
          </a>
          <a>{time || "시간이 선택되지 않았습니다."}</a>
        </div>
      </div>
      <p>
        선택 항목:
        {subCategories.length > 0
          ? subCategories.join(", ")
          : "항목이 선택되지 않았습니다."}
      </p>
    </div>
  );
};

export default Confirmation;
