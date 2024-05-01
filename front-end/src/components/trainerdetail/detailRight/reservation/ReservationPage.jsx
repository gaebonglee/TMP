import React, { useState, useEffect } from "react";
import DayTime from "./contents/DayTime";
import Purpose from "./contents/Purpose";
import Confirmation from "./contents/Confirmation";
import { useParams } from "react-router-dom";

const ReservationPage = () => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [trainerName, setTrainerName] = useState("");
  const { trainerId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/reservation/trainer/${trainerId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched trainer data:", data); // 데이터 로깅
        setTrainerName(data.name);
      });
  }, [trainerId]);

  return (
    <div className="reservationPage_contrainer">
      <DayTime setDate={setDate} setTime={setTime} />
      <Purpose setSubCategories={setSubCategories} />
      <Confirmation
        date={date}
        time={time}
        subCategories={subCategories}
        trainerName={trainerName}
      />
    </div>
  );
};

export default ReservationPage;
