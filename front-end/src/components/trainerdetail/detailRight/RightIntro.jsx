import React, { useState, useRef } from "react";
import "./RightIntro.scss";
import Date from "./reservation/DayTime"
import Purpose from "./reservation/Purpose";
import { FaStar } from "react-icons/fa6";

const RightIntro = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const modalBackground = useRef();

  const handleClose = () => {
    setModalOpen(false);
    setCurrentPage(1); // 모달을 닫을 때 페이지도 초기화
  };

  const handleNext = () => {
    setCurrentPage(2); // 현재 페이지를 2로 설정
  };

  return (
    <div className="intro_right_container">
      <img
        className="trainer_right_photo"
        src="/image/사진1.jpg"
        alt="trainer_right_photo"
      />
      <div className="intro_right_wrap">
        <div className="top_wrap">
          <div className="trainer_name_star">
            <h2 className="trainer_name">@@@선생님</h2>
            <div className="trainer_star">
              <div className="star_wrap">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <div className="review_average_score">5.0</div>
              <div className="review_num">(20)</div>
            </div>
          </div>
          <div className="center_name">서울PT샵 강남점</div>
          <div className="trainer_intro_oneline">
            <p>
              테스트 내용입니다.테스트 내용입니다.테스트 내용입니다.테스트
              내용입니다.테스트 내용입니다.테스트 내용입니다.테스트 내용입니다.
            </p>
          </div>
        </div>
        <div className="middle_wrap">
          <div className="certificate">
            <span className="left">자격검증 : </span>
            <span className="right">N개</span>
          </div>
          <div className="specialized_field">
            <span className="left">전문분야 : </span>
            <span className="right">다이어트, 식단관리, 벌크업</span>
          </div>
        </div>
        <div className="bottom_wrap">
          <h3>PT 1회 특가 이용하기</h3>
          <div className="trainer_class_price_info">
            <a className="class_discountrate">50%</a>
            <a className="discount_price">35,000</a>
            <a className="class_price">70,000</a>
          </div>
          <div className={"reservation_btn_wrapper"}>
            {modalOpen && (
              <div
                className="reservation_container"
                ref={modalBackground}
                onClick={(e) => {
                  if (e.target === modalBackground.current) {
                    handleClose();
                  }
                }}
              >
                <div
                  className="reservation_content"
                  onClick={(e) => e.stopPropagation()}
                >
                  {currentPage === 1 && (
                    <>
                      <p><Date/></p>
                      <button
                        className="reservation_close_btn"
                        onClick={handleClose}
                      >
                        닫기
                      </button>
                      <button
                        className="reservation_next_btn"
                        onClick={handleNext}
                      >
                        다음
                      </button>
                    </>
                  )}
                  {currentPage === 2 && (
                    <>
                      <p><Purpose/></p>
                      <button
                        className="reservation_close_btn"
                        onClick={handleClose}
                      >
                        닫기
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
            <button
              className={"reservation_btn"}
              onClick={() => setModalOpen(true)}
            >
              예약하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightIntro;
