import React from "react";
import "./ScheduleEdit.scss";

const ScheduleEdit = ({ content, setContent }) => {
  const handleInputChange = (e) => {
    setContent(e.target.value);
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
                    <input type="checkbox" name="weekdayCheck" />
                  </td>
                  <td>평일</td>
                  <td>
                    <input type="text" maxLength="5" placeholder="시작 시간" />
                    ~
                    <input type="text" maxLength="5" placeholder="종료 시간" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="checkbox" name="saturdayCheck" />
                  </td>
                  <td>토요일</td>
                  <td>
                    <input type="text" maxLength="5" placeholder="시작 시간" />
                    ~
                    <input type="text" maxLength="5" placeholder="종료 시간" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="checkbox" name="sundayCheck" />
                  </td>
                  <td>일요일</td>
                  <td>
                    <input type="text" maxLength="5" placeholder="시작 시간" />
                    ~
                    <input type="text" maxLength="5" placeholder="종료 시간" />
                  </td>
                </tr>
                <tr>
                  <td>휴무일</td>
                  <td colSpan="2">
                    <input type="text" placeholder="휴무일 입력" />
                  </td>
                </tr>
                <tr>
                  <td colSpan="3">
                    <p>스케줄 참고사항</p>
                    <input type="text" placeholder="스케줄 참고사항 입력" />
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