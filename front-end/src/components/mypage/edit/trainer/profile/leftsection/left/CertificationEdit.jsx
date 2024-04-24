import React, { useState } from "react";


const CertificationEdit = ({ content, setContent }) => {
  const [certifications, setCertifications] = useState([]);

  const handleAddCertification = () => {
    // 새로운 자격 항목 추가
    const newCertification = {
      type: "",
      content: "",
      photo: null,
      showPhoto: false,
    };
    setCertifications([...certifications, newCertification]);
  };

  const handleRemoveCertification = (index) => {
    // 선택한 자격 항목 제거
    const updatedCertifications = [...certifications];
    updatedCertifications.splice(index, 1);
    setCertifications(updatedCertifications);
  };

  const handleCertificationChange = (index, key, value) => {
    // 자격 항목의 변경 (type, content)
    const updatedCertifications = [...certifications];
    updatedCertifications[index][key] = value;
    setCertifications(updatedCertifications);
  };

  const handleCertificationPhotoChange = (index, photo) => {
    // 자격 항목의 사진 변경
    const updatedCertifications = [...certifications];
    updatedCertifications[index].photo = photo;
    updatedCertifications[index].showPhoto = true; // 사진 업로드 시 자동으로 보이도록
    setCertifications(updatedCertifications);
  };

  const handleHidePhoto = (index) => {
    // 사진 숨기기
    const updatedCertifications = [...certifications];
    updatedCertifications[index].showPhoto = false;
    setCertifications(updatedCertifications);
  };

  return (
    <div className="certificationEdit_container">
      <div className="subtitle">
        <p>트레이너님 및 레슨방식을 잘 보여주는 사진을 추가해주세요.</p>
      </div>
      <div className="precautions_wrap">
        <ul>
          <li>증명서 또는 관련 사진이 확인된 후 게시됩니다.</li>
          <li>항목 작성 후 게시요청 버튼을 꼭 눌러주세요.</li>
          <li>
            승인 또는 반려 관련하여 트레이너님께 직접 연락드릴 수 있습니다.
          </li>
          <li>
            항목 하나에 여러 장의 사진을 선택하더라도 사진 맨 첫 장만 보입니다.
          </li>
        </ul>
      </div>
      <button
        className="add_certification_btn"
        onClick={handleAddCertification}
      >
        자격항목 추가하기
      </button>
      <div className="tableWrap">
        {certifications.map((certification, index) => (
          <div className="certificationEdit_table" key={index}>
            <div className="certificationEdit_status">
              <button
                className="black"
                onClick={() => handleRemoveCertification(index)}
              >
                삭제
              </button>
              <button className="green">게시요청</button>
            </div>
            <div className="certificationEdit_input">
              <select
                className="certification_type"
                value={certification.type}
                onChange={(e) =>
                  handleCertificationChange(index, "type", e.target.value)
                }
              >
                <option value={1}>자격증</option>
                <option value={2}>수상경력</option>
              </select>
              <input
                placeholder="내용을 입력해주세요"
                type="text"
                maxLength={80}
                value={certification.content}
                onChange={(e) =>
                  handleCertificationChange(index, "content", e.target.value)
                }
              />
            </div>
            {certification.showPhoto && (
              <div className="certificationEdit_buttons">
                <button
                  className="certificationEdit_change_photo"
                  onClick={() => handleHidePhoto(index)}
                >
                  증명서/사진 삭제하기
                </button>
              </div>
            )}
            {certification.showPhoto && (
              <img
                src={URL.createObjectURL(certification.photo)}
                alt="증명서 사진"
                className="certification_photo"
              />
            )}
            {!certification.showPhoto && (
              <div className="certificationEdit_buttons">
                <label className="certificationEdit_add_photo">
                  증명서 사진 업로드
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) =>
                      handleCertificationPhotoChange(index, e.target.files[0])
                    }
                  />
                </label>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificationEdit;
