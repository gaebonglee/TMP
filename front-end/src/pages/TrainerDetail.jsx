import React, { useState } from "react";
import Menu from "../components/trainerdetail/menu/Menu";
import DetailMainContents from "../components/trainerdetail/DetailMainContents";

const TrainerDetail = () => {
  const [trainerInfo, setTrainerInfo] = useState("coach");
  const handleTrainerInfo = (infoName) => {
    setTrainerInfo(infoName);
  };
  return (
    <section>
      <Menu trainerInfo={trainerInfo} handleTrainerInfo={handleTrainerInfo} />
      <DetailMainContents trainerInfo={trainerInfo} />
    </section>
  );
};

export default TrainerDetail;
