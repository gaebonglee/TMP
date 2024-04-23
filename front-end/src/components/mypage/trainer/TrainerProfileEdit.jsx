import React from "react";

// TrainerProfileEdit 컴포넌트
function TrainerProfileEdit({ title, content, onSave }) {
  const [editedContent, setEditedContent] = React.useState(content);

  const handleSave = () => {
    onSave(editedContent);
    // 저장 후 필요한 작업 수행
  };

  return (
    <div>
      <h2>{title}</h2>
      <textarea
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
      />
      <button onClick={handleSave}>수정</button>
    </div>
  );
}

// 트레이너 정보 수정 페이지
function TrainerProfileEditPage() {
  const [intro, setIntro] = React.useState(""); // 자기소개
  const [schedule, setSchedule] = React.useState(""); // 레슨스케줄
  const [program, setProgram] = React.useState(""); // 프로그램

  const handleIntroSave = (newIntro) => {
    setIntro(newIntro);
    // 서버에 저장할 수 있도록 처리
  };

  const handleScheduleSave = (newSchedule) => {
    setSchedule(newSchedule);
    // 서버에 저장할 수 있도록 처리
  };

  const handleProgramSave = (newProgram) => {
    setProgram(newProgram);
    // 서버에 저장할 수 있도록 처리
  };

  return (
    <div>
      <TrainerProfileEdit
        title="자기소개"
        content={intro}
        onSave={handleIntroSave}
      />
      <TrainerProfileEdit
        title="레슨스케줄"
        content={schedule}
        onSave={handleScheduleSave}
      />
      <TrainerProfileEdit
        title="프로그램"
        content={program}
        onSave={handleProgramSave}
      />
    </div>
  );
}

export default TrainerProfileEditPage;
