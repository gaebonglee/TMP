import React from 'react';
import "./InquiryPassword.scss"
import { useState } from 'react';
import { CgCloseO } from "react-icons/cg";
import {useNavigate} from 'react-router-dom'

const InquiryPassword = () => {

const navigate = useNavigate();
const [password, setPassword] = useState({password: ""})
const passwordHandler = (e) => {
    const {name, value} = e.target
    setPassword((prev) => {
        return {...prev, [name] : value}
    })
}
const passwordButtonHandler = async() => {
    const response = await fetch('http://localhost:5000/servicecenter/inquirypassword', {  //요청지
        method: 'POST',        //메소드 지정
        headers: {            //데이터 타입 지정
            'Accept' : 'application/json',
            'content-type' : 'application/json'
        },
        body: JSON.stringify(password)  //실제 데이터 파싱해서 body에 저장
    })
    const responseData = await response.json();
    
   
        if(responseData.length === 0){
            alert('비밀번호가 일치하지 않습니다.')
            setPassword({password: ""})
        }
        else{
        alert('문의내역으로 이동합니다.')
        navigate('/servicecenter/inquirylist',{ state: {responseData}})
        window.scrollTo({top: 0})
        }
}

const closeModal = () => {
    navigate('/servicecenter')
}
console.log(password)

    return (
        <div className='password_modal_background'>
            <div className='password_modal'>
                <div className='password_text'>
                    <h3>문의시 설정했던</h3>
                    <h3>비밀번호를 입력하세요.</h3>
                </div>
                <div className='password_input_container'>
                    <input className='password_input' type='password' placeholder='비밀번호를 입력해주세요' value= {password.password} name= "password" onChange={passwordHandler}/>
                    <button className='password_button' type='button' onClick={passwordButtonHandler}>확인</button>
                </div>
                <CgCloseO size={25} className='close_password_Modal' onClick={closeModal}/>
            </div>
        </div>
    );
};

export default InquiryPassword;