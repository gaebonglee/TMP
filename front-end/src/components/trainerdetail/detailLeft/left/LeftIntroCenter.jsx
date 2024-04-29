import React, { useState } from "react";
import "./LeftIntroCenter.scss";

const LeftIntroCener = ({ data }) => {
  const [visible, setVisible] = useState(6);
  const [seeMore, setSeeMore] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const fileNames = data.center_img
    ? data.center_img.includes(",")
      ? data.center_img.split(",")
      : [data.center_img]
    : [];

  const showMoreImages = (e) => {
    e.stopPropagation();
    setVisible(fileNames.length);
    setSeeMore(false);
  };

  const openModal = (index) => {
    setCurrentImage(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const showPrevImage = (e) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev === 0 ? fileNames.length - 1 : prev - 1));
  };

  const showNextImage = (e) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev === fileNames.length - 1 ? 0 : prev + 1));
  };

  const copyAddress = (address) => {
    navigator.clipboard.writeText(address);
    alert("클립보드에 주소가 복사되었습니다.");
  };

  return (
    <div className="intro_detail" id="intro_page_contents_wrap">
      <div id="wrap_container">
        <div>
          <div className="flexBoxStart" style={{ marginLeft: "5px" }}>
            <strong style={{ marginRight: "8px" }}>{data.center_name}</strong>
            {data.center_name && <div className="contact">상세 정보</div>}
          </div>
          <div
            className="flexBoxStart"
            style={{ marginBottom: "5px", marginLeft: "5px" }}
          >
            <div className="addressOnLocation">
              <span style={{ marginRight: "8px" }}>{data.center_address}</span>
              {data.center_name && (
                <span
                  onClick={() => {
                    copyAddress(data.center_address);
                  }}
                  className="contact"
                >
                  주소 복사
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="intro_photo">
          {fileNames.slice(0, visible).map((result, index) => (
            <div
              className="image_container_center"
              key={index}
              onClick={() => openModal(index)}
            >
              <img
                src={`${process.env.REACT_APP_FILE_SERVER_URL}/center/${data.center_id}/${result}`}
                alt={`Loaded file ${index}`}
                className="intro_photos"
              />
              {index === 5 && seeMore && (
                <div className="overlay" onClick={showMoreImages}>
                  더 보기
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {modalOpen && (
        <div className="intro_modal" onClick={closeModal}>
          {fileNames.map((img, index) => (
            <img
              key={index}
              src={`${process.env.REACT_APP_FILE_SERVER_URL}/trainer/${data.user_id}/${img}`}
              alt={`Modal file ${index}`}
              className={`intro_modal_image ${
                currentImage === index ? "active" : ""
              }`}
            />
          ))}
          <button className="intro_arrow intro_left" onClick={showPrevImage}>
            &#60;
          </button>
          <button className="intro_arrow intro_right" onClick={showNextImage}>
            &#62;
          </button>
          <p className="intro_image_page" style={{ textAlign: "center" }}>
            {currentImage + 1} / {fileNames.length}
          </p>
        </div>
      )}
    </div>
  );
};

export default LeftIntroCener;
