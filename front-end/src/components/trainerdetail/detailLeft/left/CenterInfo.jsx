import React from "react";
import "./CenterInfo.scss";
import { GiClothes } from "react-icons/gi";
import { PiLockers } from "react-icons/pi";

const CenterInfo = ({ data, centerPrice, sectionRefs }) => {
  return (
    <div>
      <h1 className="centerInfo_h1_title">센터 소개</h1>
      <div className="wrap_container" style={{ whiteSpace: "pre-wrap" }}>
        {data.center_intro}
      </div>
      <div>
        <h1
          id="header_section8"
          ref={sectionRefs.current.header_section8}
          className="centerInfo_h1_title"
        >
          이용 정보
        </h1>
        <div className="wrap_container">
          <div className="center_info_clothesLocker">
            <span className="center_info_clothesLocker_icon">
              <GiClothes />
            </span>
            <p>운동복 무료</p>
          </div>
          <div className="center_info_clothesLocker">
            <span className="center_info_clothesLocker_icon">
              <PiLockers />
            </span>
            <p>개인 사물함 무료</p>
          </div>
        </div>
      </div>
      <div>
        <h1
          className="centerInfo_h1_title"
          id="header_section9"
          ref={sectionRefs.current.header_section9}
        >
          운영 시간
        </h1>
        <div className="wrap_container__2">
          {!!data.center_weekday && (
            <div className="trainer_centerInfo_time">
              <p className="trainer_centerInfo_time_title">평일</p>
              <p className="trainer_centerInfo_time_info">
                {data.center_weekday_start} ~ {data.center_weekday_end}
              </p>
            </div>
          )}
          {!!data.center_saturday && (
            <div className="trainer_centerInfo_time">
              <p className="trainer_centerInfo_time_title">토요일</p>
              <p className="trainer_centerInfo_time_info">
                {data.center_saturday_start} ~ {data.center_saturday_end}
              </p>
            </div>
          )}
          {!!data.center_sunday && (
            <div className="trainer_centerInfo_time">
              <p className="trainer_centerInfo_time_title">일요일</p>
              <p className="trainer_centerInfo_time_info">
                {data.center_sunday_start} ~ {data.center_sunday_end}
              </p>
            </div>
          )}
          {!!data.dayoff && (
            <div className="trainer_centerInfo_time">
              <p className="trainer_centerInfo_time_title">휴무일</p>
              <p className="trainer_centerInfo_time_info">{data.dayoff}</p>
            </div>
          )}
        </div>
        {!!data.note && <p className="trainer__center__note">* {data.note}</p>}
      </div>
      {centerPrice.length !== 0 && (
        <div>
          <h1
            className="centerInfo_h1_title centerPriceSection"
            id="header_section10"
            ref={sectionRefs.current.header_section10}
          >
            센터 이용 가격
          </h1>
          <div className="wrap_container">
            <h3>회원권 비용</h3>
            {centerPrice.map((value, index) => {
              return (
                <div key={index} className="trainer_center_prices">
                  <hr />
                  <div className="trainer_center_prices_info">
                    <p>{value.month}개월</p>
                    <p style={{ textAlign: "right" }}>
                      월{" "}
                      <span className="trainer_center_prices_info_month">
                        {value.total_price !== null
                          ? (
                              Math.round(
                                value.total_price / value.month / 1000
                              ) * 1000
                            ).toLocaleString("ko-KR")
                          : ""}
                      </span>
                      원
                      <br />
                      <span className="trainer_center_prices_info_total">
                        {value.total_price &&
                          value.total_price.toLocaleString("ko-KR")}
                        원
                      </span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CenterInfo;
