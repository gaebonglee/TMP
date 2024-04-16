import React from "react";
import CenterList from "./CenterList";
import CenterMap from "./CenterMap";
import TrainerCard from "../mainpage/TrainerCard";
import "../mainpage/TrainerCard.scss";
const TotalCenter = () => {
  return (
    <div
      style={{
        marginLeft: "10px",
      }}
    >
      <CenterList />
      <CenterMap />
    </div>
  );
};

export default TotalCenter;
