import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./RightEdit.scss";

// 기본 이미지 경로
const defaultImagePath = "/image/tmp_mainlogo.png";

const RightEdit = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className="right_edit_container">
      <div className="right_edit_img_container">
        <img
          src={
            selectedFile ? URL.createObjectURL(selectedFile) : defaultImagePath
          }
          className="right_edit_img"
          alt="right_edit_img"
        />
      </div>
      <div className="right_edit_wrap">
        <div className="right_edit_top">
          <div className="right_edit_top_wrap">
            <p>@@@트레이너</p>
            <label
              htmlFor="fileInput"
              style={{ textDecorationLine: "underline", cursor: "pointer" }}
            >
              프로필 사진변경
            </label>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
          <p>센터없음</p>
          <div className="star_wrap">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
        </div>
        <div className="right_edit_bottom">
          <p>한줄소개내용</p>
          <div className="right_edit_bottom_flex">
            <div className="bottom_flexLeft">
              <p>자격검증</p>
              <p>전문분야</p>
            </div>
            <div className="bottom_flexRight">
              <p>개수</p>
              <p>바디프로필, 바디프로필, 바디프로필</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightEdit;
