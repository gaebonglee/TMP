import React from "react";
import LeftEdit from "../trainerdetailinfo/profile/leftsection/LeftEdit";
import RightEdit from "../trainerdetailinfo/profile/rightsection/RightEdit";
import "../../../components/trainerdetail/DetailMainContents.scss";

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
