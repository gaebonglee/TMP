import React from "react";
import LeftEdit from "../trainer/profile/leftsection/LeftEdit";
import RightEdit from "../trainer/profile/rightsection/RightEdit";
import "../../../trainerdetail/DetailMainContents.scss";

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
