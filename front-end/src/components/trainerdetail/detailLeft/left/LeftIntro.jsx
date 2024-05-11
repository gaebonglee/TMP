import React, { useState } from "react";
import "./LeftIntro.scss";

const LeftIntro = ({ data, sectionRefs }) => {
  const [visible, setVisible] = useState(8);
  const [seeMore, setSeeMore] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const fileNames = data.intro_img
    ? data.intro_img.includes(",")
      ? data.intro_img.split(",")
      : [data.intro_img]
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

  return (
    <div>
      <div className="intro_detail" id="intro_page_contents_wrap">
        <h1 id="header_section1" ref={sectionRefs.current.header_section1}>
          트레이너 소개
        </h1>
        <div id="wrap_container">
          <div className="intro_photo">
            {fileNames.slice(0, visible).map((result, index) => (
              <div
                className="image_container"
                key={index}
                onClick={() => openModal(index)}
              >
                <img
                  src={`${process.env.REACT_APP_FILE_SERVER_URL}/trainer/${data.user_id}/${result}`}
                  alt={`Loaded file ${index}`}
                  className="intro_photos"
                />
                {index === 7 && seeMore && (
                  <div className="overlay" onClick={showMoreImages}>
                    더 보기
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="intro_text">
            {data.intro_img && <br />}
            <p style={{ whiteSpace: "pre-wrap" }}>{data.intro}</p>
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
    </div>
  );
};

export default LeftIntro;
