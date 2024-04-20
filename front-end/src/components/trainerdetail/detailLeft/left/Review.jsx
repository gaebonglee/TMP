import React, { useEffect, useState } from "react";
import "./Review.scss";
import { LuPencilLine } from "react-icons/lu";
import { FaStar } from "react-icons/fa6";

const Review = () => {
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/review")
      .then((res) => res.json())
      .then((data) => setReviewList(data[0]));
  }, []);
  return (
    <div className="review" id="intro_page_contents_wrap">
      <h1>후기</h1>
      <div id="wrap_container">
        <div className="review_wrap">
          <div className="star_review_wrap">
            <span>{reviewList.point}</span>
            <div className="review_summary">
              <div className="star_wrap">
                {[...Array(reviewList.point)].map((n, index) => (
                  <FaStar key={index} />
                ))}
              </div>
              <div className="review_num">
                <span>{reviewList.total_review}</span>
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
                      <span className="review_userName">
                        {reviewList.user_name}
                      </span>
                      <span className="reviewDate">
                        {reviewList.register_date}
                      </span>
                    </div>
                    <div className="reviewStar">
                      <div className="star_wrap">
                        {[...Array(reviewList.point)].map((n, index) => (
                          <FaStar key={index} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="review_context">
                    <div className="review_context_photo">
                      {reviewList.review_img}
                    </div>
                    <div className="review_context_text">
                      <p>{reviewList.review}</p>
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
