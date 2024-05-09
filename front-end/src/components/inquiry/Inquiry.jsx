import React from 'react';
import { useState } from 'react';
import "./Inquiry.scss"
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const Inquiry = () => {

const [inquiryData, setInquiryData] = useState({inquiry_type: "", inquiry_password: "", inquiry_contents: ""})
const [checkState, setCheckState] = useState(false)
const navigate = useNavigate()

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

const InputHandler = (e) => {
    const {name, value} = e.target
    setInquiryData((prev) => {
        return {...prev, [name]: value}
    })
}
const SubmitHandler = (e) => {
    e.preventDefault()
    if(inquiryData.inquiry_type && inquiryData.inquiry_password && inquiryData.inquiry_contents){
    fetch('http://localhost:5000/servicecenter/inquiry', {  //요청지
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
            title: '접수가 완료되었습니다.'
          });     
    })
    .then(() => {
        setTimeout(() => {
            navigate('/')
            window.scrollTo({top: 0})
        }, 1500);
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
})}
else{
    Toast.fire({
        icon: 'error',
        title: '접수가 완료된 후 클릭하세요.'
      });
}
}
console.log(inquiryData)
    return (
        <form onSubmit={(e)=>{SubmitHandler(e)}}>
            <div className='inquiry_wrapper'>
                <div className='box'>
                    <div className='inquiry_title_container'>1:1 문의 접수</div>
                </div>
                <div className='box'>
                    <div className='inquiry_type_phone_container'>
                        <div className='inquiry_type_container'>
                            <div className='inquiry_type_title'>
                                문의유형<span className='aster'>*</span>
                            </div>
                            <div className='inquiry_type'>
                                <select name="inquiry_type" id="type" onChange={InputHandler}>
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
                                문의 조회시 사용할 비밀번호<span className='aster'>*</span>
                            </div>
                            <div className='inquiry_password'>
                                <input type="password" name='inquiry_password' placeholder='필수 입력' value={inquiryData.inquiry_password} onChange={InputHandler}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='box'>
                    <div className='inquiry_contents_title'>
                        내용<span className='aster'>*</span>
                    </div>
                    <div className='inquiry_contents'>
                        <textarea name="inquiry_contents" value={inquiryData.inquiry_contents} placeholder='필수 입력' onChange={InputHandler} maxLength='255'></textarea>
                    </div>
                </div>
                <div className='box'>
                    <div className='inquiry_check_button_container'>
                        <div className='inquiry_checkbox'>
                            <input className='checkbox' type="checkbox" checked={checkState} onChange={() => {setCheckState(!checkState)}}/>
                            <div><span className='checkbox_text' onClick={() => {navigate('/privacyPolicy')}}>개인정보 수집 및 이용</span>에 동의합니다.</div>
                            <span className='highlight'>(필수)</span>
                        </div>
                        <div className='inquiry_button'>
                            {(!checkState) ? <button type='submit' className='button' disabled>접수하기</button> : <button type='submit' className='button'>접수하기</button>}
                            
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Inquiry;