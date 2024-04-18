import React from "react";
import "./TrainerCard.scss";

const TrainerCard = () => {
  return (
    <section className="ai_container">
      <div>
        <h1 className="ai_container_title">TMP가 @@@기준으로 추천해요</h1>
        <ul class="ai_contents_wrap">
          <li>
            <div>
              <div className="ai_contents">
                <a href="#" className="ai_contents_a">
                  <div className="ai_contents_img">
                    <img src="/image/사진1.jpg" alt="ai_photo" />
                  </div>
                  <div className="ai_contents_txt">
                    <div className="trainer_name_review">
                      <h2 className="trainer_name">@@@선생님</h2>
                      <p class="review_star">
                        <i class="ri-star-fill"></i>
                        (N)
                      </p>
                    </div>
                    <p className="trainer_location">서울PT샵 강남점</p>
                    <p className="contents_hashtag">#다이어트 #바디프로필</p>
                  </div>
                </a>
              </div>
            </div>
          </li>
          <li>
            <div>
              <div className="ai_contents">
                <a href="#" className="ai_contents_a">
                  <div className="ai_contents_img">
                    <img src="/image/사진1.jpg" alt="ai_photo" />
                  </div>
                  <div className="ai_contents_txt">
                    <div className="trainer_name_review">
                      <h2 className="trainer_name">@@@선생님</h2>
                      <p class="review_star">
                        <i class="ri-star-fill"></i>
                        (N)
                      </p>
                    </div>
                    <p className="trainer_location">서울PT샵 강남점</p>
                    <p className="contents_hashtag">#다이어트 #바디프로필</p>
                  </div>
                </a>
              </div>
            </div>
          </li>
          <li>
            <div>
              <div className="ai_contents">
                <a href="#" className="ai_contents_a">
                  <div className="ai_contents_img">
                    <img src="/image/사진1.jpg" alt="ai_photo" />
                  </div>
                  <div className="ai_contents_txt">
                    <div className="trainer_name_review">
                      <h2 className="trainer_name">@@@선생님</h2>
                      <p class="review_star">
                        <i class="ri-star-fill"></i>
                        (N)
                      </p>
                    </div>
                    <p className="trainer_location">서울PT샵 강남점</p>
                    <p className="contents_hashtag">#다이어트 #바디프로필</p>
                  </div>
                </a>
              </div>
            </div>
          </li>
          <li>
            <div>
              <div className="ai_contents">
                <a href="#" className="ai_contents_a">
                  <div className="ai_contents_img">
                    <img src="/image/사진1.jpg" alt="ai_photo" />
                  </div>
                  <div className="ai_contents_txt">
                    <div className="trainer_name_review">
                      <h2 className="trainer_name">@@@선생님</h2>
                      <p class="review_star">
                        <i class="ri-star-fill"></i>
                        (N)
                      </p>
                    </div>
                    <p className="trainer_location">서울PT샵 강남점</p>
                    <p className="contents_hashtag">#다이어트 #바디프로필</p>
                  </div>
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default TrainerCard;
