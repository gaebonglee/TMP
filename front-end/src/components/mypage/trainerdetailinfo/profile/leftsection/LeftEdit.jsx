import React, { useState } from "react";
import TrainerProfileEdit from "../TrainerProfileEdit";
import IntroImgEdit from "../leftsection/left/IntroImgEdit";
import IntroEdit from "../leftsection/left/IntroEdit";
import QualificationsEdit from "./left/CertificationEdit";
import ScheduleEdit from "./left/ScheduleEdit";
import ProgramEdit from "./left/ProgramEdit";
import PriceEdit from "./left/PriceEdit";
import ShortIntroEdit from "./left/ShortIntroEdit";
import axios from "axios";
import CenterLocationEdit from "./left/CenterLocationEdit";

function LeftEdit({ data, userId }) {
  const imgArr = data.info1.intro_img
    ? data.info1.intro_img.includes(",")
      ? data.info1.intro_img.split(",")
      : [data.info1.intro_img]
    : [];
  for (let i = 0; i < imgArr.length; i++) {
    imgArr[
      i
    ] = `${process.env.REACT_APP_FILE_SERVER_URL}/trainer/${userId}/${imgArr[i]}`;
  }
  const [introimg, setIntroImg] = useState(imgArr);
  const [intro, setIntro] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [schedule, setSchedule] = useState("");
  const [program, setProgram] = useState("");
  const [lessonprice, setLessonPrice] = useState("");
  const [shortintro, setShortIntro] = useState("");
  const [location, setLocation] = useState("");

  const handleImgSaveChanges = async (newIntroImg) => {
    const files = newIntroImg.filter((value) => {
      return typeof value === "object";
    });
    const urls = newIntroImg.filter((value) => {
      return typeof value !== "object";
    });

    // 이미지 삭제처리
    const deleteResponse = await fetch(
      "http://localhost:5000/file/delete-files",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ files: urls, userId, table: "trainer" }),
      }
    );

    const filesInfo = files.map((file) => ({
      name: file.name,
      type: file.type,
    }));
    // 이미지 배열을 서버로 전송하여 저장
    const response = await fetch(
      "http://localhost:5000/file/generate-signed-urls",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ files: filesInfo, userId, table: "trainer" }),
      }
    );

    const { signedUrls } = await response.json();

    await Promise.all(
      signedUrls.map(async ({ name, url }) => {
        const file = files.find((f) => f.name === name);
        const result = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": file.type,
          },
          body: file,
        });

        if (result.ok) {
          console.log(`${name} uploaded successfully.`);
        } else {
          console.error(`Failed to upload ${name}.`);
        }
      })
    );

    const updateResponse = await fetch(
      "http://localhost:5000/file/update-files",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, table: "trainer" }),
      }
    );
  };

  const handleIntroImgSave = (newIntroImg) => {
    setIntroImg(newIntroImg);
    handleImgSaveChanges(newIntroImg);
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
        inputComponent={(editedContent, setEditedContent) => (
          <CenterLocationEdit
            content={editedContent}
            setContent={setEditedContent}
          />
        )}
      />
    </div>
  );
}

export default LeftEdit;
