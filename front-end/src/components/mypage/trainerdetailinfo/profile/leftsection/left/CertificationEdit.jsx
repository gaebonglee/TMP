import React, { useState } from "react";
import "./CertificationEdit.scss";

const CertificationEdit = ({ content, setContent, userId, deletedArr }) => {
  const refineArr = [];
  for (let i = 0; i < content.length; i++) {
    refineArr.push({
      certification_id: content[i].certification_id,
      certification_type: content[i].certification_type,
      certification_name: content[i].certification_name,
      certification_img: content[i].certification_img,
      showPhoto: true,
    });
  }
  const [certifications, setCertifications] = useState(refineArr);

  const handleAddCertification = () => {
    const newCertification = {
      certification_type: "1",
      certification_name: "",
      certification_img: null,
      showPhoto: false,
    };
    setCertifications([...certifications, newCertification]);
    setContent([...certifications, newCertification]);
  };

  const handleRemoveCertification = (index) => {
    const updatedCertifications = [...certifications];
    if (updatedCertifications[index].certification_id) {
      deletedArr.push(updatedCertifications[index].certification_id);
    }
    updatedCertifications.splice(index, 1);
    setCertifications(updatedCertifications);
    setContent(updatedCertifications);
  };

  const handleCertificationChange = (index, key, value) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[index][key] = value;
    setCertifications(updatedCertifications);
    setContent(updatedCertifications);
  };

  const handleCertificationPhotoChange = (index, photo) => {
    const updatedCertifications = [...certifications];
    const randomStr = "R" + Math.floor(Math.random() * 10000);
    const newFile = new File([photo], `${randomStr}${photo.name}`, {
      type: photo.type,
    });
    updatedCertifications[index].certification_img = newFile;
    updatedCertifications[index].showPhoto = true;
    setCertifications(updatedCertifications);
    setContent(updatedCertifications);
  };

  //사진 숨기기 아니고 사진 삭제임
  const handleHidePhoto = (index) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[index].showPhoto = false;
    setCertifications(updatedCertifications);
    setContent(updatedCertifications);
  };

  return (
    <div className="certificationEdit_container">
      <div className="subtitle">
        <p>트레이너님 및 레슨방식을 잘 보여주는 사진을 추가해주세요.</p>
      </div>
      <div className="precautions_wrap">
        <ul>
          <li>• 항목 작성 후 저장 버튼을 꼭 눌러주세요.</li>
          <li>
            • 증명서 또는 관련 사진이 정상적이지 않을 시 삭제 처리될 수
            있습니다.
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
            </div>
            <div className="certificationEdit_input">
              <select
                className="certification_type"
                value={certification.certification_type}
                onChange={(e) =>
                  handleCertificationChange(
                    index,
                    "certification_type",
                    e.target.value
                  )
                }
              >
                <option value={"1"}>자격증</option>
                <option value={"2"}>수상경력</option>
              </select>
              <input
                placeholder="내용을 입력해주세요"
                type="text"
                maxLength={80}
                value={certification.certification_name || ""}
                onChange={(e) =>
                  handleCertificationChange(
                    index,
                    "certification_name",
                    e.target.value
                  )
                }
              />
            </div>
            {certification.showPhoto && (
              <div className="certificationEdit_btn">
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
                src={
                  typeof certification.certification_img !== "object"
                    ? `${process.env.REACT_APP_FILE_SERVER_URL}/certification/${userId}/${certification.certification_img}`
                    : URL.createObjectURL(certification.certification_img)
                }
                alt="증명서 사진"
                className="certification_photo"
                style={{ width: "300px", height: "auto" }}
              />
            )}
            {!certification.showPhoto && (
              <div className="certificationEdit_btn">
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
