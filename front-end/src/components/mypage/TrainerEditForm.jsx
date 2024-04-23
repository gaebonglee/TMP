import React from "react";
import LeftEdit from "./trainer/profile/LeftEdit";
import RightEdit from "./trainer/profile/RightEdit";
import "../trainerdetail/DetailMainContents.scss";

const TrainerEditForm = () => {
  return (
    <div className="DetailMainContents">
      <div className="DetailMain">
        <div className="DetailMainPadding">
          <div className="LeftSection">
            <LeftEdit />
          </div>
          <div className="RightIntro">
            <RightEdit />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerEditForm;
