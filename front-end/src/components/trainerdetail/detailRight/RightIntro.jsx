import React from "react";
import { useNavigate } from "react-router-dom";
import "./RightIntro.scss";
import { FaStar } from "react-icons/fa6";

const RightIntro = ({ data, trainerId, loginInfo }) => {
  const navigate = useNavigate();
  // 예약 페이지로 이동
  const handleReservation = () => {
    if (loginInfo && loginInfo.role) {
      if (loginInfo.role === "trainer") {
        // 로그인을 했지만 trainer인 경우
        navigate(`/login/roleError/reservation_trainer`);
      } else if (loginInfo.role === "user") {
        // 로그인을 했고 user인 경우
        navigate(`/reservationPage/${trainerId}`);
        window.scrollTo({top: 0});
      }
    } else {
      // 로그인을 안한 경우
      navigate(`/login/roleError/reservation_need_login`);
    }
  };

  const reviewSum = data.infoReview.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.point;
  }, 0);
  const reviewAvg = reviewSum / data.infoReview.length;
  const reviewArr = [0, 1, 2, 3, 4];

  // const rightIntroNode = document.querySelector(".RightIntro");

  return (
    <div className="intro_right_container">
      <img
        className="trainer_right_img"
        src={
          data.info1.user_img
            ? `${process.env.REACT_APP_FILE_SERVER_URL}/user/${data.info1.user_id}/${data.info1.user_img}`
            : "/image/tmp_mainlogo2.png"
        }
        alt="trainer_right_photo"
      />
      <div className="intro_right_wrap">
        <div className="top_wrap">
          <div className="trainer_name_star">
            <h2 className="trainer_name">{data.info1.user_name} 트레이너</h2>
            <div className="trainer_star">
              <div className="star_wrap">
                {reviewArr.map((_v, i) => {
                  return i < reviewAvg ? (
                    <FaStar key={i} />
                  ) : (
                    <FaStar key={i} style={{ color: "black" }} />
                  );
                })}
              </div>
              <div className="review_average_score">
                {!!reviewAvg ? reviewAvg.toFixed(1) : 0.0}
              </div>
              <div className="review_num">({data.infoReview.length})</div>
            </div>
          </div>
          <div className="center_name">{data.info1.center_name}</div>
          <div className="trainer_short_intro">
            <p>{data.info1.short_intro}</p>
          </div>
        </div>
        <div className="middle_wrap">
          <div className="certificate">
            <span className="left">자격검증 : </span>
            <span className="right">{data.info2.length}개</span>
          </div>
          <div className="specialized_field">
            <span className="left">전문분야 : </span>
            <span className="right">{data.info1.trainning_type}</span>
          </div>
        </div>
        <div className="bottom_wrap">
          <div className={"reservation_btn_wrapper"}>
            <button className={"reservation_btn"} onClick={handleReservation}>
              상담 예약하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightIntro;
