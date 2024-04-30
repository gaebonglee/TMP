import React, { useState } from "react";
import "./Program.scss";

const Program = ({ data }) => {
  return (
    <div className="program" id="intro_page_contents_wrap">
      <h1>프로그램</h1>
      {data.map((value, index) => {
        return (
          <div id="wrap_container" key={index}>
            <OutputSpecialty specialty={value.specialty} />
            <div className="program_title">
              <p>{value.title}</p>
            </div>
            {value.user_id && <hr />}
            <ProgramPhoto
              imgFile={value.program_img}
              userId={value.user_id}
              programId={value.program_id}
            />
            <div className="program_text">
              {value.program_exp && <br />}
              <p>{value.program_exp}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const OutputSpecialty = ({ specialty }) => {
  const specialtyArr = specialty
    ? specialty.includes(",")
      ? specialty.split(",")
      : [specialty]
    : [];

  return (
    <div>
      {specialtyArr.map((value, index) => {
        return (
          <p key={index} className="intro_hashtag">
            {value}
          </p>
        );
      })}
    </div>
  );
};

const ProgramPhoto = ({ imgFile, userId, programId }) => {
  const fileNames = imgFile
    ? imgFile.includes(",")
      ? imgFile.split(",")
      : [imgFile]
    : [];
  const [showAllImages, setShowAllImages] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const handleImageClick = (index) => {
    setCurrentImage(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="program_photos">
      {fileNames
        .slice(0, showAllImages ? fileNames.length : 8)
        .map((value, index) => (
          <div
            className="program_photo_box"
            key={index}
            onClick={() => handleImageClick(index)}
          >
            <img
              className="program_photo"
              src={`${process.env.REACT_APP_FILE_SERVER_URL}/program/${userId}/${programId}/${value}`}
              alt={`Program Image ${index}`}
            />
            {index === 7 && !showAllImages && fileNames.length > 8 && (
              <div
                className="program_more_overlay"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAllImages(true);
                }}
              >
                <div className="program_more_text">더 보기</div>
              </div>
            )}
          </div>
        ))}
      {modalOpen && (
        <ImageModal
          images={fileNames.map(
            (value) =>
              `${process.env.REACT_APP_FILE_SERVER_URL}/program/${userId}/${programId}/${value}`
          )}
          currentIndex={currentImage}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

const ImageModal = ({ images, currentIndex, onClose }) => {
  const [index, setIndex] = useState(currentIndex);

  const nextImage = (e) => {
    e.stopPropagation();
    if (index < images.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (index > 0) {
      setIndex(index - 1);
    } else {
      setIndex(images.length - 1);
    }
  };

  return (
    <div className="program_image_modal" onClick={onClose}>
      <div
        className="program_image_content"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[index]}
          alt={`Image ${index + 1}`}
          style={{ maxHeight: "100%", maxWidth: "100%" }}
        />
      </div>
      <button className="programModalLeftButton" onClick={prevImage}>
        &lt;
      </button>
      <button className="programModalRightButton" onClick={nextImage}>
        &gt;
      </button>
      <p className="programModalText">
        {index + 1} / {images.length}
      </p>
    </div>
  );
};

export default Program;
