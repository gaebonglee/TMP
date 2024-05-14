import React, { useState, useEffect, useRef } from "react";
import TrainerList from "../components/trainermap/TrainerList";
import UndongMap from "../components/trainermap/UndongMap";
import LoadingSpinner from "components/trainermap/LoadingSpinner";

const TotalTrainer = () => {
  const [trainers, setTrainers] = useState([]);
  const [trainerIndex, setTrainerIndex] = useState(null);
  const [currentLatitude, setCurrentLatitude] = useState(37.5665);
  const [currentLongitude, setCurrentLongitude] = useState(126.978);
  const [isLoading, setIsLoading] = useState(false);
  const [searchCenter, setSearchCenter] = useState([]);
  const newCenter = useRef(null);
  const [clickedTrainers, setClickedTrainers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/center");
        if (!response.ok) {
          throw new Error(`HTTP 에러 ${response.status}`);
        }
        const data = await response.json();
        setTrainers(data);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {trainerIndex !== null ? (
        <TrainerList
          setIsLoading={setIsLoading}
          searchCenter={searchCenter}
          setSearchCenter={setSearchCenter}
          currentLongitude={currentLongitude}
          currentLatitude={currentLatitude}
          setTrainers={setTrainers}
          trainers={[trainers[trainerIndex]]}
        />
      ) : (
        <TrainerList
          setIsLoading={setIsLoading}
          searchCenter={searchCenter}
          setSearchCenter={setSearchCenter}
          currentLatitude={currentLatitude}
          currentLongitude={currentLongitude}
          setTrainers={setTrainers}
          trainers={trainers}
        />
      )}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <UndongMap
          clickedTrainers={clickedTrainers}
          setClickedTrainers={setClickedTrainers}
          setSearchCenter={setSearchCenter}
          searchCenter={searchCenter}
          setIsLoading={setIsLoading}
          trainers={trainers}
          setTrainers={setTrainers}
          setTrainerIndex={setTrainerIndex}
          currentLatitude={currentLatitude}
          currentLongitude={currentLongitude}
          setCurrentLatitude={setCurrentLatitude}
          setCurrentLongitude={setCurrentLongitude}
          newCenter={newCenter}
        />
      )}
    </>
  );
};

export default TotalTrainer;
