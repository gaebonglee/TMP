import React from "react";
import "./LessonPrice.scss";
const LessonPrice = ({ data, sectionRefs }) => {
  return (
    <div id="header_section5" ref={sectionRefs.current.header_section5}>
      <div className="trainer_lesson_price" id="intro_page_contents_wrap">
        <h1>레슨 이용 가격</h1>
        <div id="wrap_container">
          <div className="lesson_title">
            <p>1:1 PT</p>
          </div>
          <div className="lesson_list">
            <ul>
              {data.map((value, index) => {
                return (
                  <li className="lesson_li" key={index}>
                    <div className="priceCount">{value.count}회</div>
                    <p className="pricePer">
                      회당{" "}
                      {(
                        Math.round(value.total_price / value.count / 1000) *
                        1000
                      ).toLocaleString("ko-KR")}
                      원
                    </p>
                    <p className="priceTotal">
                      {value.total_price.toLocaleString("ko-KR")}원
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="lesson_text">
          <p>레슨 1회에 50분 진행됩니다.</p>
          <p>센터 회원권을 별도로 결제할 필요 없습니다.</p>
        </div>
      </div>
    </div>
  );
};

export default LessonPrice;
