import React, {useState} from 'react';
import "./AnswerInquiry.scss"
import {useLocation, useNavigate} from "react-router-dom"
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const AnswerInquiry = (index) => {

const location = useLocation()
const navigate = useNavigate()
console.log(location.state.inquiry)
const [inquiryAnswer, setInquiryAnswer] = useState({inquiry_answer: ""})

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

const answerHandler = (e) => {
    const {name, value} = e.target
    setInquiryAnswer((prev) => {
        return {...prev, [name] : value}
    })
}
const SubmitHandler = (e) => {
    e.preventDefault()

    const inquiryData = {
        inquiry_id: location.state.inquiry.inquiry_id,
        inquiry_answer: inquiryAnswer.inquiry_answer
    };
    if(inquiryAnswer.inquiry_answer){
        fetch('http://localhost:5000/servicecenter/inquirylist/answer', {  //요청지
            method: 'POST',        //메소드 지정
            headers: {            //데이터 타입 지정
                'Accept' : 'application/json',
                'content-type' : 'application/json'
            },
            body: JSON.stringify(inquiryData)  //실제 데이터 파싱해서 body에 저장
        })
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            Toast.fire({
                icon: 'success',
                title: '답변이 완료되었습니다.'
            })
        })
        .then(() => {
            setTimeout(() => {
                navigate('/servicecenter/inquirylist/admin');
                window.scrollTo({top: 0});
            }, 1500);
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
    })}
    else{
        Toast.fire({
            icon: 'error',
            title: '답변을 입력해주세요!'
          })
    }
    }

    return (
        <div className='answer_inquiry_flex'>
            <form onSubmit={(e)=>{SubmitHandler(e)}}>
            <div className='inquiry_wrapper'>
                <div className='box'>
                    <div className='inquiry_title_container'>1:1 문의 답변</div>
                </div>
                <div className='box'>
                    <div className='inquiry_type_phone_container'>
                        <div className='inquiry_type_container'>
                            <div className='inquiry_type_title'>
                                문의유형<span className='aster'>*</span>
                            </div>
                            <div className='inquiry_type'>
                                <select className='inquiry_select_type' name="inquiry_type" id="type" disabled value={location.state.inquiry.inquiry_type} style={{cursor: "not-allowed"}}>
                                    <option value="">유형선택</option>
                                    <option value="일반문의">일반문의</option>
                                    <option value="센터 정보 등록요청">센터 정보 등록요청</option>
                                    <option value="코치 가입문의">코치 가입문의</option>
                                    <option value="오류 신고">오류 신고</option>
                                    <option value="기타">기타</option>
                                </select>
                            </div>
                        </div>
                        <div className='inquiry_phone_container'>
                            <div className='inquiry_phone_title'>
                                문의 조회시 사용한 비밀번호<span className='aster'>*</span>
                            </div>
                            <div className='inquiry_password'>
                                <input type="text" name='inquiry_password' placeholder='필수 입력' disabled value={location.state.inquiry.inquiry_password} style={{cursor: "not-allowed"}}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='box'>
                    <div className='inquiry_contents_title'>
                        답변<span className='aster'>*</span>
                    </div>
                    <div className='inquiry_contents'>
                        <textarea name="inquiry_answer" placeholder='필수 입력' maxLength='255' value={inquiryAnswer.inquiry_answer} onChange={answerHandler} ></textarea>
                    </div>
                </div>
                <div className='box'>
                    <div className='answer_button_container'>
                        <div className='answer_button'>
                            <button type='submit' className='button'>답변완료</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    );
};

export default AnswerInquiry;