import React, { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import "./ProgramEdit.scss";

const ProgramEdit = ({ content, setContent, userId, deletedArr }) => {
  const [programs, setPrograms] = useState([]);
  useEffect(() => {
    const splitResult = content.map((program) => ({
      ...program,
      specialty: program.specialty
        ? typeof program.specialty !== "object"
          ? program.specialty.split(",")
          : program.specialty
        : [],
      program_img: program.program_img
        ? typeof program.program_img !== "object"
          ? program.program_img.split(",")
          : program.program_img
        : [],
    }));

    setPrograms(splitResult);
  }, []);

  useEffect(() => {
    setContent(programs);
  }, [programs]);

  const handleSpecialtyChange = (programIndex, specialty) => {
    setPrograms((prevPrograms) => {
      const updatedPrograms = [...prevPrograms];
      const currentSpecialties = updatedPrograms[programIndex].specialty;
      if (currentSpecialties.includes(specialty)) {
        // 이미 선택된 항목이면 제거
        updatedPrograms[programIndex].specialty = currentSpecialties.filter(
          (s) => s !== specialty
        );
      } else {
        // 선택된 항목이 3개 미만이면 추가
        if (currentSpecialties.length < 3) {
          updatedPrograms[programIndex].specialty = [
            ...currentSpecialties,
            specialty,
          ];
        }
      }
      return updatedPrograms;
    });
  };
  const handleProgramChange = (index, key, value) => {
    const updatedPrograms = [...programs];
    updatedPrograms[index][key] = value;
    setPrograms(updatedPrograms);
    setContent(updatedPrograms);
  };
  const handleImgChange = (index, key, value) => {
    const updatedPrograms = [...programs];
    updatedPrograms[index][key] = [...updatedPrograms[index][key], ...value];
    setPrograms(updatedPrograms);
    setContent(updatedPrograms);
  };

  const specialtyOptions = [
    "다이어트",
    "식단관리",
    "바디프로필",
    "대회준비",
    "기초체력",
    "근력향상",
    "통증케어",
    "산전산후케어",
    "하체라인",
    "바른체형",
  ];

  const handleAddProgram = () => {
    const newProgram = {
      user_id: userId,
      specialty: [],
      title: "",
      program_exp: "",
      program_img: [],
      showPhotos: [],
    };
    setPrograms([...programs, newProgram]);
  };

  const handleRemoveProgram = (index) => {
    const updatedPrograms = [...programs];
    deletedArr.push(updatedPrograms[index].program_id);
    updatedPrograms.splice(index, 1);
    setPrograms(updatedPrograms);
    setContent(updatedPrograms);
  };

  const handleRemovePhoto = (programIndex, photoIndex) => {
    const updatedPrograms = [...programs];
    updatedPrograms[programIndex].program_img.splice(photoIndex, 1);
    setPrograms(updatedPrograms);
    setContent(updatedPrograms);
  };

  return (
    <div className="programEdit_container">
      <div className="subtitle">
        <p>트레이닝 분야 및 방법에 대해 자세히 작성해주세요.</p>
      </div>
      <div className="precautions_wrap">
        <ul>
          <li>• 자세한 프로그램 및 전문분야 내용이 큰 신뢰를 줄 수 있어요.</li>
          <li>• 사진 변경 후 '사진 저장하기' 버튼을 눌러 저장해주세요.</li>
        </ul>
      </div>
      <button className="add_program_btn" onClick={handleAddProgram}>
        프로그램 추가하기
      </button>
      <div className="tableWrap">
        {programs.map((program, programIndex) => (
          <div className="programEdit_table" key={programIndex}>
            <div className="programEdit_status">
              <button
                className="black"
                onClick={() => handleRemoveProgram(programIndex)}
              >
                삭제
              </button>
            </div>
            <div className="programEdit_input_title">
              <p>프로그램 제목을 작성해주세요.</p>
              <input
                type="text"
                placeholder="제목을 입력해주세요."
                maxLength={40}
                value={program.title}
                onChange={(e) => {
                  handleProgramChange(programIndex, "title", e.target.value);
                }}
              />
            </div>
            <div className="programEdit_speciality">
              <p>프로그램의 전문 분야를 선택해주세요. (1~3개)</p>
              {/* 여기에 전문 분야 선택 버튼이 들어갈 부분 */}
              {specialtyOptions.map((v, i) => {
                return program.specialty && program.specialty.includes(v) ? (
                  <div
                    key={i}
                    className={`speciality_btn ${
                      programs[programIndex].specialty.includes(v)
                        ? "active"
                        : ""
                    }`}
                    onClick={() => handleSpecialtyChange(programIndex, v)}
                  >
                    {v}
                  </div>
                ) : (
                  <div
                    key={i}
                    className={`speciality_btn ${
                      programs[programIndex].specialty.includes(v)
                        ? "active"
                        : ""
                    }`}
                    onClick={() => handleSpecialtyChange(programIndex, v)}
                  >
                    {v}
                  </div>
                );
              })}
              {/* 추가 전문 분야 버튼을 원하는 만큼 추가하세요 */}
            </div>
            <div className="programEdit_add_photo">
              <p>참고 사진을 올릴 수 있어요.</p>
              <div className="photoInput_wrap">
                <label
                  htmlFor={`photoInput-${programIndex}`}
                  className="upload-photo-label"
                >
                  사진 등록하기
                  <input
                    id={`photoInput-${programIndex}`}
                    type="file"
                    accept="image/*"
                    multiple
                    style={{ display: "none" }}
                    onChange={(e) =>
                      handleImgChange(
                        programIndex,
                        "program_img",
                        e.target.files
                      )
                    }
                  />
                </label>
              </div>

              {program.program_img.map((photo, photoIndex) => (
                <div className="photo_preview" key={photoIndex}>
                  {photo && (
                    <>
                      <img
                        src={
                          typeof photo === "string"
                            ? `${process.env.REACT_APP_FILE_SERVER_URL}/program/${userId}/${program.program_id}/${photo}`
                            : URL.createObjectURL(photo)
                        }
                        alt={`프로그램 사진 ${programIndex + 1}`}
                        className="photo_preview_image"
                        style={{ maxWidth: "150px", maxHeight: "150px" }}
                      />
                      <button
                        className="remove_photo_btn"
                        onClick={() =>
                          handleRemovePhoto(programIndex, photoIndex)
                        }
                      >
                        <GrClose />
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
            <div className="programEdit_text">
              <p>내용을 상세히 작성해주세요.</p>
              <textarea
                placeholder="내용을 입력해주세요."
                maxLength={1000}
                value={program.program_exp}
                onChange={(e) => {
                  handleProgramChange(
                    programIndex,
                    "program_exp",
                    e.target.value
                  );
                }}
                rows={8}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramEdit;
