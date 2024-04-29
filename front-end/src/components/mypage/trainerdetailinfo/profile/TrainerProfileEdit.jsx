import React, { useState } from "react";
import "./TrainerProfileEdit.scss";
import { FaPencilAlt } from "react-icons/fa";
import CenterLocationEdit from "./leftsection/left/CenterLocationEdit";

function TrainerProfileEdit({ title, content, onSave, inputComponent }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

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
          <div className="introImgEdit_photo_wrap">
            <div className="introImgEdit_photo_container">
              <img
                src="https://storage.cloud.google.com/cda_file/trainer/3437842652_kakao/t1.jpg"
                alt={`사진`}
                className="introImgEdit_photo"
              />
            </div>
          </div>
          {content || "아직 작성된 내용이 없습니다."}
        </div>
      )}
    </div>
  );
}

export default TrainerProfileEdit;
