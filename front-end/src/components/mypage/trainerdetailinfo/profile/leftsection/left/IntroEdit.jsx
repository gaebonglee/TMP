import React from "react";
import "./IntroEdit.scss";

const IntroEdit = ({ content, setContent }) => {
  const handleInputChange = (e) => {
    setContent(e.target.value);
  };
  return (
    <div className="IntroEdit_container">
      <div className="precautions_wrap">
        <ul>
          <li>
            • 트레이너로서 목표, 레슨 방향성 또는 신념, 좋은 트레이닝을 위한
            노력들, 마음가짐 등 자세한 이야기를 담아주세요.
          </li>
        </ul>
      </div>
      <textarea
        className="IntroEdit_text"
        placeholder=" 내용을 입력해주세요. (600자 이내)"
        value={content}
        onChange={handleInputChange}
        maxLength={600}
      />
    </div>
  );
};

export default IntroEdit;
