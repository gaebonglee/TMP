import React from "react";
import LeftSection from "../trainerdetail/detailLeft/LeftSection";
import RightIntro from "../trainerdetail/detailRight/RightIntro";
import "./DetailMainContents.scss";
const DetailMainContents = () => {
  return (
    <div className="DetailMainContents">
      <div className="DetailMain">
        <div className="DetailMainPadding">
          <div className="LeftSection">
            <LeftSection />
          </div>
          <div className="RightIntro">
            <RightIntro />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailMainContents;
