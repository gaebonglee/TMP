import React from "react";
import LittleUndongMap from "../../../trainermap/LittleUndongMap";
import "./CenterPlace.scss";

const CenterPlace = () => {
  return (
    <div className="trainer_location_center" id="intro_page_contents_wrap">
      <h1>위치</h1>
      <div className="contentWrap">
        <div>
          <div className="flexBoxStart">
            <strong style={{ marginRight: "8px" }}>
              마진휘트니스 강남역점
            </strong>
            <div className="contact">상세 정보</div>
          </div>
          <div className="flexBoxStart">
            <div className="addressOnLocation">
              <span style={{ marginRight: "8px" }}>
                서울 강남구 강남대로 390 미진프라자 지하 3층 미진 휘트니스 센타
              </span>
              <span className="contact">주소 복사</span>
            </div>
          </div>
          <div className="addressOnLocation">
            강남역 1번출구 10초거리 1층 스타벅스 미진프라자 B3
          </div>
        </div>
      </div>
      <div id="wrap_container">
        <LittleUndongMap />
      </div>
    </div>
  );
};

export default CenterPlace;
