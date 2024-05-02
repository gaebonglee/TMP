import React, { useState, useEffect } from "react";
import DayTime from "./contents/DayTime";
import Purpose from "./contents/Purpose";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const ReservationPage = () => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [trainerName, setTrainerName] = useState("");
  const { trainerId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/reservation/trainer/${trainerId}`)
      .then((response) => response.json())
      .then((data) => {
        setTrainerName(data.name);
      });
  }, [trainerId]);

  const handleNext = () => {
    navigate(`/confirmation/${trainerId}`, {
      state: { date, time, subCategories, trainerName, trainerId },
    });
  };

  return (
    <div className="reservationPage_container">
      <DayTime setDate={setDate} setTime={setTime} />
      <Purpose setSubCategories={setSubCategories} />
      <button onClick={handleNext}>다음</button>
    </div>
  );
};

export default ReservationPage;
