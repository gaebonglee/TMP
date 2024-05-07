import React from "react";
import LeftIntro from "./left/LeftIntro";
import Qualifications from "./left/Qualifications";
import TrainerSchedule from "./left/TrainerSchedule";
import Program from "./left/Program";
import LessonPrice from "./left/LessonPrice";
import CenterPlace from "./left/CenterPlace";
import "./LeftSection.scss";

const LeftSection = ({ data, sectionRefs }) => {
  return (
    <div className="leftSection">
      <LeftIntro data={data.info1} sectionRefs={sectionRefs} />
      <Qualifications data={data.info2} sectionRefs={sectionRefs} />
      <TrainerSchedule data={data.info1} sectionRefs={sectionRefs} />
      <Program data={data.info3} sectionRefs={sectionRefs} />
      <LessonPrice data={data.info4} sectionRefs={sectionRefs} />
      <CenterPlace data={data.info1} sectionRefs={sectionRefs} />
    </div>
  );
};

export default LeftSection;
