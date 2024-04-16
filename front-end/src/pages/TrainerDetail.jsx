import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Menu from "../components/trainerdetail/Menu";
import LeftIntro from "../components/trainerdetail/left/LeftIntro";
import Qualifications from "../components/trainerdetail/left/Qualifications";
import TrainerSchedule from "../components/trainerdetail/left/TrainerSchedule";
import Program from "../components/trainerdetail/left/Program";
import Review from "../components/trainerdetail/left/Review";
import LessonPrice from "../components/trainerdetail/left/LessonPrice";
import CenterPlace from "../components/trainerdetail/left/CenterPlace";
import RightIntro from "../components/trainerdetail/right/RightIntro";

const TrainerDetail = () => {
  return (
    <div id="root">
      <div id="contents">
        <Header />
        <Menu />
        <div className="trainer_intro_page">
          <div>
            <div className="trainer_intro_page_container">
              <div>
                <LeftIntro />
                <Qualifications />
                <TrainerSchedule />
                <Program />
                <Review />
                <LessonPrice />
                <CenterPlace />
              </div>
              <div>
                <RightIntro />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default TrainerDetail;
