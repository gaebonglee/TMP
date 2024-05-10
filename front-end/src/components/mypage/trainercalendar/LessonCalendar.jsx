import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "./LessonCalendar.scss";

const LessonCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDateContent, setSelectedDateContent] = useState(
    `${new Date().getFullYear()}년 ${
      new Date().getMonth() + 1
    }월 ${new Date().getDate()}일`
  );
  const [lessons, setLessons] = useState([]);
  const [trainerId, setTrainerId] = useState(null);
  const [reservationDates, setReservationDates] = useState([]);

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
          fetchDataForNewDate(date, sessionData.user_id);
          fetchReservationDates(sessionData.user_id);
        } else {
          console.error("Trainer ID is not available.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    checkSession();
  }, []);

  const fetchReservationDates = async (trainerId) => {
    if (trainerId) {
      try {
        const response = await fetch(
          `http://localhost:5000/reservation/getLessonDates/${trainerId}`,
          { credentials: "include" }
        );
        const data = await response.json();
        setReservationDates(
          data.map((item) => new Date(item.reservation_date))
        );
      } catch (error) {
        console.error("Failed to fetch reservation dates:", error);
      }
    }
  };

  useEffect(() => {
    if (trainerId) {
      fetchDataForNewDate(date, trainerId);
    }
  }, [date, trainerId]);

  const fetchDataForNewDate = async (newDate, trainerId) => {
    if (trainerId) {
      const utcDate = new Date(
        Date.UTC(newDate.getFullYear(), newDate.getMonth(), newDate.getDate())
      );
      const formattedDate = utcDate.toISOString().slice(0, 10);
      try {
        const lessonsResponse = await fetch(
          `http://localhost:5000/reservation/selectLessonInfo/${formattedDate}/${trainerId}`,
          { credentials: "include" }
        );
        const lessonData = await lessonsResponse.json();
        if (lessonData && lessonData.length > 0) {
          setLessons(lessonData);
        } else {
          setLessons([]);
        }
      } catch (error) {
        console.error("Failed to fetch reservations:", error);
      }
    }
  };

  const onDateChange = (date) => {
    setDate(date);
    setSelectedDateContent(
      `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
    );
    fetchDataForNewDate(date, trainerId);
  };

  const tileContent = ({ date, view }) => {
    const isReserved = reservationDates.some(
      (reservedDate) =>
        reservedDate.getDate() === date.getDate() &&
        reservedDate.getMonth() === date.getMonth() &&
        reservedDate.getFullYear() === date.getFullYear()
    );

    return view === "month" && isReserved ? (
      <div
        className="reservation_dot"
      ></div>
    ) : null;
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
                formatDay={(locale, date) => date.getDate()}
                tileContent={tileContent}
              />
            </div>
            <div className="lesson_content_right">
              <div className="lesson_scheduleDate">
                <p className="lesson_scheduleDate_today">
                  {selectedDateContent}
                </p>
                <div className="lesson_list">
                  {lessons.length > 0 ? (
                    lessons.map((lesson, idx) => (
                      <div key={idx} className="lesson_infoContent">
                        <p>회원 이름 : {lesson.user_name}</p>
                        <p>예약 시간 : {lesson.reservation_time}</p>
                        <p>선택 항목 : {lesson.selected_list}</p>
                      </div>
                    ))
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
