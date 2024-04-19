import React from "react";
import "./Review.scss";
import { LuPencilLine } from "react-icons/lu";
import { FaStar } from "react-icons/fa6";

const Review = () => {
  return (
    <div className="review" id="intro_page_contents_wrap">
      <h1>후기</h1>
      <div id="wrap_container">
        <div className="review_wrap">
          <div className="star_review_wrap">
            <span>5.0</span>
            <div className="review_summary">
              <div className="star_wrap">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <div className="review_num">
                <span>N</span>
                <span>개의 후기</span>
              </div>
            </div>
          </div>
          <div className="review_btn">
            <button>
              <LuPencilLine />
              <a class="create_review">리뷰 남기기</a>
            </button>
          </div>
        </div>
      </div>
      <div id="wrap_container">
        <div className="review_contents">
          <div className="review_title">
            <p>생생한 후기를 확인하세요!</p>
          </div>
          <div className="review_list">
            <ul>
              <li className="review_li">
                <div>
                  <div className="review_header">
                    <div>
                      <span className="review_userName"></span>
                      <span className="reviewDate">2024.04.15</span>
                    </div>
                    <div className="reviewStar">
                      <div className="star_wrap">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </div>
                    </div>
                  </div>
                  <div className="review_context">
                    <div className="review_context_photo"></div>
                    <div className="review_context_text">
                      <p>
                        테스트 내용입니다.테스트 내용입니다.테스트
                        내용입니다.테스트 내용입니다.테스트 내용입니다.테스트
                        내용입니다.테스트 내용입니다.테스트 내용입니다.테스트
                        내용입니다.테스트 내용입니다.테스트 내용입니다.테스트
                        내용입니다.테스트 내용입니다.테스트 내용입니다.테스트
                        내용입니다.테스트 내용입니다.테스트 내용입니다.테스트
                        내용입니다.테스트 내용입니다. 테스트 내용입니다.테스트
                        내용입니다.테스트 내용입니다.테스트 내용입니다.테스트
                        내용입니다.테스트 내용입니다.테스트 내용입니다.테스트
                        내용입니다.테스트 내용입니다.테스트 내용입니다.테스트
                        내용입니다.테스트 내용입니다.테스트 내용입니다.테스트
                        내용입니다.테스트 내용입니다.테스트 내용입니다.테스트
                        내용입니다.테스트 내용입니다.테스트 내용입니다. 테스트
                        내용입니다.테스트 내용입니다.테스트 내용입니다.테스트
                        내용입니다.테스트 내용입니다.테스트 내용입니다.테스트
                        내용입니다.테스트 내용입니다.테스트 내용입니다.테스트
                        내용입니다.테스트 내용입니다.테스트 내용입니다.테스트
                        내용입니다.테스트 내용입니다.테스트 내용입니다.테스트
                        내용입니다.테스트 내용입니다.테스트 내용입니다.테스트
                        내용입니다.
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div className="reviewAll_btn">
              <button>
                <span>전체 후기 보기</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
