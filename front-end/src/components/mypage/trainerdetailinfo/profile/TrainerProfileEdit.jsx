import React from "react";
import "./TrainerProfileEdit.scss";
import { FaPencilAlt } from "react-icons/fa";

function TrainerProfileEdit({ title, content, onSave, inputComponent }) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedContent, setEditedContent] = React.useState(content);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onSave(editedContent);
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
          {content || "아직 작성된 내용이 없습니다."}
        </div>
      )}
    </div>
  );
}

export default TrainerProfileEdit;
