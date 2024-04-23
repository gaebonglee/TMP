import React, { useState, useRef } from "react";
import "./RightIntro.scss";
import DayTime from "./reservation/DayTime";
import Purpose from "./reservation/Purpose";
import Confirmation from "./reservation/Confirmation";
import { FaStar } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const RightIntro = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const modalBackground = useRef();

  const handleClose = () => {
    setModalOpen(false);
    setCurrentPage(1); // 모달을 닫을 때 페이지도 초기화
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1); // 현재 페이지를 다음 페이지로 설정
  };

  const handlePrev = () => {
    setCurrentPage(currentPage - 1); // 현재 페이지를 이전 페이지로 설정
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

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

          {/* 예약하기 버튼 */}
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
                  <button className="modal_close_btn" onClick={handleClose}>
                    <IoClose />
                  </button>
                  {currentPage === 1 && (
                    <div style={{ flexGrow: 1 }}>
                      <p>
                        <DayTime
                          setDate={setSelectedDate}
                          setTime={setSelectedTime}
                        />
                      </p>
                      <div className="button_wrapper">
                        <button
                          className="reservation_next_btn"
                          onClick={handleNext}
                        >
                          다음
                        </button>
                      </div>
                    </div>
                  )}
                  {currentPage === 2 && (
                    <div style={{ flexGrow: 1 }}>
                      <p>
                        <Purpose setSubCategories={setSelectedSubCategories} />
                      </p>
                      <div className="button_wrapper">
                        <button
                          className="reservation_prev_btn"
                          onClick={handlePrev}
                        >
                          이전
                        </button>
                        <button
                          className="reservation_next_btn"
                          onClick={handleNext}
                        >
                          다음
                        </button>
                      </div>
                    </div>
                  )}
                  {currentPage === 3 && (
                    <div style={{ flexGrow: 1 }}>
                      <p>
                        <Confirmation
                          date={selectedDate}
                          time={selectedTime}
                          subCategories={selectedSubCategories}
                        />
                      </p>
                      <div className="button_wrapper">
                        <button
                          className="reservation_prev_btn"
                          onClick={handlePrev}
                        >
                          이전
                        </button>
                        <button
                          className="reservation_next_btn"
                          onClick={handleNext}
                        >
                          결제 및 예약내역 확인
                        </button>
                      </div>
                    </div>
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
