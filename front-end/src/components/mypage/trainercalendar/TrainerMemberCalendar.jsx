import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./TrainerMemberCalendar.scss";

const TrainerMemberCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="trainerMemberCalendar_container">
      <div className="trainerMemberCalendar_wrap">
        <div className="trainerMemberCalendar_title">회원 관리 </div>
        <div className="trainerMemberCalendar_page">
          <div className="trainerMemberCalendar_contents">
            <div className="trainerMemberCalendar_left">
              <div className="trainerMemberCalendar_padding">
                <Calendar
                  onChange={handleDateChange}
                  value={selectedDate}
                  formatDay={(locale, date) =>
                    date.toLocaleString("en", { day: "numeric" })
                  }
                />
              </div>
            </div>
            <div className="trainerMemberCalendar_right">
              <div className="trainerMemberCalendar_padding">
                <div className="trainerMemberCalendar_schedule">
                  <p className="trainerMemberCalendar_scheduleDate">
                    {selectedDate.toLocaleDateString()}
                  </p>
                  <div className="trainerMemberCalendar_scheduleList"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerMemberCalendar;
