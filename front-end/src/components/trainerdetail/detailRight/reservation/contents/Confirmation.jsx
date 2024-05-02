import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Confirmation = () => {
  const { trainerId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/session/checkSession",
          {
            credentials: "include",
          }
        );
        const sessionData = await response.json();
        if (sessionData.user_id) {
          setUserId(sessionData.user_id);
        } else {
          throw new Error("No user id found in session");
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleConfirm = () => {
    console.log("mysql데이터 저장 완료");
    // 예약 데이터 구성
    const reservationData = {
      reservation_date: new Date(
        state.date.getTime() - state.date.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0],
      reservation_time: state.time,
      user_id: userId,
      received_trainer_id: trainerId,
      selected_list: state.subCategories.join(", "),
    };

    // 서버로 예약 데이터 전송
    fetch("http://localhost:5000/reservation/saveReservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservationData),
    })
      .then((response) => {
        console.log("Response status:", response.status);
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        if (data.reservationId) {
          navigate(`/paymentComplete/${data.reservationId}`); // 예약 완료 페이지로 이동
        } else {
          throw new Error("Reservation ID not provided");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("예약에 실패했습니다: " + error.message);
      });
  };

  return (
    <div className="confirmation_page">
      <div className="confirmation_title">
        <h3>예약 확인</h3>
      </div>
      <div className="reservation_trainer_check">
        <p>{state.trainerName} 선생님</p>
        <div className="reservation_date_check">
          <a>일정</a>
          <a>
            {state.date
              ? state.date.toLocaleDateString()
              : "날짜가 선택되지 않았습니다."}
          </a>
          <a>{state.time || "시간이 선택되지 않았습니다."}</a>
        </div>
      </div>
      <p>
        선택 항목:{" "}
        {state.subCategories.length > 0
          ? state.subCategories.join(", ")
          : "항목이 선택되지 않았습니다."}
      </p>
      <button onClick={handleBack}>이전</button>
      <button onClick={handleConfirm}>예약 및 결제완료</button>
    </div>
  );
};

export default Confirmation;
