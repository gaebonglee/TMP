import React from "react";

const Confirmation = ({ date, time, subCategories }) => {
  return (
    <div>
      <h2>예약 확인</h2>
      <p>
        선택한 날짜:{" "}
        {date ? date.toLocaleDateString() : "날짜가 선택되지 않았습니다."}
      </p>
      <p>선택한 시간: {time || "시간이 선택되지 않았습니다."}</p>
      <p>
        선택한 소분류 항목:{" "}
        {subCategories.length > 0
          ? subCategories.join(", ")
          : "항목이 선택되지 않았습니다."}
      </p>
    </div>
  );
};

export default Confirmation;
