import React from "react";
import LeftEditSection from "../trainerdetailinfoedit/LeftEditSection";
import RightEditSection from "./RightEditSection";
import "../../../components/trainerdetail/DetailMainContents.scss";

const TrainerEditForm = () => {
  return (
    <div className="DetailMainContents">
      <div className="DetailMain">
        <div className="DetailMainPadding">
          <div className="LeftSection">
            <LeftEditSection />
          </div>
          <div className="RightIntro">
            <RightEditSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerEditForm;
