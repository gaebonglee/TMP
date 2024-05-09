import React from "react";
import "./TrainerCard.scss";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

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

  if (isPending) return <div></div>;

  if (error) return "An error has occurred: " + error.message;
  return (
    <section className="ai_container">
      <div>
        {/* <h1 className="ai_container_title">TMP가 @@@기준으로 추천해요</h1> */}
        <ul className="ai_contents_wrap">
          {data.info.map((v, i) => {
            return (
              <li key={i}>
                <div>
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
                              : "/image/tmp_mainlogo.png"
                          }
                          alt="ai_photo"
                        />
                      </div>
                      <div className="ai_contents_txt">
                        <div className="trainer_name_review">
                          <h2 className="trainer_name">{v.user_name}선생님</h2>
                          <p className="review_star">
                            <i className="ri-star-fill"></i>
                            <span className="review_star_color">
                              <FaStar />{" "}
                            </span>
                            {v.point ? Number(v.point).toFixed(1) : "0.0"}
                          </p>
                        </div>
                        <p className="trainer_location">{v.center_name}</p>
                        <p className="contents_hashtag">{v.trainning_type}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default TrainerCard;
