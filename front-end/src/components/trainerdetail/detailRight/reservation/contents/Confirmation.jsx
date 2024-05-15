import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./Confirmation.scss";
import { IoIosArrowDown } from "react-icons/io";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const Confirmation = () => {
  const { trainerId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");

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
  
  // 사용자 세션 정보 가져오기
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/session/checkSession",
          {
            credentials: "include",
          }
        );
        const sessionData = await response.json();
        if (sessionData.user_id) {
          setUserId(sessionData.user_id);
        } else {
          throw new Error("No user id found in session");
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  // 로그인한 사용자 정보 가져오기
  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:5000/reservation/selectMember/${userId}`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          setUserName(data.name);
          setUserPhone(data.phoneNumber);
        })
        .catch((error) => console.error("Error fetching member info:", error));
    }
  }, [userId]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleConfirm = () => {
    console.log("mysql데이터 저장 완료");
    const reservationData = {
      reservation_date: new Date(
        state.date.getTime() - state.date.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0],
      reservation_time: state.time,
      user_id: userId,
      received_trainer_id: trainerId,
      selected_list: state.subCategories.join(", "),
    };
    console.log(reservationData.selected_list);

    fetch("http://localhost:5000/reservation/saveReservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservationData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        return response.json();
      })
      .then((data) => {
        Toast.fire({
          icon: "success",
          title: "예약이 완료되었습니다. 예약 내역 페이지로 이동합니다",
        }).then(() => {
          setTimeout(() => {
            navigate(`/reservationList/${userId}`);
            window.scrollTo({ top: 0 });
          }, 1500);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        Toast.fire({
          icon: "error",
          title: "예약에 실패했습니다: " + error.message,
        });
      });
  };

  const [showPersonalInfoDetails, setShowPersonalInfoDetails] = useState(false);
  const togglePersonalInfoDetails = () => {
    setShowPersonalInfoDetails(!showPersonalInfoDetails);
  };

  return (
    <div className="confirmation_page">
      <div className="confirmation_page_container">
        {" "}
        <div className="confirmation_title">
          <h2>예약 확인</h2>
        </div>
        <div className="reservation_check_wrap">
          <div className="reservation_trainer_check">
            <h3>{state.trainerName} 트레이너</h3>
          </div>
          <div className="reservation_date_check">
            <p>
              일정 :{" "}
              <span>
                {state.date
                  ? state.date.toLocaleDateString()
                  : "날짜가 선택되지 않았습니다."}
              </span>
            </p>
            <p>
              시간 : <span>{state.time || "시간이 선택되지 않았습니다."}</span>
            </p>
          </div>

          <div>
            선택 항목 :{" "}
            {state.subCategories.length > 0 ? (
              <span className="reservation_subCategory_check">
                {state.subCategories.join(", ")}
              </span>
            ) : (
              <span className="reservation_subCategory_check2">
                항목이 선택되지 않았습니다.
              </span>
            )}
          </div>

          <div className="reservation_member_check">
            <a>이름 : {userName}</a>
            <a>휴대폰 번호 : {userPhone}</a>
          </div>
          <div className="reservation_agreement_check">
            <div className="agreement_personalInfo">
              <p onClick={togglePersonalInfoDetails}>
                개인정보 수집 및 이용 동의
                <IoIosArrowDown />
              </p>
              <ul className={showPersonalInfoDetails ? "show" : ""}>
                <li>• 트레이너에게 신청 정보가 전달됩니다</li>
                <li>• 제공하는 개인정보 항목 : 예약자 이름, 휴대전화 번호</li>
                <li>
                  • 제공받는 자의 이용목적 : 원활한 레슨 진행, 고객상담 및
                  민원처리
                </li>
                <li>
                  • 개인정보를 제공받는 자의 개인정보 보유 및 이용기간 :
                  회원탈퇴 시 또는 위 개인정보 이용목적 달성 시까지 이용합니다.
                </li>
                <li>
                  • 동의 거부권 등에 대한 고지 : 개인정보 제공에 동의하지 않으실
                  수 있으며, 이 경우 서비스 이용이 제한될 수 있습니다.
                </li>
              </ul>
            </div>
            <p>위 내용을 확인하였으며 예약에 동의합니다</p>
          </div>
        </div>
        <div className="confirmation_btn_wrap">
          <button onClick={handleBack} className="gray">
            이전
          </button>
          <button onClick={handleConfirm} className="green2">
            확인 및 예약완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
