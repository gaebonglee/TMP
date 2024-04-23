// TrainerProfileEdit.jsx
import React from "react";
import "./TrainerProfileEdit.scss";
import { FaPencilAlt } from "react-icons/fa";

function TrainerProfileEdit({ title, content, onSave, useTextarea }) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedContent, setEditedContent] = React.useState(content);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onSave(editedContent);
    setIsEditing(false);
  };

  const handleCheckboxChange = (day) => {
    // Handle checkbox change
    // This is a basic example, you may want to update state differently
    setEditedContent((prevContent) => {
      const isChecked = prevContent.includes(day);
      if (isChecked) {
        return prevContent.replace(day, "").trim();
      } else {
        return `${prevContent} ${day}`.trim();
      }
    });
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
        useTextarea ? (
          <textarea
            placeholder="내용을 작성해주세요."
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        ) : (
          <div className="checkboxes">
            <label>
              <input
                type="checkbox"
                checked={editedContent.includes("평일")}
                onChange={() => handleCheckboxChange("평일")}
              />
              평일
            </label>
            <label>
              <input
                type="checkbox"
                checked={editedContent.includes("토요일")}
                onChange={() => handleCheckboxChange("토요일")}
              />
              토요일
            </label>
            <label>
              <input
                type="checkbox"
                checked={editedContent.includes("일요일")}
                onChange={() => handleCheckboxChange("일요일")}
              />
              일요일
            </label>
          </div>
        )
      ) : (
        <div className="written_content">
          {content || "아직 작성된 내용이 없습니다."}
        </div>
      )}
    </div>
  );
}

export default TrainerProfileEdit;
