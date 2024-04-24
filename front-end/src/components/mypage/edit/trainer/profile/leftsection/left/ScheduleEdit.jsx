import React from "react";

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
          <li>24시간 기준으로 입력해주세요. (예:오후 8시 = 20시)</li>
          <li>브레이크 타임이 있는 경우 참고사항에 작성 해주세요.</li>
        </ul>
      </div>
      <div className="Edit_content_wrap">
        <div>
          <div className="scheduleEdit_input_wrap">
            <label>
              <input
                type="checkbox"
                checked={content.includes("평일")}
                onChange={() =>
                  setContent((prevContent) =>
                    prevContent.includes("평일")
                      ? prevContent.replace("평일", "").trim()
                      : `${prevContent} 평일`.trim()
                  )
                }
              />
              평일
              <div className="scheduleEdit_input_timeWrap">
                <input type="text" placeholder="시간" maxLength={5} />
                <label />~
                <input type="text" placeholder="시간" maxLength={5} />
              </div>
            </label>
          </div>
          <div className="scheduleEdit_input_wrap">
            <label>
              <input
                type="checkbox"
                checked={content.includes("토요일")}
                onChange={() =>
                  setContent((prevContent) =>
                    prevContent.includes("토요일")
                      ? prevContent.replace("토요일", "").trim()
                      : `${prevContent} 토요일`.trim()
                  )
                }
              />
              토요일
              <div className="scheduleEdit_input_timeWrap">
                <input type="text" placeholder="시간" maxLength={5} />
                <label />~
                <input type="text" placeholder="시간" maxLength={5} />
              </div>
            </label>
          </div>
          <div className="scheduleEdit_input_wrap">
            <label>
              <input
                type="checkbox"
                checked={content.includes("일요일")}
                onChange={() =>
                  setContent((prevContent) =>
                    prevContent.includes("일요일")
                      ? prevContent.replace("일요일", "").trim()
                      : `${prevContent} 일요일`.trim()
                  )
                }
              />
              일요일
              <div className="scheduleEdit_input_timeWrap">
                <input type="text" placeholder="시간" maxLength={5} />
                <label />~
                <input type="text" placeholder="시간" maxLength={5} />
              </div>
            </label>
          </div>
          <div className="scheduleEdit_input_wrap">
            <textarea
              placeholder="휴무일을 입력해주세요."
              value={content}
              onChange={handleInputChange}
            />
          </div>
          <div className="scheduleEdit_input_wrap">
            <textarea
              placeholder="스케줄 참고 사항을 알려주세요 (40자 이내)"
              value={content}
              onChange={handleInputChange}
              maxLength={40}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleEdit;
