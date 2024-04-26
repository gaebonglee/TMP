import React from "react";
import CenterList from "../components/centermap/CenterList";
import CenterMap from "../components/centermap/CenterMap";
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
