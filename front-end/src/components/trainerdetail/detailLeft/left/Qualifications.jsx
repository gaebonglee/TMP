import React, { useState } from "react";
import "./Qualifications.scss";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { PiCertificate, PiTrophy } from "react-icons/pi";

const Qualifications = ({ data, sectionRefs }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const openModal = (index) => {
    setSelectedIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedIndex(null);
  };

  const nextImage = () => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const prevImage = () => {
    setSelectedIndex(
      (prevIndex) => (prevIndex - 1 + data.length) % data.length
    );
  };

  const rows = 20;
  const cols = 20;

  const getOffset = (rowIndex) => {
    // 줄마다 다른 오프셋을 설정합니다.
    return `${rowIndex % 2 === 0 ? 0 : -90}px`;
  };
  return (
    <div>
      <div id="intro_page_contents_wrap" className="qualifications">
        <div className="title_wrap">
          <h1 id="header_section2" ref={sectionRefs.current.header_section2}>
            검증된 자격사항
          </h1>
          {/* <div className="trainer_check_btn">
            <div className="check_btn_wrap">
              <IoCheckmarkDoneSharp />
              <p>증명 확인하기</p>
            </div>
          </div> */}
        </div>
        <div id="wrap_container">
          {data.map((carrer, index) => (
            <div
              className="carrer_wrap"
              key={index}
              onClick={() => openModal(index)}
            >
              <div className="carrer_wrap_img">
                {carrer.certification_type === "1" ? (
                  <PiCertificate />
                ) : (
                  <PiTrophy />
                )}
              </div>
              <div className="carrer_wrap_text">
                <p>{carrer.certification_name}</p>
              </div>
            </div>
          ))}
        </div>
        {isOpen && (
          <Modal
            isOpen={isOpen}
            onClose={closeModal}
            currentIndex={selectedIndex}
            totalCount={data.length}
          >
            <ArrowButton direction="left" onClick={prevImage} />
            <img
              src={`${process.env.REACT_APP_FILE_SERVER_URL}/certification/${data[selectedIndex].user_id}/${data[selectedIndex].certification_img}`}
              alt="certification_img"
              className="certification_img"
            />
            <ArrowButton direction="right" onClick={nextImage} />
          </Modal>
        )}
      </div>
    </div>
  );
};

const Modal = ({ isOpen, onClose, children, currentIndex, totalCount }) => {
  const handleBackgroundClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal_background" onClick={handleBackgroundClick}>
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
      <p className="image_counter">
        {currentIndex + 1} / {totalCount}
      </p>
    </div>
  );
};

const ArrowButton = ({ direction, onClick }) => (
  <button onClick={onClick} className={`arrow_button ${direction}`}>
    {direction === "left" ? "<" : ">"}
  </button>
);

export default Qualifications;
