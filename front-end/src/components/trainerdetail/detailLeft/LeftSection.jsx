import React from "react";
import LeftIntro from "./left/LeftIntro";
import Qualifications from "./left/Qualifications";
import TrainerSchedule from "./left/TrainerSchedule";
import Program from "./left/Program";
import Review from "./left/Review";
import LessonPrice from "./left/LessonPrice";
import CenterPlace from "./left/CenterPlace";
import "./LeftSection.scss";
const leftSection = () => {
  return (
    <>
      <LeftIntro />
      <Qualifications />
      <TrainerSchedule />
      <Program />
      <Review />
      <LessonPrice />
      <CenterPlace />
    </>
  );
};

export default leftSection;
