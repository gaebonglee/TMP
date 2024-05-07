import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./InquiryList.scss"

const InquiryList = () => {
  const location = useLocation();
  const [password, setPassword] = useState({ password: "" });
  const [inquiryList, setInquiryList] = useState([]);

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
    date.setHours(date.getHours() + 9);
    return date.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
  };

  return (
    <div className="inquiryList">
      {inquiryList.map((item, index) => (
        <div className="inquiryItem" key={index}>
          <div className="inquiryDetails">
            <span className="inquiryType">{item.inquiry_type}</span>
            <span className="inquiryContents">{item.inquiry_contents}</span>
            <span className="inquiryDate">{convertToLocalTime(item.register_date)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InquiryList;
