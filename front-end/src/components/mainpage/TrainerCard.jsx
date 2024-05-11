import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "./TrainerCard.scss";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";

const TrainerCard = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["randomTrainerInfo"],
    queryFn: () =>
      fetch("http://localhost:5000/mainpage/selectRandomTrainer", {
        method: "GET",
        credentials: "include",
      }).then((res) => res.json()),
    staleTime: 1000 * 60,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState("right");
  const numCardsToShow = 4;

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>An error has occurred: {error.message}</div>;

  const next = () => {
    if (currentIndex < data.info.length - numCardsToShow) {
      setAnimationDirection("right");
      setCurrentIndex(currentIndex + numCardsToShow);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setAnimationDirection("left");
      setCurrentIndex(currentIndex - numCardsToShow);
    }
  };

  const trainersToShow = data.info.slice(
    currentIndex,
    currentIndex + numCardsToShow
  );

  return (
    <div className="ai_wrapper">
      <IoIosArrowBack
        onClick={prev}
        className={`arrow left ${currentIndex <= 0 ? "disabled" : ""}`}
      />
      <div className="ai_container">
        <div>
          <ul className="ai_contents_wrap">
            {trainersToShow.map((v, i) => (
              <li key={i} className={`animate-${animationDirection}`}>
                <div className="ai_contents">
                  <Link
                    to={`/trainerDetail/${v.user_id}`}
                    className="ai_contents_a"
                  >
                    <div className="ai_contents_img">
                      <img
                        className="ai_contents_img_content"
                        src={
                          v.user_img
                            ? `${process.env.REACT_APP_FILE_SERVER_URL}/user/${v.user_id}/${v.user_img}`
                            : "/image/tmp_mainlogo2.png"
                        }
                        alt="ai_photo"
                      />
                    </div>
                    <div className="ai_contents_txt">
                      <div className="trainer_name_review">
                        <h2 className="trainer_name">{v.user_name} 트레이너</h2>
                        <p className="review_star">
                          <i className="ri-star-fill"></i>
                          <span className="review_star_color">
                            <FaStar />
                          </span>
                          {v.point ? Number(v.point).toFixed(1) : "0.0"}
                        </p>
                      </div>
                      <p className="trainer_location">{v.center_name}</p>
                      <p className="contents_hashtag">{v.trainning_type}</p>
                    </div>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <IoIosArrowForward
        onClick={next}
        className={`arrow right ${
          currentIndex + numCardsToShow >= data.info.length ? "disabled" : ""
        }`}
      />
    </div>
  );
};

export default TrainerCard;
