import React, { useEffect, useState } from "react";
import { TbMapPin } from "react-icons/tb";
import { BsFillStarFill } from "react-icons/bs";
import "./TrainerListItem.scss";

const TrainerListItem = (props) => {
  const { trainer } = props;
  const [reviewCount, setReviewCount] = useState(0);
  const [price, setPrice] = useState([]);
  const [user, setUser] = useState();

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
        if (data && data.length > 0) {
          const totalPrice = data[0].total_price || 0;
          const count = data[0].count || 1;
          setPrice([totalPrice, count]);
        } else {
          setPrice([0, 1]);
        }
      });

    fetchReviewCount();
  }, [trainer.user_id]);

  fetch("http://localhost:5000/center/user", {
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
      setUser(data[0]);
    });

  const calculatePrice = () => {
    const totalPrice = price[0];
    const count = price[1];
    if (totalPrice === 0 || count === 0) {
      return 0;
    }
    return Math.round(totalPrice / count / 100) * 100;
  };

  return (
    <div className="TrainerListItem">
      <div className="morae">{trainer.user_name} 선생님</div>
      <div className="moraeTitle">
        <span className="moraeTitleText">
          {trainer.center_name}
          <br />
          {trainer.short_intro}
          <br />
        </span>
        <span className="moraeTitleTextPT">{price[1]}회 기준 회당</span>
        <span className="moraePrice">
          {calculatePrice()}원
          <br />
        </span>
      </div>
      <div className="moraeLocation">
        <TbMapPin className="mappin" size={20} />{" "}
        {trainer.center_address ? trainer.center_address : "-"}
        <br />{" "}
        {trainer.center_street_address ? trainer.center_street_address : ""}
      </div>
      <div className="moraeReview">
        <BsFillStarFill size={18} color="rgb(255,187,51)" /> 후기{" "}
        {reviewCount.review_total_count}개
        <div>{Number(reviewCount.review_avg_star).toFixed(1)}</div>
      </div>
      {user && user.user_img === null ? (
        <img
          className="trainerImg"
          src="/image/tmp_mainlogo.png"
          alt="트레이너 이미지"
        />
      ) : (
        <img
          className="trainerImg"
          src={`${process.env.REACT_APP_FILE_SERVER_URL}/user/${trainer.user_id}/${user?.user_img}`}
          alt="유저 이미지"
        />
      )}
    </div>
  );
};

export default TrainerListItem;
