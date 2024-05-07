import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ReservationList.scss";
import { IoIosArrowDown } from "react-icons/io";

const ReservationList = () => {
  const { userId } = useParams(); // useParams를 통해 userId를 직접 사용
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/reservation/selectReservationList/${userId}`, // 이용자 ID를 이용해 예약 목록을 조회
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        if (response.ok) {
          setReservations(data);
        } else {
          throw new Error("Failed to fetch reservations");
        }
      } catch (error) {
        console.error("Error loading reservations:", error);
      }
    };

    if (userId) {
      // userId가 유효할 때만 예약 목록을 조회
      fetchReservations();
    }
  }, [userId]); // userId가 변경될 때마다 이펙트를 다시 실행

  return (
    <div className="reservationList_page">
      <div className="reservationList_page_container">
        <div className="reservationList_title">
          <h2>나의 예약 내역</h2>
        </div>
        <div className="reservationList">
          {reservations.map((reservation, index) => (
            <div key={index} className="reservationList_wrap">
              <div className="reservationList_date">
                <p>
                  {new Date(reservation.reservation_date).toLocaleDateString(
                    "ko-KR"
                  )}
                </p>
                <p>
                  예약 상세 보기
                  <IoIosArrowDown />
                </p>
              </div>
              <ul>
                <li>
                  {reservation.trainer_name} / {reservation.reservation_time}
                </li>
                <li>{reservation.selected_list}</li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReservationList;
