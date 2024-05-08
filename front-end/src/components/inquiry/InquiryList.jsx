import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./InquiryList.scss";
import { CgCloseO } from "react-icons/cg";
import { BsArrowReturnRight } from "react-icons/bs";

const InquiryList = () => {
  const location = useLocation();
  const [password, setPassword] = useState({ password: "" });
  const [inquiryList, setInquiryList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = inquiryList.slice(firstItemIndex, lastItemIndex);
  const [answerState, setAnswerState] = useState(currentItems.map(() => false));
  console.log(answerState)
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const newPassword = location.state.responseData[0].inquiry_password;
    console.log(newPassword);
    setPassword({ password: newPassword }); // Update state
  }, [location.state.responseData]);

  useEffect(() => {
    if (!password) return;

    fetch("http://localhost:5000/servicecenter/inquirylist", {
      //요청지
      method: "POST", //메소드 지정
      headers: {
        //데이터 타입 지정
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(password), //실제 데이터 파싱해서 body에 저장
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setInquiryList(data);
        window.scrollTo({ top: 0 });
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  }, [password]);
  console.log(inquiryList);

  const convertToLocalTime = (utcDate) => {
    const date = new Date(utcDate);
    return date.toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul',
      year: 'numeric', month: 'numeric', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
     });
  };
  const deleteInquiry = (index) => {
    const confirmResult = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmResult) {
      fetch("http://localhost:5000/servicecenter/deleteinquirylist", {
        //요청지
        method: "POST", //메소드 지정
        headers: {
          //데이터 타입 지정
          Accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify(inquiryList[index]), //실제 데이터 파싱해서 body에 저장
      })
        .then((response) => {
          console.log(response);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(() => {
          const updatedList = [...inquiryList]; // 현재 리스트 복사
          updatedList.splice(index, 1);// index 위치의 요소를 제거

          const updatedAnswerState = answerState.filter((_, i) => i !== index);

          setInquiryList(updatedList);
          setAnswerState(updatedAnswerState); // 상태 업데이트
          window.scrollTo({ top: 0 });
        })
        .catch((error) => {
          console.error(
            "There was a problem with your fetch operation:",
            error
          );
        });
    } else return;
  };

  const toggleAnswerVisibility = (index) => {
    if (inquiryList[index].inquiry_answer) {
      setAnswerState((prevState) => {
        const newState = [...prevState];
        newState[index] = !newState[index];
        return newState;
      });
    } else return alert("아직 답변이 등록되지 않았습니다.");
  };
  return (
    <div className="inquiryList">
    {currentItems.map((item, index) => (
      <div style={{ display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "flex-end"}} key={item.inquiry_id}>
      <div className="inquiryItem">
        <div className="inquiryDetails" onClick={() => toggleAnswerVisibility(index)}>
          {inquiryList[index].inquiry_answer? <span className="inquiryType">{item.inquiry_type} <span className="answer_state">(답변완료)</span></span> : <span className="inquiryType">{item.inquiry_type} <span className="answer_state">(답변대기중)</span></span>}
          <span className="inquiryContents">{item.inquiry_contents}</span>
          <span className="inquiryDate">{convertToLocalTime(item.register_date)}</span>
          <CgCloseO
            className="inquiryClose"
            onClick={(e) => {
              e.stopPropagation();
              deleteInquiry(index);
            }}
          />
        </div>
      </div>
      {answerState[index] && (
        <div className="answer_container">
        <BsArrowReturnRight style={{fontSize: "20px"}} />
        <div className="answer_inquiryItem">
          <div className="answer_inquiryDetails"> 
            <span className="inquiryType">관리자 답변</span>
            <span className="inquiryContents">
              {item.inquiry_answer}
            </span>
            <span className="inquiryDate">{convertToLocalTime(item.inquiry_answer_date)}</span>
          </div>
        </div>
        </div>
      )}
      </div>
    ))}
    <div className="pageNumbers">
      {Array.from(
        { length: Math.ceil(inquiryList.length / itemsPerPage) },
        (_, i) => i + 1
      ).map((number) => (
        <button key={number} onClick={() => paginate(number)}>
          {number}
        </button>
      ))}
    </div>
  </div>
  );
};

export default InquiryList;
