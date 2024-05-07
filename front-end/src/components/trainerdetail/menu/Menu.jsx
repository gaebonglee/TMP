import React, { useEffect, useState } from "react";
import "./Menu.scss";

const Menu = ({ trainerInfo, handleTrainerInfo, sectionRefs }) => {
  const [activeId, setActiveId] = useState("");
  useEffect(() => {
    setTimeout(() => {
      const currentRefs = sectionRefs.current;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        {
          rootMargin: "0px",
          threshold: 0.7, // 70%의 요소가 보일 때 활성화 상태로 변경
        }
      );

      // 모든 섹션을 관찰 대상으로 추가
      Object.values(currentRefs).forEach((ref) => {
        if (ref.current) {
          observer.observe(ref.current);
        }
      });

      // 컴포넌트 언마운트 시, 관찰 중단
      return () => {
        Object.values(currentRefs).forEach((ref) => {
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        });
      };
    }, 100);
  }, [sectionRefs, trainerInfo]);

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
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
          <div className="top_tab" onClick={() => handleTrainerInfo("review")}>
            후기
          </div>
        </div>
      </div>
      <div className="detail_menu_bottom">
        <div className="detail_menu_bottom_flex">
          {trainerInfo === "coach" && (
            <ul>
              <li
                className={
                  activeId === "header_section1"
                    ? "bottom_tab active"
                    : "bottom_tab"
                }
                onClick={() =>
                  scrollToSection(sectionRefs.current.header_section1)
                }
              >
                소개
              </li>
              <li
                className={
                  activeId === "header_section2"
                    ? "bottom_tab active"
                    : "bottom_tab"
                }
                onClick={() =>
                  scrollToSection(sectionRefs.current.header_section2)
                }
              >
                자격사항
              </li>
              <li
                className={
                  activeId === "header_section3"
                    ? "bottom_tab active"
                    : "bottom_tab"
                }
                onClick={() =>
                  scrollToSection(sectionRefs.current.header_section3)
                }
              >
                스케줄
              </li>
              <li
                className={
                  activeId === "header_section4"
                    ? "bottom_tab active"
                    : "bottom_tab"
                }
                onClick={() =>
                  scrollToSection(sectionRefs.current.header_section4)
                }
              >
                프로그램
              </li>
              <li
                className={
                  activeId === "header_section5"
                    ? "bottom_tab active"
                    : "bottom_tab"
                }
                onClick={() =>
                  scrollToSection(sectionRefs.current.header_section5)
                }
              >
                이용가격
              </li>
              <li
                className={
                  activeId === "header_section6"
                    ? "bottom_tab active"
                    : "bottom_tab"
                }
                onClick={() =>
                  scrollToSection(sectionRefs.current.header_section6)
                }
              >
                위치
              </li>
            </ul>
          )}
          {trainerInfo === "center" && (
            <ul>
              <li
                className={
                  activeId === "header_section7"
                    ? "bottom_tab active"
                    : "bottom_tab"
                }
                onClick={() =>
                  scrollToSection(sectionRefs.current.header_section7)
                }
              >
                기본정보
              </li>
              <li
                className={
                  activeId === "header_section8"
                    ? "bottom_tab active"
                    : "bottom_tab"
                }
                onClick={() =>
                  scrollToSection(sectionRefs.current.header_section8)
                }
              >
                이용정보
              </li>
              <li
                className={
                  activeId === "header_section9"
                    ? "bottom_tab active"
                    : "bottom_tab"
                }
                onClick={() =>
                  scrollToSection(sectionRefs.current.header_section9)
                }
              >
                운영시간
              </li>
              <li
                className={
                  activeId === "header_section10"
                    ? "bottom_tab active"
                    : "bottom_tab"
                }
                onClick={() =>
                  scrollToSection(sectionRefs.current.header_section10)
                }
              >
                센터이용가격
              </li>
              <li
                className={
                  activeId === "header_section6"
                    ? "bottom_tab active"
                    : "bottom_tab"
                }
                onClick={() =>
                  scrollToSection(sectionRefs.current.header_section6)
                }
              >
                위치
              </li>
            </ul>
          )}
          {trainerInfo === "review" && (
            <ul>
              <li className="bottom_tab">최근 후기 확인하기</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
