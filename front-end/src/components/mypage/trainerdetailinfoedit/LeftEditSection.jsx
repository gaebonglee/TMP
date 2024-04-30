import React from "react";
import IntroTextEdit from "./leftedit/IntroTextEdit";
import IntroImgEdit from "./leftedit/IntroImgEdit";
import CertificationEdit from "./leftedit/Certification";
import ScheduleEdit from "./leftedit/ScheduleEdit";
import ProgramEdit from "./leftedit/Program";
import ShortIntroEdit from "./leftedit/ShortIntro";
import CenterPlaceEdit from "./leftedit/CenterPlaceEdit";

const LeftEditSection = () => {
  return (
    <div className="LeftEditSection">
      <IntroImgEdit />
      <IntroTextEdit />
      <CertificationEdit />
      <ScheduleEdit />
      <ProgramEdit />
      <ShortIntroEdit />
      <CenterPlaceEdit />
    </div>
  );
};

export default LeftEditSection;
