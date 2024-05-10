import React, { useState, useRef } from "react";
import "./Faq.scss";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggleCollapse = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq">
      <div className="myContainer">
        <div className="page-header">
          <h2>자주 묻는 질문</h2>
          <div className="tab">
            <div className="tabComb selected">일반회원</div>
            <div className="tabComb">
              <Link to="/faqCoach">센터 및 트레이너</Link>
            </div>
          </div>
        </div>
        <div className="faqComp">
          <div className="faqList">
            <div className="faqTitle" onClick={() => toggleCollapse(0)}>
              <div className="title">TMP는 어떤 서비스인가요?</div>
              <div>
                {activeIndex === 0 ? (
                  <IoIosArrowUp size={24} />
                ) : (
                  <IoIosArrowDown size={24} />
                )}
              </div>
            </div>
            <div
              className={`collapse ${activeIndex === 0 ? "show" : ""}`}
              ref={(el) => (contentRefs.current[0] = el)}
              style={{
                maxHeight:
                  activeIndex === 0
                    ? `${contentRefs.current[0]?.scrollHeight}px`
                    : "0",
                overflow: "hidden",
                transition: "max-height 0.3s ease-out",
              }}
            >
              <div className="content">
                트레이너의 정보를 투명하게 공개하여 사진, 소개 글, 가격, 스케줄,
                자격증을 확인할 수 있고 원하는 트레이너와 회원을 연결해 주는
                매칭 사이트입니다.
                <br />
              </div>
            </div>
          </div>
          <div className="faqList">
            <div className="faqTitle" onClick={() => toggleCollapse(1)}>
              <div className="title">
                등록된 트레이너의 정보를 믿을 수 있나요?
              </div>
              <div>
                {activeIndex === 1 ? (
                  <IoIosArrowUp size={24} />
                ) : (
                  <IoIosArrowDown size={24} />
                )}
              </div>
            </div>
            <div
              className={`collapse ${activeIndex === 1 ? "show" : ""}`}
              ref={(el) => (contentRefs.current[1] = el)}
              style={{
                maxHeight:
                  activeIndex === 1
                    ? `${contentRefs.current[1]?.scrollHeight}px`
                    : "0",
                overflow: "hidden",
                transition: "max-height 0.3s ease-out",
              }}
            >
              <div className="content">
                등록된 정보는 모두 트레이너님이 직접 올린 정보입니다.
                <br />
                <br />
                TMP측에서 올바른 정보인지 검토하고 있으며 적합하지 않은 경우
                해당 트레이너와 직접 소통하여 올바르게 수정하기도 합니다.
                <br />
              </div>
            </div>
          </div>
          <div className="faqList">
            <div className="faqTitle" onClick={() => toggleCollapse(2)}>
              <div className="title">
                예약 완료 후 트레이너님의 연락이 오지 않아요.
              </div>
              <div>
                {activeIndex === 2 ? (
                  <IoIosArrowUp size={24} />
                ) : (
                  <IoIosArrowDown size={24} />
                )}
              </div>
            </div>
            <div
              className={`collapse ${activeIndex === 2 ? "show" : ""}`}
              ref={(el) => (contentRefs.current[2] = el)}
              style={{
                maxHeight:
                  activeIndex === 2
                    ? `${contentRefs.current[2]?.scrollHeight}px`
                    : "0",
                overflow: "hidden",
                transition: "max-height 0.3s ease-out",
              }}
            >
              <div className="content">
                트레이너가 예약 내역들을 확인 후 순차적으로 연락을 드리고 있어
                지연될 수 있습니다.
                <br />
                <br />
                계속 연락이 오지 않을 경우 TMP의 고객센터로 문의 부탁드립니다.
                <br />
              </div>
            </div>
          </div>
          <div className="faqList">
            <div className="faqTitle" onClick={() => toggleCollapse(3)}>
              <div className="title">
                홈페이지에 오류나 잘못된 정보가 있어요.
              </div>
              <div>
                {activeIndex === 3 ? (
                  <IoIosArrowUp size={24} />
                ) : (
                  <IoIosArrowDown size={24} />
                )}
              </div>
            </div>
            <div
              className={`collapse ${activeIndex === 3 ? "show" : ""}`}
              ref={(el) => (contentRefs.current[3] = el)}
              style={{
                maxHeight:
                  activeIndex === 3
                    ? `${contentRefs.current[3]?.scrollHeight}px`
                    : "0",
                overflow: "hidden",
                transition: "max-height 0.3s ease-out",
              }}
            >
              <div className="content">
                오류 또는 잘못된 정보가 있을 경우 고객센터로 전화주시거나 1:1
                문의하기를 통해 내용을 남겨주시면 빠르게 수정하겠습니다!
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
