import React from "react";
import { useParams } from "react-router-dom";
import "./PaymentComplete.scss";

const PaymentComplete = () => {
  const { reservationId } = useParams();

  // 예약 ID를 사용하여 추가 데이터를 로드하거나 처리
  console.log("결제 완료된 예약 ID:", reservationId);

  return (
    <div className="paymentComplete_page">
      <div className="paymentComplete_container">
        <div className="paymentComplete_title">
          <h2>예약 내역 정보</h2>
        </div>
        <div className="paymentComplete_message">
          <p>
            <strong>예약이 완료</strong>되었습니다. 감사합니다!
          </p>
        </div>
        <div className="reservation_complete_container">
          <div className="reservation_complete_contents">
            <div className="reservaton_info_wrap">
              <h3>예약자 정보</h3>
              <div className="reservaton_info_detail">
                <div className="left">
                  <p>예약자</p>
                  <p>휴대폰 번호</p>
                </div>
                <div className="right">
                  <p>이가영</p>
                  <p>01075723118</p>
                </div>
              </div>
            </div>
            <div className="payment_info_wrap">
              <h3>트레이너 정보</h3>
              <div className="payment_info_detail">
                <div className="left">
                  <p>트레이너</p>
                  <p>상담 선택 항목</p>
                </div>
                <div className="right">
                  <p>
                    <strong>@@@</strong>
                  </p>
                  <p>%%%</p>
                </div>
              </div>
            </div>
          </div>
          <div className="paymentComplete_btn_wrap">
            <button>홈으로 돌아가기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentComplete;
