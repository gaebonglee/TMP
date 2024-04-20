import React from "react";
import "./Qualifications.scss";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { HiOutlineTrophy } from "react-icons/hi2";
import { PiCertificate } from "react-icons/pi";

const Qualifications = () => {
  return (
    <div id="intro_page_contents_wrap" className="qualifications">
      <div className="title_wrap">
        <h1>검증된 자격사항</h1>
        <div className="trainer_check_btn">
          <div className="check_btn_wrap">
            <IoCheckmarkDoneSharp />
            <a>증명 확인하기</a>
          </div>
        </div>
      </div>
      <div id="wrap_container">
        <div className="carrer_wrap">
          <div className="carrer_wrap_img">
            <HiOutlineTrophy />
          </div>
          <div className="carrer_wrap_text">
            <p>test 수상경력 내용입니다.</p>
          </div>
        </div>
        <div className="carrer_wrap">
          <div className="carrer_wrap_img">
            <PiCertificate />
          </div>
          <div className="carrer_wrap_text">
            <p>test 자격관련 내용입니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Qualifications;
