import React, { useState } from "react";
import "./Menu.scss";

const Menu = () => {
  const [selectedTab, setSelectedTab] = useState("코치");
  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };
  return (
    <div className="detail_menu">
      <div className="detail_menu_top">
        <div className="detail_menu_top_flex">
          <div className="top_tab" onClick={() => handleTabClick("코치")}>
            코치
          </div>
          <div className="top_tab" onClick={() => handleTabClick("센터")}>
            센터
          </div>
          <div className="top_tab" onClick={() => handleTabClick("후기")}>
            후기
          </div>
        </div>
      </div>
      <div className="detail_menu_bottom">
        <div className="detail_menu_bottom_flex">
          {selectedTab === "코치" && (
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
          {selectedTab === "센터" && (
            <>
              <a className="bottom_tab">기본정보</a>
              <a className="bottom_tab">센터소개</a>
              <a className="bottom_tab">이용정보</a>
              <a className="bottom_tab">운영시간</a>
              <a className="bottom_tab">위치</a>
            </>
          )}
          {selectedTab === "후기" && (
            <>
              <a className="bottom_tab">최근 후기 확인하기</a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
