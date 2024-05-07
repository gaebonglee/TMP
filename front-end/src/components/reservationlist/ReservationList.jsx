import React from "react";
import { useParams } from "react-router-dom";
import "./ReservationList.scss";
import { IoIosArrowDown } from "react-icons/io";

const ReservationList = () => {
  const { reservationId } = useParams();

  // 예약 ID를 사용하여 추가 데이터를 로드하거나 처리
  console.log("결제 완료된 예약 ID:", reservationId);

  return (
    <div className="reservationList_page">
      <div className="reservationList_page_container">
        <div className="reservationList_title">
          <h2>나의 예약 내역</h2>
        </div>
        <div className="reservationList">
          <div className="reservationList_wrap">
            <div className="reservationList_date">
              <p>@@@@.@@.@@</p>
              <p>
                예약 상세 보기
                <IoIosArrowDown />
              </p>
            </div>
            <ul>
              <li>###트레이너 / $$$$ </li>
              <li>선택항목, 선택항목</li>
            </ul>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationList;


