import React, { useState, useEffect } from "react";
import DayTime from "./contents/DayTime";
import Purpose from "./contents/Purpose";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./ReservationPage.scss";
import Swal from "sweetalert2";

const ReservationPage = () => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [trainerName, setTrainerName] = useState("");
  const { trainerId } = useParams();
  const navigate = useNavigate();

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


  useEffect(() => {
    fetch(`http://localhost:5000/reservation/trainer/${trainerId}`)
      .then((response) => response.json())
      .then((data) => {
        setTrainerName(data.name);
      });
  }, [trainerId]);

  const handleNext = () => {
    if (!date || !time || subCategories.length === 0) {
      Toast.fire({
        icon: "error",
        title: "선택사항을 다시 확인해주세요.",
      });
    } else {
      navigate(`/confirmation/${trainerId}`, {
        state: { date, time, subCategories, trainerName, trainerId },
      });
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <div className="reservationPage_container">
      <div className="reservationPage_margin">
        <DayTime setDate={setDate} setTime={setTime} />
        <Purpose setSubCategories={setSubCategories} />
        <button className="reservationPage_container_btn" onClick={handleNext}>
          다음
        </button>
      </div>
    </div>
  );
};

export default ReservationPage;
