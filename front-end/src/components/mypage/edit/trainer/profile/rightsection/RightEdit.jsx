import React from "react";
import "./RightEdit.scss";
import { FaStar } from "react-icons/fa6";

const RightEdit = () => {
  return (
    <div className="right_edit_container">
      <img className="right_edit_img" alt="right_edit_img"></img>
      <div className="right_edit_wrap">
        <div className="right_edit_top">
          <p>@@@트레이너</p>
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
