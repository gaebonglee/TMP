import React from "react";
import "./LeftSectionCenter.scss";
import CenterPlace from "./left/CenterPlace";
import LeftIntroCener from "./left/LeftIntroCenter";
import CenterInfo from "./left/CenterInfo";

const LeftSectionCenter = ({ data }) => {
  return (
    <div className="leftSection">
      <LeftIntroCener data={data.info1} />
      <CenterInfo data={data.info1} centerPrice={data.centerPrice} />
      <CenterPlace data={data.info1} />
    </div>
  );
};

export default LeftSectionCenter;
