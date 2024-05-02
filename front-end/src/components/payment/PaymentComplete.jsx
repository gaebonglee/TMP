import React from "react";
import "./PaymentComplete.scss";

const PaymentComplete = () => {
  return (
    <div className="paymentComplete_page">
      <div className="paymentComplete_message">
        <h2>결제 완료</h2>
        <p>
          <strong>결제가 완료</strong>되었습니다. 감사합니다!
        </p>
      </div>
      <div className="reservation_complete_container">
        <h2>예약 내역 정보</h2>
        <div className="complete_trainer_info">
          <p>@@@선생님</p>
          <p>선택 항목 : </p>
        </div>
        <div className="reservation_complete_contents">
          <div className="reservaton_info_wrap">
            <h3>예약자 정보</h3>
            <div className="reservaton_info_detail">
              <div className="left">
                <p>예약자</p>
                <p>휴대폰 번호</p>
                <p>요청사항</p>
              </div>
              <div className="right">
                <p>이가영</p>
                <p>01075723118</p>
                <p>요청사항 메모입니다.</p>
              </div>
            </div>
          </div>
          <div className="payment_info_wrap">
            <h3>결제 정보</h3>
            <div className="payment_info_detail">
              <div className="left">
                <p>총 결제금액</p>
                <p>결제수단</p>
              </div>
              <div className="right">
                <p>
                  <strong>50,000</strong>원
                </p>
                <p>카카오페이</p>
              </div>
            </div>
          </div>
        </div>
        <div className="paymentComplete_btn_wrap">
          <button>결제 상세 내역</button>
          <button>홈으로 돌아가기</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentComplete;
