import React from "react";
import "./CenterListItem.css";

const CenterListItem = () => {
  return (
    <div className="itemWrap">
      <div className="imageWrap">
        <div className="centerTypePosition">
          <div className="centerTypeTag">헬스</div>
          <div className="centerTypeTag">필라테스</div>
        </div>
        <div className="center1"></div>
        <div className="center2"></div>
        <div className="center3"></div>
      </div>

      <div className="infoWrap">
        <div className="infoTitleWrap">
          <div className="centerName">센터명</div>
          <span
            style={{
              fontSize: "14px",
              color: "rgb(152,165,179)",
            }}
          >
            <img
              src="img/star-fill.svg"
              alt=""
              style={{
                width: "18px",
              }}
            />
            후기 ?개{" "}
          </span>
        </div>
        <div>
          <div className="priceInfoWrap">
            <div className="RED">
              <div className="red">1회 체험</div>
            </div>
            <div className="percent">
              "할인률"
              <span className="percentMark">%</span>
            </div>
            <div className="price">
              <strong>20000</strong>
              <span className="won">원~</span>
            </div>
          </div>
          <div>
            <div className="perPriceWrap">
              "33""회 기준 회당"
              <strong>
                "48000"
                <span className="won">원</span>
              </strong>
              <div
                style={{
                  display: "inline",
                  fontSize: "14px",
                  color: "rgb(108,118,128)",
                }}
              >
                <div className="orange">+추가 혜택</div>
              </div>
            </div>
          </div>
          <div className="locationInfoWrap">
            <img
              src="img/map-pin-line.svg"
              alt=""
              style={{
                width: "18px",
              }}
            />
            선생님 ?명 - 신논현역 도보 ?분
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenterListItem;
