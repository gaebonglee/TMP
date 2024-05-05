import React, { useState } from "react";
import "./TrainerProfileEdit.scss";
import { FaPencilAlt } from "react-icons/fa";
import { PiCertificate, PiTrophy } from "react-icons/pi";
// import CenterLocationEdit from "./leftsection/left/CenterLocationEdit";

function TrainerProfileEdit({ title, content, onSave, inputComponent }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  let emptyData = true;
  if (content !== null) {
    if (content.length === 0) {
      emptyData = true;
    } else {
      emptyData = false;
    }
  } else if (content === null) {
    emptyData = true;
  } else if (content.length == 0) {
    emptyData = false;
  }
  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleSave = () => {
    if (title === "자기소개") {
      onSave(editedContent, "자기소개");
    } else if (title === "레슨스케줄") {
      onSave(editedContent, "레슨스케줄");
    } else if (title === "프로그램") {
      onSave(editedContent, "프로그램");
    } else {
      onSave(editedContent);
    }
    setIsEditing(false);
  };

  return (
    <div className="left_edit_container">
      <div className="edit_title_wrap">
        <h2>{title}</h2>
        <div className="edit_btn_wrap">
          {isEditing ? (
            <button onClick={handleSave}>
              <FaPencilAlt />
              저장
            </button>
          ) : (
            <button onClick={handleEdit}>
              <FaPencilAlt />
              수정
            </button>
          )}
        </div>
      </div>
      {isEditing ? (
        <div className="input_container">
          {inputComponent
            ? inputComponent(editedContent, setEditedContent)
            : null}
        </div>
      ) : (
        <div className="written_content">
          {title === "사진" &&
            content &&
            content.map((v, i) => {
              const type = typeof v;
              const resultSrc = type === "object" ? URL.createObjectURL(v) : v;
              return (
                <img
                  key={i}
                  src={resultSrc}
                  alt={`mypage_photo`}
                  className="introImgEdit_photo"
                />
              );
            })}
          {title === "자기소개" && (
            <div style={{ whiteSpace: "pre-wrap" }}>{content}</div>
          )}
          {title === "검증된 자격 사항" &&
            content &&
            content.map((v, i) => {
              return (
                <div key={i} className="edit_certification_lists">
                  <div>
                    {v.certification_type === "1" ? (
                      <PiCertificate />
                    ) : (
                      <PiTrophy />
                    )}
                  </div>
                  <div>{v.certification_name}</div>
                </div>
              );
            })}
          {title === "레슨스케줄" &&
            (content ? (
              <div>
                {!!content.weekday && (
                  <li className="trainerScheduleList">
                    <div className="trainerScheduleList__dayOfWeek">평일</div>
                    <div className="trainerScheduleList__time">
                      {content.weekday_start} ~ {content.weekday_end}
                    </div>
                  </li>
                )}
                {!!content.saturday && (
                  <li className="trainerScheduleList">
                    <div className="trainerScheduleList__dayOfWeek">토요일</div>
                    <div className="trainerScheduleList__time">
                      {content.saturday_start} ~ {content.saturday_end}
                    </div>
                  </li>
                )}
                {!!content.sunday && (
                  <li className="trainerScheduleList">
                    <div className="trainerScheduleList__dayOfWeek">일요일</div>
                    <div className="trainerScheduleList__time">
                      {content.sunday_start} ~ {content.sunday_end}
                    </div>
                  </li>
                )}
              </div>
            ) : (
              "아직 작성된 내용이 없습니다."
            ))}
          {title === "프로그램" &&
            content.map((v, i) => {
              if (v.program_id !== null) {
                return (
                  <div key={i} className="trainer__program__titles">
                    🎉 {v.title}
                  </div>
                );
              } else {
                return "아직 작성된 내용이 없습니다.";
              }
            })}
          {title === "레슨 이용 가격" && (
            <ul>
              {content.map((v, i) => {
                if (!!!v.count) {
                  return;
                }
                return (
                  <li key={i} className="lesson_li">
                    <div className="priceCount">{v.count}회</div>
                    <p className="pricePer">
                      회당 {(v.total_price / v.count).toLocaleString("ko-KR")}원
                    </p>
                    <p className="priceTotal">
                      {Number(v.total_price)
                        ? Number(v.total_price).toLocaleString("ko-KR")
                        : 0}
                      원
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
          {title === "한줄 소개" && (
            <p style={{ whiteSpace: "pre-wrap" }}>{content}</p>
          )}

          {emptyData && "아직 작성된 내용이 없습니다."}
        </div>
      )}
    </div>
  );
}

export default TrainerProfileEdit;
