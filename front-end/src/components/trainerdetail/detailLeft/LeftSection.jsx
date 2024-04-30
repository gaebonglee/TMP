import React from "react";
import LeftIntro from "./left/LeftIntro";
import Qualifications from "./left/Qualifications";
import TrainerSchedule from "./left/TrainerSchedule";
import Program from "./left/Program";
import Review from "./left/Review";
import LessonPrice from "./left/LessonPrice";
import CenterPlace from "./left/CenterPlace";
import "./LeftSection.scss";

const LeftSection = ({ data }) => {
  return (
    <div className="leftSection">
      <LeftIntro data={data.info1} />
      <Qualifications data={data.info2} />
      <TrainerSchedule data={data.info1} />
      <Program data={data.info3} />
      <LessonPrice data={data.info4} />
      <CenterPlace data={data.info1} />
    </div>
  );
};

export default LeftSection;
