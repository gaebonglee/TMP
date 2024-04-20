import React from "react";

const Confirmation = ({ date, time }) => {
  return (
    <div>
      <h2>예약 확인</h2>
      <p>선택한 날짜: {date.toLocaleDateString()}</p>
      <p>선택한 시간: {time}</p>
    </div>
  );
};

export default Confirmation;
