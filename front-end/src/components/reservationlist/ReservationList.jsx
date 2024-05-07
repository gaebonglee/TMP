import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ReservationList.scss";

const ReservationList = () => {
  const { userId } = useParams();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/reservation/selectReservationList/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch reservations");
      }
      const data = await response.json();
      data.sort(
        (a, b) => new Date(b.reservation_date) - new Date(a.reservation_date)
      );
      setReservations(data);
    } catch (error) {
      console.error("Error fetching reservation list:", error);
    }
  };

  return (
    <div className="reservation-list-page">
      <h2>예약 내역</h2>
      {reservations.length > 0 ? (
        <table className="reservation-table">
          <thead>
            <tr>
              <th>트레이너 이름</th>
              <th>예약 날짜</th>
              <th>예약 시간</th>
              <th>선택 항목</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation, index) => (
              <tr key={index}>
                <td>{reservation.trainer_name}</td>
                <td>
                  {new Date(reservation.reservation_date).toLocaleDateString()}
                </td>
                <td>{reservation.reservation_time}</td>
                <td>{reservation.selected_list}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>예약 내역이 없습니다.</p>
      )}
    </div>
  );
};

export default ReservationList;
