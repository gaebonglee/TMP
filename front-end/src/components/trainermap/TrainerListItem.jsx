import React, { useEffect, useState } from "react";
import { TbMapPin } from "react-icons/tb";
import { BsFillStarFill } from "react-icons/bs";
import "./TrainerListItem.scss";

const TrainerListItem = (props) => {
  const { trainer } = props;

  return (
    <div className="TrainerListItem">
      <div className="morae">{trainer.user_name} 선생님</div>
      <div className="moraeTitle">
        <span className="moraeTitleText">
          [서울 피티 대표] <br />
          ~~스포츠모델 그랑프리
          <br />
          <br />
        </span>
        <span className="moraeTitleTextPT">{trainer.count}회 기준 회당 </span>
        <span className="moraePrice">
          {trainer.total_price / trainer.count}원
          <br />
        </span>
      </div>
      <div className="moraeLocation">
        <TbMapPin size={17} />
        {trainer.center_name} - {trainer.center_address}
      </div>
      <div className="moraeReview">
        <BsFillStarFill size={18} color="rgb(255,187,51)" />
        후기 NN개
      </div>
      {/* <img className="trainerImg" src="img/morae.jpg" alt="1" /> */}
      {trainer.intro_img}
    </div>
  );
};

export default TrainerListItem;
