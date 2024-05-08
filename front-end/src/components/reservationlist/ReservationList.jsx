import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ReservationList.scss";

const ReservationList = () => {
  const { userId } = useParams();
  const [reservations, setReservations] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest"); // 정렬 상태
  const [fetchedData, setFetchedData] = useState([]); // 서버로부터 가져온 원본 데이터

  useEffect(() => {
    fetchReservations();
  }, []);

  useEffect(() => {
    // fetchedData가 변경되었을 때만 정렬 실행
    sortReservations();
  }, [sortOrder, fetchedData]);

  const fetchReservations = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/reservation/selectReservationList/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch reservations");
      }
      const data = await response.json();
      setFetchedData(data); // 원본 데이터 상태 업데이트
    } catch (error) {
      console.error("Error fetching reservation list:", error);
    }
  };

  const sortReservations = () => {
    const sortedData = [...fetchedData].sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.reservation_date) - new Date(a.reservation_date);
      } else {
        return new Date(a.reservation_date) - new Date(b.reservation_date);
      }
    });
    setReservations(sortedData); // 정렬된 데이터를 상태로 설정
  };

  return (
    <div className="reservationList_page">
      <div className="reservationList_page_container">
        <div className="reservationList_title">
          <h2>예약 내역</h2>
        </div>

        <div className="reservationList_wrap">
          <div className="reservationList_option">
            <select
              onChange={(e) => setSortOrder(e.target.value)}
              value={sortOrder}
            >
              <option value="newest">최신 날짜순</option>
              <option value="oldest">오래된 날짜순</option>
            </select>
          </div>
          {reservations.length > 0 ? (
            <div className="reservation_cards">
              {reservations.map((reservation, index) => (
                <div key={index} className="reservation_card">
                  <div className="card_header">
                    <h3>{reservation.trainer_name} 트레이너</h3>
                    <p>
                      {new Date(
                        reservation.reservation_date
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="card_body">
                    <p>
                      <strong>예약 시간 :</strong>{" "}
                      {reservation.reservation_time}
                    </p>
                    <p>
                      <strong>선택 항목 :</strong> {reservation.selected_list}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>예약 내역이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationList;
