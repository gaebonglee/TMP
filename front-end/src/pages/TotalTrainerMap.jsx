import React, { useState, useEffect } from "react";
import TrainerList from "../components/trainermap/TrainerList";
import UndongMap from "../components/trainermap/UndongMap";
import LoadingSpinner from "components/trainermap/LoadingSpinner";
import SearchInput from "../components/trainermap/SearchInput";

const TotalTrainer = () => {
  const [trainers, setTrainers] = useState([]);
  const [trainerIndex, setTrainerIndex] = useState(null);
  const [currentLatitude, setCurrentLatitude] = useState();
  const [currentLongitude, setCurrentLongitude] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [searchCenter, setSearchCenter] = useState(null);
  const [filter, setFilter] = useState(false);
  const [centerList, setCenterList] = useState(false);
  const [searchingData, setSearchingData] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:5000/center")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP 에러 ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setTrainers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("데이터 가져오기 실패:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {trainerIndex !== null ? (
        <TrainerList
          setSearchCenter={setSearchCenter}
          currentLongitude={currentLongitude}
          currentLatitude={currentLatitude}
          setTrainers={setTrainers}
          trainers={[trainers[trainerIndex]]}
        />
      ) : (
        <TrainerList
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
          searchCenter={searchCenter}
          setIsLoading={setIsLoading}
          trainers={trainers}
          setTrainers={setTrainers}
          setTrainerIndex={setTrainerIndex}
          currentLatitude={currentLatitude}
          currentLongitude={currentLongitude}
          setCurrentLatitude={setCurrentLatitude}
          setCurrentLongitude={setCurrentLongitude}
        />
      )}
    </>
  );
};

export default TotalTrainer;
