import React from "react";
import "./TrainerSchedule.scss";
const TrainerSchedule = ({ data, sectionRefs }) => {
  return (
    <div>
      <div id="intro_page_contents_wrap" className="trainer_schedule">
        <h1 id="header_section3" ref={sectionRefs.current.header_section3}>
          레슨 스케줄
        </h1>
        <ul id="wrap_container">
          {!!data.weekday && (
            <li className="trainerScheduleList">
              <div className="trainerScheduleList__dayOfWeek">평일</div>
              <div className="trainerScheduleList__time">
                {data.weekday_start} ~ {data.weekday_end}
              </div>
            </li>
          )}
          {!!data.saturday && (
            <li className="trainerScheduleList">
              <div className="trainerScheduleList__dayOfWeek">토요일</div>
              <div className="trainerScheduleList__time">
                {data.saturday_start} ~ {data.saturday_end}
              </div>
            </li>
          )}
          {!!data.sunday && (
            <li className="trainerScheduleList">
              <div className="trainerScheduleList__dayOfWeek">일요일</div>
              <div className="trainerScheduleList__time">
                {data.sunday_start} ~ {data.sunday_end}
              </div>
            </li>
          )}
          {!!data.dayoff && (
            <li className="trainerScheduleList">
              <div className="trainerScheduleList__dayOfWeek">휴무일</div>
              <div className="trainerScheduleList__time">{data.dayoff}</div>
            </li>
          )}
        </ul>
        {!!data.note && (
          <li className="trainerScheduleList">
            <div className="trainerScheduleList__note">• {data.note}</div>
          </li>
        )}
      </div>
    </div>
  );
};

export default TrainerSchedule;
