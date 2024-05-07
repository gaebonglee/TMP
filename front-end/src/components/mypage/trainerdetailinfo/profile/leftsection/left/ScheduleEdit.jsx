import React, { useState } from "react";
import "./ScheduleEdit.scss";

const ScheduleEdit = ({ content, setContent }) => {
  const [weekday, setWeekday] = useState(content.weekday);
  const [weekday_start, setWeekdayStart] = useState(content.weekday_start);
  const [weekday_end, setWeekdayEnd] = useState(content.weekday_end);
  const [saturday, setSaturday] = useState(content.saturday);
  const [saturday_start, setSaturdayStart] = useState(content.saturday_start);
  const [saturday_end, setSaturdayEnd] = useState(content.saturday_end);
  const [sunday, setSunday] = useState(content.sunday);
  const [sunday_start, setSundayStart] = useState(content.sunday_start);
  const [sunday_end, setSundayEnd] = useState(content.sunday_end);
  const [dayoff, setDayoff] = useState(content.dayoff);
  const [note, setNote] = useState(content.note);
  const updateContent = (key, value) => {
    setContent((prevContent) => ({
      ...prevContent,
      [key]: value,
    }));
    console.log("현재 content :::", content);
  };

  return (
    <div className="scheduleEdit_container">
      <div className="subtitle">
        <p>트레이너님 레슨 가능한 스케줄을 알려주세요.</p>
      </div>
      <div className="precautions_wrap">
        <ul>
          <li>
            • 24시간 기준으로 입력해주세요. (예시 : 오후8시는 20시로 입력)
          </li>
          <li>• 브레이크 타임이 있는 경우 참고사항에 작성 해주세요.</li>
        </ul>
      </div>
      <div className="scheduleEdit_content">
        <div className="scheduleEdit_container">
          <div className="scheduleEdit_table_wrap">
            <table className="trainerScheduleTable">
              <tbody>
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      name="weekdayCheck"
                      checked={!!weekday}
                      onChange={(e) => {
                        setWeekday(e.target.checked);
                        updateContent("weekday", e.target.checked ? 1 : 0);
                      }}
                    />
                  </td>
                  <td>평일</td>
                  <td>
                    <input
                      type="text"
                      maxLength="5"
                      placeholder="시작 시간"
                      value={!!weekday_start ? weekday_start : ""}
                      onChange={(e) => {
                        setWeekdayStart(e.target.value);
                        updateContent("weekday_start", e.target.value);
                      }}
                    />
                    ~
                    <input
                      type="text"
                      maxLength="5"
                      placeholder="종료 시간"
                      value={!!weekday_end ? weekday_end : ""}
                      onChange={(e) => {
                        setWeekdayEnd(e.target.value);
                        updateContent("weekday_end", e.target.value);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      name="saturdayCheck"
                      checked={!!saturday}
                      onChange={(e) => {
                        setSaturday(e.target.checked);
                        updateContent("saturday", e.target.checked ? 1 : 0);
                      }}
                    />
                  </td>
                  <td>토요일</td>
                  <td>
                    <input
                      type="text"
                      maxLength="5"
                      placeholder="시작 시간"
                      value={!!saturday_start ? saturday_start : ""}
                      onChange={(e) => {
                        setSaturdayStart(e.target.value);
                        updateContent("saturday_start", e.target.value);
                      }}
                    />
                    ~
                    <input
                      type="text"
                      maxLength="5"
                      placeholder="종료 시간"
                      value={!!saturday_end ? saturday_end : ""}
                      onChange={(e) => {
                        setSaturdayEnd(e.target.value);
                        updateContent("saturday_end", e.target.value);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      name="sundayCheck"
                      checked={!!sunday}
                      onChange={(e) => {
                        setSunday(e.target.checked);
                        updateContent("sunday", e.target.checked ? 1 : 0);
                      }}
                    />
                  </td>
                  <td>일요일</td>
                  <td>
                    <input
                      type="text"
                      maxLength="5"
                      placeholder="시작 시간"
                      value={!!sunday_start ? sunday_start : ""}
                      onChange={(e) => {
                        setSundayStart(e.target.value);
                        updateContent("sunday_start", e.target.value);
                      }}
                    />
                    ~
                    <input
                      type="text"
                      maxLength="5"
                      placeholder="종료 시간"
                      value={!!sunday_end ? sunday_end : ""}
                      onChange={(e) => {
                        setSundayEnd(e.target.value);
                        updateContent("sunday_end", e.target.value);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>휴무일</td>
                  <td colSpan="2">
                    <input
                      type="text"
                      placeholder="휴무일 입력"
                      value={!!dayoff ? dayoff : ""}
                      onChange={(e) => {
                        setDayoff(e.target.value);
                        updateContent("dayoff", e.target.value);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="3">
                    <p>스케줄 참고사항</p>
                    <input
                      type="text"
                      placeholder="스케줄 참고사항 입력"
                      value={!!note ? note : ""}
                      onChange={(e) => {
                        setNote(e.target.value);
                        updateContent("note", e.target.value);
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleEdit;
