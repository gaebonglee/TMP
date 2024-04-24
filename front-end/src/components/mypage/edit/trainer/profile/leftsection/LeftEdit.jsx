import React from "react";
import TrainerProfileEdit from "../TrainerProfileEdit";
import IntroImgEdit from "../leftsection/left/IntroImgEdit";
import IntroEdit from "../leftsection/left/IntroEdit";
import QualificationsEdit from "./left/CertificationEdit";
import ScheduleEdit from "./left/ScheduleEdit";
import ProgramEdit from "./left/ProgramEdit";
import PriceEdit from "./left/PriceEdit";
import ShortIntroEdit from "./left/ShortIntroEdit";
import axios from "axios";

function LeftEdit() {
  const [introimg, setIntroImg] = React.useState("");
  const [intro, setIntro] = React.useState("");
  const [qualifications, setQualifications] = React.useState("");
  const [schedule, setSchedule] = React.useState("");
  const [program, setProgram] = React.useState("");
  const [lessonprice, setLessonPrice] = React.useState("");
  const [shortintro, setShortIntro] = React.useState("");
  const [location, setLocation] = React.useState("");

  const handleIntroImgSave = (newIntroImg) => {
    setIntroImg(newIntroImg);
    saveToMySQL({ introimg: newIntroImg });
  };

  const handleIntroSave = (newIntro) => {
    setIntro(newIntro);
    saveToMySQL({ intro: newIntro });
  };

  const handleQualificationsSave = (newQualifications) => {
    setQualifications(newQualifications);
    saveToMySQL({ qualifications: newQualifications });
  };

  const handleScheduleSave = (newSchedule) => {
    setSchedule(newSchedule);
    saveToMySQL({ schedule: newSchedule });
  };

  const handleProgramSave = (newProgram) => {
    setProgram(newProgram);
    saveToMySQL({ program: newProgram });
  };

  const handleLessonPriceSave = (newLessonPrice) => {
    setLessonPrice(newLessonPrice);
    saveToMySQL({ lessonprice: newLessonPrice });
  };

  const handleShortIntroSave = (newShortIntro) => {
    setShortIntro(newShortIntro);
    saveToMySQL({ shortintro: newShortIntro });
  };

  const handleLocationSave = (newLocation) => {
    setLocation(newLocation);
    saveToMySQL({ location: newLocation });
  };

  const saveToMySQL = (data) => {
    axios
      .post("http://your-server-url/save-to-mysql", data)
      .then((response) => {
        console.log("데이터가 MySQL에 저장되었습니다.");
      })
      .catch((error) => {
        console.error("데이터 저장에 실패했습니다.", error);
      });
  };

  return (
    <div>
      <div></div>
      <TrainerProfileEdit
        title="사진"
        content={introimg}
        onSave={handleIntroImgSave}
        inputComponent={(editedContent, setEditedContent) => (
          <IntroImgEdit content={editedContent} setContent={setEditedContent} />
        )}
      />
      <TrainerProfileEdit
        title="자기소개"
        content={intro}
        onSave={handleIntroSave}
        inputComponent={(editedContent, setEditedContent) => (
          <IntroEdit content={editedContent} setContent={setEditedContent} />
        )}
      />

      <TrainerProfileEdit
        title="검증된 자격 사항"
        content={qualifications}
        onSave={handleQualificationsSave}
        inputComponent={(editedContent, setEditedContent) => (
          <QualificationsEdit
            content={editedContent}
            setContent={setEditedContent}
          />
        )}
      />

      <TrainerProfileEdit
        title="레슨스케줄"
        content={schedule}
        onSave={handleScheduleSave}
        inputComponent={(editedContent, setEditedContent) => (
          <ScheduleEdit content={editedContent} setContent={setEditedContent} />
        )}
      />
      <TrainerProfileEdit
        title="프로그램"
        content={program}
        onSave={handleProgramSave}
        inputComponent={(editedContent, setEditedContent) => (
          <ProgramEdit content={editedContent} setContent={setEditedContent} />
        )}
      />
      <TrainerProfileEdit
        title="레슨 이용 가격"
        content={lessonprice}
        onSave={handleLessonPriceSave}
        inputComponent={(editedContent, setEditedContent) => (
          <PriceEdit content={editedContent} setContent={setEditedContent} />
        )}
      />
      <TrainerProfileEdit
        title="한줄 소개"
        content={shortintro}
        onSave={handleShortIntroSave}
        inputComponent={(editedContent, setEditedContent) => (
          <ShortIntroEdit
            content={editedContent}
            setContent={setEditedContent}
          />
        )}
      />
      <TrainerProfileEdit
        title="위치"
        content={location}
        onSave={handleLocationSave}
      />
    </div>
  );
}

export default LeftEdit;
