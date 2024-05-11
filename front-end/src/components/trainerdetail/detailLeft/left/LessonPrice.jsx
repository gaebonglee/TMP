import React from "react";
import "./LessonPrice.scss";
const LessonPrice = ({ data, sectionRefs }) => {
  return (
    <div>
      <div className="trainer_lesson_price" id="intro_page_contents_wrap">
        <h1 id="header_section5" ref={sectionRefs.current.header_section5}>
          레슨 이용 가격
        </h1>
        <div id="wrap_container">
          <div className="trainerdetail__lesson_title">
            <p>1:1 PT</p>
          </div>
          <div className="trainerdetail__lesson_list">
            <ul>
              {data.map((value, index) => {
                return (
                  <li className="trainerdetail__lesson_li" key={index}>
                    <div className="trainerdetail__priceCount">
                      {value.count}회
                    </div>
                    <p className="trainerdetail__pricePer">
                      회당{" "}
                      {(
                        Math.round(value.total_price / value.count / 1000) *
                        1000
                      ).toLocaleString("ko-KR")}
                      원
                    </p>
                    <p className="trainerdetail__priceTotal">
                      {value.total_price.toLocaleString("ko-KR")}원
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="trainerdetail__lesson_text">
          <p>레슨 1회에 50분 진행됩니다.</p>
          <p>센터 회원권을 별도로 결제할 필요 없습니다.</p>
        </div>
      </div>
    </div>
  );
};

export default LessonPrice;
