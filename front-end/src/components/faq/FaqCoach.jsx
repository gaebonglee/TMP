import React, { useState, useRef } from "react";
import "./Faq.scss";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";

const FaqCoach = () => {
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
            <div className="tabComb">
              <Link to="/faq">일반회원</Link>
            </div>
            <div className="tabComb selected">센터 및 트레이너</div>
          </div>
        </div>
        <div className="faqComp">
          <div className="faqList">
            <div className="faqTitle" onClick={() => toggleCollapse(0)}>
              <div className="title">TMP 트레이너 가입은 어떻게 하나요?</div>
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
                소셜 로그인 서비스를 통해 "코치 로그인" 선택 후 로그인 해주세요!
                <br />
                <br />
                코치 로그인을 진행한 소셜 로그인 방법으로 회원 로그인이 불가한
                점 참고 부탁드립니다.
              </div>
            </div>
          </div>
          <div className="faqList">
            <div className="faqTitle" onClick={() => toggleCollapse(1)}>
              <div className="title">서비스 이용가격이 어떻게 되나요?</div>
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
                TMP는 현재 무료 중개 사이트로 운영되고 있습니다.
                <br />
                <br />
                유료로 변경 시 공지사항 게시 및 트레이너분들께 연락을 드릴
                예정입니다.
                <br />
              </div>
            </div>
          </div>
          <div className="faqList">
            <div className="faqTitle" onClick={() => toggleCollapse(2)}>
              <div className="title">
                TMP 트레이너 페이지는 어떻게 게시하나요?
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
                TMP 트레이너 로그인 후 [트레이너 정보]에서 페이지를
                작성해주세요!
                <br />
                <br />
                왼쪽 상단의 [수정] 버튼을 눌러 작성한 뒤 [저장]버튼을 누르면
                게시될 글을 미리 확인할 수 있습니다.
                <br />
              </div>
            </div>
          </div>
          <div className="faqList">
            <div className="faqTitle" onClick={() => toggleCollapse(3)}>
              <div className="title">센터 VR 사진 등록은 어떻게 하나요?</div>
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
                센터 VR 사진 미등록 시 VR 버튼 및 사진을 볼 수 없게
                되어있습니다.
                <br />
                <br />
                고객센터로 문의해 주시면 VR 사진 촬영 방법 및 설명을 안내해
                드리겠습니다.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqCoach;
