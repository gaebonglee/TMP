import React from "react";

const OneToOneFap = () => {
  return (
    <div className="myContainer">
      <div className="row">
        <div className="col">
          <div className="support">
            <div className="page-header">
              <h2>고객센터 문의 접수</h2>
            </div>
            <div className="row">
              <div className="input">
                <div className="inputDiv">
                  <label htmlFor="">
                    문의 유형
                    <span className="required">*</span>
                  </label>
                  <select name="type" id="">
                    <option value="-1" disabled hidden>
                      필수 선택
                    </option>
                    <option value="0">일반문의</option>
                    <option value="1">파트너 센터 가입문의(무료)</option>
                    <option value="2">코치 가입문의</option>
                    <option value="3">잘못된 정보 신고</option>
                    <option value="4">기타</option>
                    <option value="5">센터 정보 등록요청(무료)</option>
                    <option value="6">오류 제보, 앱 사용 건의</option>
                  </select>
                </div>
              </div>
              <div className="input">
                <div className="inputDiv">
                  <label htmlFor="">
                    답변 연락 받을 전화번호
                  </label>
                  <input type="tel" name="response_phone"  placeholder="필수 입력" maxLength={20} id="" />
                </div>
              </div>
              <div className="input">
                <div className="inputDiv">
                  <label htmlFor="">내용
                  <span className="required">*</span>
                  </label>
                  <textarea name="content" id="" maxLength={400} placeholder="필수 입력" rows="10"></textarea>
                </div>
              </div>
              <div className="input">
                <div className="agree row">
                  <div className="agreeLeft col"></div>
                  <div className="col"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneToOneFap;
