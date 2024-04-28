import React, { useState } from "react";
import "./Menu.scss";

const Menu = ({ trainerInfo, handleTrainerInfo }) => {
  return (
    <div className="detail_menu">
      <div className="detail_menu_top">
        <div className="detail_menu_top_flex">
          <div className="top_tab" onClick={() => handleTrainerInfo("coach")}>
            코치
          </div>
          <div className="top_tab" onClick={() => handleTrainerInfo("center")}>
            센터
          </div>
        </div>
      </div>
      <div className="detail_menu_bottom">
        <div className="detail_menu_bottom_flex">
          {trainerInfo === "coach" && (
            <>
              <a className="bottom_tab">소개</a>
              <a className="bottom_tab">자격사항</a>
              <a className="bottom_tab">스케줄</a>
              <a className="bottom_tab">프로그램</a>
              <a className="bottom_tab">후기</a>
              <a className="bottom_tab">이용가격</a>
              <a className="bottom_tab">위치</a>
            </>
          )}
          {trainerInfo === "center" && (
            <>
              <a className="bottom_tab">기본정보</a>
              <a className="bottom_tab">센터소개</a>
              <a className="bottom_tab">이용정보</a>
              <a className="bottom_tab">운영시간</a>
              <a className="bottom_tab">위치</a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
