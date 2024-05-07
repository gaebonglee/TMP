import React from "react";
import LittleUndongMap from "../../../trainermap/LittleUndongMap";
import "./CenterPlace.scss";

const CenterPlace = ({ data, sectionRefs }) => {
  const copyAddress = (address) => {
    navigator.clipboard.writeText(address);
    alert("클립보드에 주소가 복사되었습니다.");
  };
  return (
    <div id="header_section6" ref={sectionRefs.current.header_section6}>
      <div className="trainer_location_center" id="intro_page_contents_wrap">
        <h1>위치</h1>
        <div className="contentWrap">
          <div>
            <div className="flexBoxStart">
              <strong style={{ marginRight: "8px" }}>{data.center_name}</strong>
              {data.center_name && <div className="contact">상세 정보</div>}
            </div>
            <div className="flexBoxStart">
              <div className="addressOnLocation">
                <span style={{ marginRight: "8px" }}>
                  {data.center_address}
                </span>
                {data.center_name && (
                  <span
                    onClick={() => {
                      copyAddress(data.center_address);
                    }}
                    className="contact"
                  >
                    주소 복사
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div id="wrap_container">
          {data.latitude && (
            <LittleUndongMap lat={data.latitude} longi={data.longitude} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CenterPlace;
