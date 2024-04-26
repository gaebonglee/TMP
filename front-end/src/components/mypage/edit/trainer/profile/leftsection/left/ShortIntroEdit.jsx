import React from "react";
import "./ShortIntroEdit.scss";

const ShortIntroEdit = ({ content, setContent }) => {
  const handleInputChange = (e) => {
    setContent(e.target.value);
  };
  return (
    <div className="ShortIntroEdit_container">
      <div className="precautions_wrap">
        <ul>
          <li>• 트레이너의 인상적인 한줄 인사말을 작성해주세요.</li>
          <li>• 한줄 인사말은 트레이너 소개 오른쪽 부분에 표시됩니다.</li>
        </ul>
      </div>
      <textarea
        className="ShortIntroEdit_text"
        placeholder=" 내용을 입력해주세요. (40자 이내)"
        value={content}
        onChange={handleInputChange}
        maxLength={40}
      />
    </div>
  );
};

export default ShortIntroEdit;
