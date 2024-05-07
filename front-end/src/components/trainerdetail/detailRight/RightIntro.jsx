import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import "./RightIntro.scss";
import { FaS, FaStar } from "react-icons/fa6";
// import LoginModal from "components/loginModal/LoginModal";
// import ReservationPage from "./reservation/ReservationPage";

const RightIntro = ({ data,trainerId }) => {

  const navigate = useNavigate();

  const handleReservation = () => {
    navigate(`/reservationPage/${trainerId}`); // 예약 페이지로 이동
  };

  const reviewSum = data.infoReview.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.point;
  }, 0);
  const reviewAvg = Math.floor(reviewSum / data.infoReview.length);
  const reviewArr = [0, 1, 2, 3, 4];

  const rightIntroNode = document.querySelector(".RightIntro");

  return (
    <div className="intro_right_container">
      <img
        className="trainer_right_img"
        src="/image/사진1.jpg"
        alt="trainer_right_photo"
      />
      <div className="intro_right_wrap">
        <div className="top_wrap">
          <div className="trainer_name_star">
            <h2 className="trainer_name">{data.info1.user_name}선생님</h2>
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
          <div className="trainer_intro_oneline">
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
          <h3>PT 1회 특가 이용하기</h3>
          <div className="trainer_class_price_info">
            <a className="class_discountrate">50%</a>
            <a className="discount_price">35,000</a>
            <a className="class_price">70,000</a>
          </div>

          {/* 예약하기 버튼 */}
          <div className={"reservation_btn_wrapper"}>
            {/* {modalOpen &&
              ReactDOM.createPortal(
                <ReservationModal handleModalOpen={handleModalOpen} />,
                rightIntroNode
              )}
             {modalOpen && 
              ReactDOM.createPortal(
                <LoginModal handleModalOpen={handleModalOpen} />,
                rightIntroNode
              )} 

            <button
              className={"reservation_btn"}
              onClick={() => setModalOpen(true)}
            >
              예약하기
            </button>*/}
            <button className={"reservation_btn"} onClick={handleReservation}>
              예약하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightIntro;
