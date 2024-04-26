import React, { useEffect, useState } from "react";
import TrainerList from "../components/trainermap/TrainerList";
import UndongMap from "../components/trainermap/UndongMap";

const TotalTrainer = () => {
  const [searchPosition, setSearchPosition] = useState({
    lat: 37.3595704,
    lng: 127.105399,
  }); // [latitude, longitude

  const [trainers, setTrainers] = useState([]);
  const [address, setAddress] = useState("");
  const [trainerIndex, setTrainerIndex] = useState(null);
  const [currentLatitude, setCurrentLatitude] = useState();
  const [currentLongitude, setCurrentLongitude] = useState();

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    console.log(fullAddress);
    setAddress(fullAddress);
  };

  useEffect(() => {
    fetch("http://localhost:5000/center")
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP 에러 ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      setTrainers(data);
    })
    .catch(error => {
      console.error("데이터 가져오기 실패:", error);
    });
}, []);
  return (
    <>
      {trainerIndex !== null ? (
        <TrainerList
          currentLongitude={currentLongitude}
          currentLatitude={currentLatitude}
          setTrainers={setTrainers}
          trainers={[trainers[trainerIndex]]}
        />
      ) : (
        <TrainerList
          currentLatitude={currentLatitude}
          currentLongitude={currentLongitude}
          setTrainers={setTrainers}
          trainers={trainers}
        />
      )}
      <UndongMap
        address={address}
        trainers={trainers}
        setTrainers={setTrainers}
        setTrainerIndex={setTrainerIndex}
        setCurrentLatitude={setCurrentLatitude}
        setCurrentLongitude={setCurrentLongitude}
      />
    </>
  );
};

export default TotalTrainer;
