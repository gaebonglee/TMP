import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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
    <div>
      {inquiryList.map((list, index) => {
        return (
          <div className="inquiryMain_contents_container" key={index}>
            <table className="inquiryMain_contents_table">
              <tr>
                <th className="inquiryMain_type">문의 유형</th>
                <th className="inquiryMain_contents">문의 내용</th>
                <th className="inquiryMain_date">등록 날짜</th>
              </tr>
              <tr>
                <td>{list.inquiry_type}</td>
                <td>{list.inquiry_contents}</td>
                <td>{convertToLocalTime(list.register_date)}</td>
              </tr>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default InquiryList;
