import React from "react";
import "./LeftSectionCenter.scss";
import CenterPlace from "./left/CenterPlace";
import LeftIntroCener from "./left/LeftIntroCenter";
import CenterInfo from "./left/CenterInfo";

const LeftSectionCenter = ({ data, sectionRefs }) => {
  return (
    <div className="leftSection">
      {data.info1.center_id && (
        <LeftIntroCener data={data.info1} sectionRefs={sectionRefs} />
      )}
      {data.info1.center_id && (
        <CenterInfo
          data={data.info1}
          centerPrice={data.centerPrice}
          sectionRefs={sectionRefs}
        />
      )}
      {data.info1.center_id && (
        <CenterPlace data={data.info1} sectionRefs={sectionRefs} />
      )}
      {data.info1.center_id === null && (
        <div className="pleaseInsertCenterInfo">
          센터가 등록되어 있지 않습니다
        </div>
      )}
    </div>
  );
};

export default LeftSectionCenter;
