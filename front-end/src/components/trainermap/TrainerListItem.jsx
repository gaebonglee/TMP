import React, { useEffect, useState } from "react";
import { TbMapPin } from "react-icons/tb";
import { BsFillStarFill } from "react-icons/bs";
import "./TrainerListItem.scss";

const TrainerListItem = (props) => {
  const { trainer } = props;
  const [reviewCount, setReviewCount] = useState(0);
  const [price, setPrice] = useState([]);

  useEffect(() => {
    const fetchReviewCount = async () => {
      try {
        const res = await fetch("http://localhost:5000/center/countStar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: trainer.user_id }),
        });
        const data = await res.json();
        setReviewCount(data);
      } catch (error) {
        console.error("Error fetching review count:", error);
      }
    };

    fetch("http://localhost:5000/center/price", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: trainer.user_id }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP 에러 ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setPrice([data[0].total_price, data[0].count]);
      })
      .catch((error) => {
        console.error("에러 발생", error);
      });

    fetchReviewCount();
  }, [trainer.user_id]);

  let introImgs = [];

  if (trainer.intro_img) {
    if (trainer.intro_img.includes(",")) {
      introImgs = trainer.intro_img.split(",");
    } else {
      introImgs = [trainer.intro_img];
    }
  } else {
    introImgs = [];
  }
  const priceMath = (totalPrice, count) => {
    if (totalPrice && count) {
      return Math.round(totalPrice / count / 100) * 100;
    }
    return 0;
  };
  return (
    <div className="TrainerListItem">
      <div className="morae">{trainer.user_name} 선생님</div>
      <div className="moraeTitle">
        <span className="moraeTitleText">
          [서울 피티 대표]
          <br />
          ~~스포츠모델 그랑프리
          <br />
          <br />
        </span>
        <span className="moraeTitleTextPT">{price[1]}회 기준 회당</span>
        <span className="moraePrice">
          {priceMath(price[0], price[1])}원
          <br />
        </span>
      </div>
      <div className="moraeLocation">
        <TbMapPin size={17} /> {trainer.center_name} - {trainer.center_address}
      </div>
      <div className="moraeReview">
        <BsFillStarFill size={18} color="rgb(255,187,51)" /> 후기{" "}
        {reviewCount.review_total_count}개
      </div>
      {introImgs.length === 0 ? (
        <img
          className="trainerImg"
          src="/image/tmp_mainlogo.png"
          alt="기본 이미지"
        />
      ) : (
        introImgs.map((img, idx) => (
          <img
            key={idx}
            className="trainerImg"
            src={`${process.env.REACT_APP_FILE_SERVER_URL}/trainer/${trainer.user_id}/${img}`}
            alt="트레이너 이미지"
          />
        ))
      )}
    </div>
  );
};

export default TrainerListItem;
