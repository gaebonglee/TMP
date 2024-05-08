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
        {/* <div className="supportButton">
          <div>
            <div className="button_Div">
              <button className="button_ioi">
                <span>1:1 문의하기</span>
              </button>
            </div>
          </div>
        </div> */}
        <div className="faqComp">
          <div className="faqList">
            <div className="faqTitle" onClick={() => toggleCollapse(0)}>
              <div className="title">1회 체험을 어떻게 하면 되나요?</div>
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
                1회 체험 레슨은 2~3만원대 낮은 금액으로 PT를 체험해볼 수 있는
                서비스입니다.
                <br />
                <br />
                PT 등록 전 1회 체험 수업을 통해 코치님과 한번 운동해보고, PT
                등록을 고민해 보세요 !
                <br />
              </div>
            </div>
          </div>
          <div className="faqList">
            <div className="faqTitle" onClick={() => toggleCollapse(1)}>
              <div className="title">프로필 컨설팅이 뭔가요?</div>
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
                1회 체험 레슨은 2~3만원대 낮은 금액으로 PT를 체험해볼 수 있는
                서비스입니다.
                <br />
                <br />
                PT 등록 전 1회 체험 수업을 통해 코치님과 한번 운동해보고, PT
                등록을 고민해 보세요 !
                <br />
              </div>
            </div>
          </div>
          <div className="faqList">
            <div className="faqTitle" onClick={() => toggleCollapse(2)}>
              <div className="title">
                어떻게 해야 코치 리스트 상단에 노출될 수 있나요?
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
                1회 체험 레슨은 2~3만원대 낮은 금액으로 PT를 체험해볼 수 있는
                서비스입니다.
                <br />
                <br />
                PT 등록 전 1회 체험 수업을 통해 코치님과 한번 운동해보고, PT
                등록을 고민해 보세요 !
                <br />
              </div>
            </div>
          </div>
          <div className="faqList">
            <div className="faqTitle" onClick={() => toggleCollapse(3)}>
              <div className="title">제 센터가 안나와요</div>
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
                1회 체험 레슨은 2~3만원대 낮은 금액으로 PT를 체험해볼 수 있는
                서비스입니다.
                <br />
                <br />
                PT 등록 전 1회 체험 수업을 통해 코치님과 한번 운동해보고, PT
                등록을 고민해 보세요 !
                <br />
              </div>
            </div>
          </div>
          <div className="faqList">
            <div className="faqTitle" onClick={() => toggleCollapse(4)}>
              <div className="title">
                파트너 센터 가입(무료)은 어떻게 하나요?
              </div>
              <div>
                {activeIndex === 4 ? (
                  <IoIosArrowUp size={24} />
                ) : (
                  <IoIosArrowDown size={24} />
                )}
              </div>
            </div>
            <div
              className={`collapse ${activeIndex === 4 ? "show" : ""}`}
              ref={(el) => (contentRefs.current[4] = el)}
              style={{
                maxHeight:
                  activeIndex === 4
                    ? `${contentRefs.current[4]?.scrollHeight}px`
                    : "0",
                overflow: "hidden",
                transition: "max-height 0.3s ease-out",
              }}
            >
              <div className="content">
                1회 체험 레슨은 2~3만원대 낮은 금액으로 PT를 체험해볼 수 있는
                서비스입니다.
                <br />
                <br />
                PT 등록 전 1회 체험 수업을 통해 코치님과 한번 운동해보고, PT
                등록을 고민해 보세요 !
                <br />
              </div>
            </div>
          </div>
          <div className="faqList">
            <div className="faqTitle" onClick={() => toggleCollapse(5)}>
              <div className="title">TMP 코치 가입은 어떻게 하나요?</div>
              <div>
                {activeIndex === 5 ? (
                  <IoIosArrowUp size={24} />
                ) : (
                  <IoIosArrowDown size={24} />
                )}
              </div>
            </div>
            <div
              className={`collapse ${activeIndex === 5 ? "show" : ""}`}
              ref={(el) => (contentRefs.current[5] = el)}
              style={{
                maxHeight:
                  activeIndex === 5
                    ? `${contentRefs.current[5]?.scrollHeight}px`
                    : "0",
                overflow: "hidden",
                transition: "max-height 0.3s ease-out",
              }}
            >
              <div className="content">
                1회 체험 레슨은 2~3만원대 낮은 금액으로 PT를 체험해볼 수 있는
                서비스입니다.
                <br />
                <br />
                PT 등록 전 1회 체험 수업을 통해 코치님과 한번 운동해보고, PT
                등록을 고민해 보세요 !
                <br />
              </div>
            </div>
          </div>
          <div className="faqList">
            <div className="faqTitle" onClick={() => toggleCollapse(6)}>
              <div className="title">서비스 이용 가격이 어떻게 되나요?</div>
              <div>
                {activeIndex === 6 ? (
                  <IoIosArrowUp size={24} />
                ) : (
                  <IoIosArrowDown size={24} />
                )}
              </div>
            </div>
            <div
              className={`collapse ${activeIndex === 6 ? "show" : ""}`}
              ref={(el) => (contentRefs.current[6] = el)}
              style={{
                maxHeight:
                  activeIndex === 6
                    ? `${contentRefs.current[6]?.scrollHeight}px`
                    : "0",
                overflow: "hidden",
                transition: "max-height 0.3s ease-out",
              }}
            >
              <div className="content">
                1회 체험 레슨은 2~3만원대 낮은 금액으로 PT를 체험해볼 수 있는
                서비스입니다.
                <br />
                <br />
                PT 등록 전 1회 체험 수업을 통해 코치님과 한번 운동해보고, PT
                등록을 고민해 보세요 !
                <br />
              </div>
            </div>
          </div>
          <div className="faqList">
            <div className="faqTitle" onClick={() => toggleCollapse(7)}>
              <div className="title">TMP 코치 페이지는 어떻게 게시하나요?</div>
              <div>
                {activeIndex === 7 ? (
                  <IoIosArrowUp size={24} />
                ) : (
                  <IoIosArrowDown size={24} />
                )}
              </div>
            </div>
            <div
              className={`collapse ${activeIndex === 7 ? "show" : ""}`}
              ref={(el) => (contentRefs.current[7] = el)}
              style={{
                maxHeight:
                  activeIndex === 7
                    ? `${contentRefs.current[7]?.scrollHeight}px`
                    : "0",
                overflow: "hidden",
                transition: "max-height 0.3s ease-out",
              }}
            >
              <div className="content">
                1회 체험 레슨은 2~3만원대 낮은 금액으로 PT를 체험해볼 수 있는
                서비스입니다.
                <br />
                <br />
                PT 등록 전 1회 체험 수업을 통해 코치님과 한번 운동해보고, PT
                등록을 고민해 보세요 !
                <br />
              </div>
            </div>
          </div>
          <div className="faqList">
            <div className="faqTitle" onClick={() => toggleCollapse(8)}>
              <div className="title">
                TMP에 올려진 센터 정보들에 대해 법적 문제가 없나요?
              </div>
              <div>
                {activeIndex === 8 ? (
                  <IoIosArrowUp size={24} />
                ) : (
                  <IoIosArrowDown size={24} />
                )}
              </div>
            </div>
            <div
              className={`collapse ${activeIndex === 8 ? "show" : ""}`}
              ref={(el) => (contentRefs.current[8] = el)}
              style={{
                maxHeight:
                  activeIndex === 8
                    ? `${contentRefs.current[8]?.scrollHeight}px`
                    : "0",
                overflow: "hidden",
                transition: "max-height 0.3s ease-out",
              }}
            >
              <div className="content">
                1회 체험 레슨은 2~3만원대 낮은 금액으로 PT를 체험해볼 수 있는
                서비스입니다.
                <br />
                <br />
                PT 등록 전 1회 체험 수업을 통해 코치님과 한번 운동해보고, PT
                등록을 고민해 보세요 !
                <br />
              </div>
            </div>
          </div>
          <div className="faqList">
            <div className="faqTitle" onClick={() => toggleCollapse(9)}>
              <div className="title">센터 이름을 바꿀 수 있나요?</div>
              <div>
                {activeIndex === 8 ? (
                  <IoIosArrowUp size={24} />
                ) : (
                  <IoIosArrowDown size={24} />
                )}
              </div>
            </div>
            <div
              className={`collapse ${activeIndex === 9 ? "show" : ""}`}
              ref={(el) => (contentRefs.current[9] = el)}
              style={{
                maxHeight:
                  activeIndex === 9
                    ? `${contentRefs.current[9]?.scrollHeight}px`
                    : "0",
                overflow: "hidden",
                transition: "max-height 0.3s ease-out",
              }}
            >
              <div className="content">
                1회 체험 레슨은 2~3만원대 낮은 금액으로 PT를 체험해볼 수 있는
                서비스입니다.
                <br />
                <br />
                PT 등록 전 1회 체험 수업을 통해 코치님과 한번 운동해보고, PT
                등록을 고민해 보세요 !
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqCoach;
