import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./LessonCalendar.scss";

const LessonCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDateContent, setSelectedDateContent] = useState(
    `${new Date().getFullYear()}년 ${
      new Date().getMonth() + 1
    }월 ${new Date().getDate()}일`
  );
  const [reservationInfo, setReservationInfo] = useState(null);
  const [trainerId, setTrainerId] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const sessionResponse = await fetch(
          "http://localhost:5000/session/checkSession",
          { credentials: "include" }
        );
        const sessionData = await sessionResponse.json();

        if (sessionData && sessionData.user_id) {
          setTrainerId(sessionData.user_id);
          fetchReservations(sessionData.user_id, date);
        } else {
          console.error("Trainer ID is not available.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    checkSession();
  }, []);

  useEffect(() => {
    if (trainerId) {
      fetchReservations(trainerId, date);
    }
  }, [date, trainerId]);

  const fetchReservations = async (trainerId, date) => {
    const formattedDate = date.toISOString().slice(0, 10);
    try {
      const response = await fetch(
        `http://localhost:5000/reservation/selectLessonInfo/${formattedDate}/${trainerId}`,
        { credentials: "include" }
      );
      const data = await response.json();
      setReservationInfo(data.length > 0 ? data[0] : null);
    } catch (error) {
      console.error("Failed to fetch reservations:", error);
    }
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const onDateChange = (date) => {
    setDate(date);
    setSelectedDateContent(
      `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
    );
  };

  return (
    <div className="lesson_container">
      <div className="lesson_wrap">
        <div className="lesson_title">
          <p>회원관리</p>
        </div>
        <div className="lesson_page">
          <div className="lesson_contents">
            <div className="lesson_content_left">
              <Calendar
                onChange={onDateChange}
                value={date}
                minDate={new Date()}
                formatDay={(locale, date) => date.getDate()}
                tileContent={({ date, view }) =>
                  view === "month" && isToday(date) ? (
                    <p style={{ fontSize: "12px" }}>오늘</p>
                  ) : null
                }
              />
            </div>
            <div className="lesson_content_right">
              <div className="lesson_scheduleDate">
                <p className="lesson_scheduleDate_today">
                  {selectedDateContent}
                </p>
                <div className="lesson_list">
                  {reservationInfo ? (
                    <div>
                      <p>회원 이름: {reservationInfo.user_name}</p>
                      <p>예약 날짜: {selectedDateContent}</p>
                      <p>예약 시간: {reservationInfo.reservation_time}</p>
                      <p>선택 항목: {reservationInfo.selected_list}</p>
                    </div>
                  ) : (
                    <p>해당 날짜에 예약이 없습니다.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonCalendar;
