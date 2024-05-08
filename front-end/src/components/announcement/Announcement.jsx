import React from "react";
import "./Announcement.scss";

const Announcement = () => {
  window.scrollTo({ top: 0 });
  return (
    <div className="privacy__policy__container">
      <div className="privacy__policy__title">공지사항</div>
      <hr />
      <ul className="privacy__policy__ul">
        <li className="privacy__policy__link">
          <p className="privacy__policy__link__p1">2023-11-17</p>
          <p className="privacy__policy__link__p2">
            개인정보처리방침 변경 안내
          </p>
        </li>
        <li className="privacy__policy__link">
          <p className="privacy__policy__link__p1">2023-01-20</p>
          <p className="privacy__policy__link__p2">
            서비스 이용 약관 변경 안내
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Announcement;
