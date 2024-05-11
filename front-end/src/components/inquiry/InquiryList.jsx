import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./InquiryList.scss";
import { CgCloseO } from "react-icons/cg";
import { BsArrowReturnRight } from "react-icons/bs";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

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
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    iconColor: 'white',
    customClass: {
        popup: 'colored-toast',
      },
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

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

    Swal.fire({
      title: "정말로 삭제하시겠습니까?",
      showDenyButton: true,
      confirmButtonText: "네",
      denyButtonText: `아니오`,
      confirmButtonColor: "#a2ee94",
      denyButtonColor: "#ff0000",
      focusConfirm: false,
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
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
            // 동일로직이지만 filter로도 구현가능
            setInquiryList(updatedList);
            setAnswerState(updatedAnswerState); // 상태 업데이트
            window.scrollTo({ top: 0 });
            Toast.fire({
              icon: 'success',
              title: '삭제되었습니다.'
            });
          })
          .catch((error) => {
            console.error(
              "There was a problem with your fetch operation:",
              error
            );
          });
      }
      else return;
    })
  };

  const toggleAnswerVisibility = (index) => {
    if (inquiryList[index].inquiry_answer) {
      setAnswerState((prevState) => {
        const newState = [...prevState];
        newState[index] = !newState[index];
        return newState;
      }); 
    } else return Toast.fire({
      icon: 'error',
      title: '답변이 등록되지 않았습니다.'
    });
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
