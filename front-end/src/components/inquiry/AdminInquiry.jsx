import React, {useState, useEffect} from 'react';
import "./AdminInquiry.scss"
import { CgCloseO } from "react-icons/cg";
import {useNavigate} from 'react-router-dom'

const AdminInquiry = () => {

const [inquiryList, setInquiryList] = useState([])
const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage] = useState(5);
const lastItemIndex = currentPage * itemsPerPage;
const firstItemIndex = lastItemIndex - itemsPerPage;
const currentItems = inquiryList.slice(firstItemIndex, lastItemIndex);
const navigate = useNavigate()

const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {
    fetch("http://localhost:5000/servicecenter/inquirylist/admin")
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setInquiryList(data)
        window.scrollTo({ top: 0 });
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  }, []);

  const convertToLocalTime = (utcDate) => {
    const date = new Date(utcDate);
    return date.toLocaleString('ko-KR', { 
    timeZone: 'Asia/Seoul',
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
     });
  };

  const deleteInquiry = (index) => {
    const confirmResult = window.confirm('정말로 삭제하시겠습니까?')
    if(confirmResult) {
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
        updatedList.splice(index, 1); // index 위치의 요소를 제거
        setInquiryList(updatedList); // 상태 업데이트
        window.scrollTo({ top: 0 });
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
    }
    else return
  }
  const answerInquiry = (index) => {
    console.log(currentItems[index])
    navigate('/servicecenter/inquirylist/answer',{ state: {inquiry: currentItems[index]}})
  }
  return (
    <>
    <h1 style={{textAlign: "center", color: "rgb(60, 60, 60)"}}>고객 문의내역</h1>
    <div className="inquiryList">
      {currentItems.map((item, index) => (
        <div className="inquiryItem inquiryItemClick" key={index} onClick={() => {answerInquiry(index)}}>
          <div className="AdmininquiryDetails">
            <div>
              <div className="Inquiry_label">문의유형</div>
              {currentItems[index].inquiry_answer? <span className="inquiryType">{item.inquiry_type} <span className="answer_state">(답변완료)</span></span> : <span className="inquiryType">{item.inquiry_type} <span className="answer_state">(답변대기중)</span></span>}
            </div>
            <div>
              <div className="Inquiry_label">내용</div>
              <span className="inquiryContents">{item.inquiry_contents}</span>
            </div>
            <div>
              <div className="Inquiry_label">문의시 설정한 비밀번호</div>
              <span className="inquiryPassword">{item.inquiry_password}</span>
            </div>
            <div>
              <div className="Inquiry_label">등록날짜</div>
              <span className="inquiryDate">{convertToLocalTime(item.register_date)}</span>
            </div>
            <CgCloseO className="adminInquiryClose" onClick={() => {deleteInquiry(index)}}/>
          </div>
        </div>
      ))}
      <div className="pageNumbers">
        {Array.from({ length: Math.ceil(inquiryList.length / itemsPerPage) }, (_, i) => i + 1)
          .map(number => (
            <button key={number} onClick={() => paginate(number)}>
              {number}
            </button>
          ))}
      </div>
    </div>
    </>
  );
};

export default AdminInquiry;