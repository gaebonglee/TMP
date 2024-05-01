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
  const [lessons, setLessons] = useState([]);

  // isToday 함수 정의
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

  //mysql에서 데이터 가져오는 내용
  useEffect(() => {

    fetchLessons();
  }, [date]);

  const fetchLessons = async () => {
    try {
      const response = await fetch("/selectLesson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: date }),
      });
      const data = await response.json();
      setLessons(data);
    } catch (error) {
      console.error("Error fetching lessons:", error);
    }
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
                <p>{selectedDateContent}</p>
                <div className="lesson_list">
                  {lessons.map((lesson, index) => (
                    <div key={index}>
                      <p>회원 이름: {lesson.user_name}</p>
                      <p>예약 날짜: {lesson.reservation_date}</p>
                      <p>예약 시간: {lesson.reservation_time}</p>
                    </div>
                  ))}
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
