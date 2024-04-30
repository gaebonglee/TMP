import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import "./IntroImgEdit.scss";

const IntroImgEdit = ({ content, setContent }) => {
  const [selectedFiles, setSelectedFiles] = useState(content);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFiles([...selectedFiles, file]);
    setContent([...selectedFiles, file]);
    console.log("selectedFile :", selectedFiles);
  };

  const handleDelete = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
    setContent(updatedFiles);
  };

  return (
    <div>
      <div className="introImgEdit_container">
        <div className="subtitle">
          <p>트레이너님 및 레슨방식을 잘 보여주는 사진을 추가해주세요.</p>
        </div>
        <div className="precautions_wrap">
          <ul>
            <li>• 맨 첫장이 대표사진(프로필)으로 설정됩니다.</li>
            <li>• 최소 3장의 사진이 있어야 페이지 게시 가능합니다.</li>
          </ul>
        </div>
        <div className="introImgEdit_content_wrap">
          <div
            className="introImgEdit_photos"
            style={{ display: "flex", flexWrap: "wrap", overflow: "auto" }}
          >
            {selectedFiles.map((file, index) => {
              const type = typeof file;
              const resultSrc =
                type === "object" ? URL.createObjectURL(file) : file;
              return (
                <div key={index} className="introImgEdit_photo_wrap">
                  <div className="introImgEdit_photo_container">
                    <img
                      src={resultSrc}
                      alt={`사진 ${index + 1}`}
                      className="introImgEdit_photo"
                    />
                    <button
                      className="introImgEdit_delete_btn"
                      onClick={() => handleDelete(index)}
                    >
                      <MdCancel />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="introImgEdit_btn_wrap">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              multiple
              style={{ display: "none" }}
              id="fileInput"
            />
            <label htmlFor="fileInput" className="introImgEdit_photo_btn">
              사진 추가하기
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroImgEdit;
