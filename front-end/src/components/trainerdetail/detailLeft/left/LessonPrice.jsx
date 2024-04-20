import React from "react";
import "./LessonPrice.scss";
const LessonPrice = () => {
  return (
    <div className="trainer_lesson_price" id="intro_page_contents_wrap">
      <h1>레슨 이용 가격</h1>
      <div id="wrap_container">
        <div className="lesson_title">
          <p>1:1 PT</p>
        </div>
        <div className="lesson_list">
          <ul>
            <li className="lesson_li">
              <div className="priceCount">10회</div>
              <div className="price"></div>
              <p className="pricePer">회당 50,000원</p>
              <p className="priceTotal">500,000원</p>
            </li>
            <li className="lesson_li">
              <div className="priceCount">20회</div>
              <div className="price"></div>
              <p className="pricePer">회당 40,000원</p>
              <p className="priceTotal">800,000원</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="lesson_text">
        <p>레슨 1회에 50분 진행됩니다.</p>
        <p>센터 회원권을 별도로 결제할 필요 없습니다.</p>
      </div>
    </div>
  );
};

export default LessonPrice;
