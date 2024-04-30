import React, { useState } from "react";
import { GiCancel } from "react-icons/gi";
import "./Program.scss";

const ProgramEdit = ({ content, setContent }) => {
  const [programs, setPrograms] = useState([]);

  const handleAddProgram = () => {
    const newProgram = {
      type: "",
      content: "",
      photos: [],
      showPhotos: [],
    };
    setPrograms([...programs, newProgram]);
  };

  const handleRemoveProgram = (index) => {
    const updatedPrograms = [...programs];
    updatedPrograms.splice(index, 1);
    setPrograms(updatedPrograms);
  };

  const handlePhotoUpload = async (programIndex, files) => {
    const updatedPrograms = [...programs];
    const newPhotos = [];
    const newShowPhotos = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      const promise = new Promise((resolve) => {
        reader.onload = (e) => {
          newPhotos.push(e.target.result);
          newShowPhotos.push(true);
          resolve();
        };
      });
      reader.readAsDataURL(file);
      await promise;
    }

    updatedPrograms[programIndex].photos =
      updatedPrograms[programIndex].photos.concat(newPhotos);
    updatedPrograms[programIndex].showPhotos =
      updatedPrograms[programIndex].showPhotos.concat(newShowPhotos);
    setPrograms(updatedPrograms);
  };

  const handleRemovePhoto = (programIndex, photoIndex) => {
    const updatedPrograms = [...programs];
    updatedPrograms[programIndex].photos.splice(photoIndex, 1);
    updatedPrograms[programIndex].showPhotos.splice(photoIndex, 1);
    setPrograms(updatedPrograms);
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
              />
            </div>
            <div className="programEdit_speciality">
              <p>프로그램의 전문 분야를 선택해주세요. (1~3개)</p>
              {/* 여기에 전문 분야 선택 버튼이 들어갈 부분 */}
              <div className="speciality_btn">다이어트</div>
              <div className="speciality_btn">식단관리</div>
              <div className="speciality_btn">바디프로필</div>
              <div className="speciality_btn">대회준비</div>
              <div className="speciality_btn">기초체력</div>
              <div className="speciality_btn">근력향상</div>
              <div className="speciality_btn">통증케어</div>
              <div className="speciality_btn">산전산후케어 </div>
              <div className="speciality_btn">하체라인</div>
              <div className="speciality_btn">바른체형</div>
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
                      handlePhotoUpload(programIndex, e.target.files)
                    }
                  />
                </label>
              </div>

              {program.photos.map((photo, photoIndex) => (
                <div className="photo_preview" key={photoIndex}>
                  {photo && program.showPhotos[photoIndex] && (
                    <>
                      <img
                        src={photo}
                        alt={`프로그램 사진 ${photoIndex + 1}`}
                        className="photo_preview_image"
                        style={{ maxWidth: "150px", maxHeight: "150px" }}
                      />
                      <button
                        className="remove_photo_btn"
                        onClick={() =>
                          handleRemovePhoto(programIndex, photoIndex)
                        }
                      >
                        <GiCancel />
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
            <div className="programEdit_text">
              <p>내용을 상세히 작성해주세요.</p>
              <textarea placeholder="내용을 입력해주세요." maxLength={1000} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramEdit;
