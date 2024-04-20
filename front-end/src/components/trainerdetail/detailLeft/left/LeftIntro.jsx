import React from "react";
import "./LeftIntro.scss";

const LeftIntro = () => {
  return (
    <div className="intro_detail" id="intro_page_contents_wrap">
      <h1>선생님 소개</h1>
      <div id="wrap_container">
        <div className="intro_photo"></div>
        <div className="intro_text">
          <p>
            테스트 내용입니다.테스트 내용입니다.테스트 내용입니다.테스트
            내용입니다.테스트 내용입니다.테스트 내용입니다.테스트
            내용입니다.테스트 내용입니다.테스트 내용입니다.테스트
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeftIntro;
