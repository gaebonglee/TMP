import React from "react";
import LittleUndongMap from "../../../trainermap/LittleUndongMap";
import "./CenterPlace.scss";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const CenterPlace = ({ data, sectionRefs }) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    iconColor: "white",
    customClass: {
      popup: "colored-toast",
    },
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  const copyAddress = (address) => {
    navigator.clipboard.writeText(address);
    Toast.fire({
      icon: "success",
      title: "클립보드에 주소가 복사되었습니다.",
    });
  };
  return (
    <div>
      <div className="trainer_location_center" id="intro_page_contents_wrap">
        <h1 id="header_section6" ref={sectionRefs.current.header_section6}>
          위치
        </h1>
        <div className="contentWrap">
          <div>
            <div className="flexBoxStart">
              <strong style={{ marginRight: "8px" }}>{data.center_name}</strong>
              {/* {data.center_name && <div className="contact">상세 정보</div>} */}
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
