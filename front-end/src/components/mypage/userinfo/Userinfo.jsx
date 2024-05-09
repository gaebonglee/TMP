import React, {useState, useEffect } from 'react';
import './Userinfo.scss';
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const Userinfo = () => {

const [userData, setUserData] = useState({name: "", email: "", phonenumber: "", user_roles:"", user_id: "", certification: ""})
const [showCertificateButton, setShowCertificateButton] = useState(false);
const [certificateNumber, setCertificateNumber] = useState(null)
const [certificateStatus, setCertificateStatus] = useState(false)
const [shouldNavigate, setShouldNavigate] = useState(false)

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
    setUserData((prev)=>{
        return {...prev, [name] : value}
    })
}

useEffect(() => {
    const checkSession = async () => {
        try {
            const response = await fetch('http://localhost:5000/session/checkSession', {
                credentials: 'include' // 교차 출처 호출 시 인증 정보 전송
            });
            const sessionData = await response.json()
            const selectResponse = await fetch('http://localhost:5000/mypage/selectUserinfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sessionData),
                credentials: 'include'
            });
            const selectData = await selectResponse.json();
            console.log(selectData)
            setUserData((prev)=>{
                return{...prev, name: selectData[0].user_name, email: selectData[0].email, phonenumber: selectData[0].phonenumber, user_id: selectData[0].user_id}
            })
        } catch (error) {
            console.error('Error:', error);
        }
    };

    checkSession()
    

}, []);

const navigate = useNavigate()
useEffect(()=>{
    if(shouldNavigate){
      navigate('/');
    }
  },[shouldNavigate, navigate])

const UpdateHandler = (e) => {
    e.preventDefault();
    if(certificateStatus){
    fetch('http://localhost:5000/mypage/selectUserinfo', {  //요청지
        method: 'POST',        //메소드 지정
        headers: {            //데이터 타입 지정
            'Accept' : 'application/json',
            'content-type' : 'application/json'
        },
        body: JSON.stringify(userData)  //실제 데이터 파싱해서 body에 저장
    })
    .then(response => {
        console.log(response)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        setUserData((prev)=>{
           return {...prev, name: data[0]?.name, email: data[0]?.email, phonenumber: data[0]?.phonenumber, user_id: data[0]?.user_id }
        })
        Toast.fire({
            icon: 'success',
            title: '업데이트가 완료되었습니다.'
          })
    })
    .then(() => {
        setTimeout(() => {
        setShouldNavigate(true)
        }, 1500)
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
});
    }
    else{
        Toast.fire({
            icon: 'error',
            title: '휴대폰 인증절차를 완료해주세요.'
          })
    }
};

const GenerateSixDigitNumber = () => {
    return Math.floor(Math.random() * 900000 + 100000);
  }

  const ButtonClickHandler = async () => {
    setShowCertificateButton(true)

    const randomNumber = GenerateSixDigitNumber();
    setCertificateNumber(randomNumber)

    const response = await fetch('http://localhost:5000/mypage/certification', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ certificateNumber: randomNumber, phonenumber: userData.phonenumber })
        });
        const data = await response.json();
        console.log('Response:', data);
  }
  const CheckNumber = () => {
    if(certificateNumber === parseInt(userData.certification)){
      setCertificateStatus(true)
      return Toast.fire({
        icon: 'success',
        title: '번호 인증이 완료되었습니다.'
      })
    }
    else{
      return Toast.fire({
        icon: 'error',
        title: '인증번호가 틀렸습니다. 다시 시도해주세요.'
      })
    }
  }

    return (
    <div className='wrapper'>
        <form onSubmit={(e) => {UpdateHandler(e)}}>    
            <div className='user_info_container'>
                <div className='user_info_tab'>
                    <div className='user_info_title'>기본정보</div>
                </div>
                <div className='user_info_hr_container'>
                <hr className='user_info_hr_top'/>
                </div >
                <div className='user_info_hr_container'>
                <hr className='user_info_hr'/>
                </div>
                <div className='user_info_input_container'>
                    <div className='user_info_name'>
                        <div className='label_container'>
                            <label>
                                이름
                                <span className='aster'>*</span>
                            </label>
                        </div>
                        <input type="text" name="name" placeholder='필수 입력' value={userData.name} onChange={InputHandler}></input>
                    </div>
                    <div className='user_info_email'>
                        <div className='label_container'>
                            <label>이메일</label>
                        </div>
                        <input type="email" name="email" placeholder='선택 입력' value={userData.email} onChange={InputHandler}></input>
                    </div>
                    <div className='user_info_phone'>
                        <div className='label_container'>
                            <label>휴대폰 번호
                                <span className='aster'>*</span>
                            </label>
                        </div>
                        <div className='user_info_phone_input_container'>
                            <input type="text" name="phonenumber" placeholder="-없이 입력" value={userData.phonenumber} onChange={InputHandler}/>
                            <button id='user_info_phone_send' type='button'onClick={ButtonClickHandler}>인증번호 발송</button>
                        </div>
                    </div>
                    {showCertificateButton && 
            <div className="user_info_phone">
                <div className="label_container">
                <label>
                    인증번호 6자리
                    <span className="aster">*</span>
                </label>
                </div>
                <div className="user_info_phone_input_container">
                <input
                    type="text"
                    name="certification"
                    placeholder="인증번호를 입력해주세요"
                    value={userData.certification}
                    onChange={InputHandler}
                    maxLength="6"
                />
                <button id="user_info_phone_send" type="button" onClick={CheckNumber}>
                    인증하기
                </button>
                </div>
            </div>}
                </div>
                <div className='user_info_hr_container'>
                <hr className='user_info_hr2'/>
                </div> 
                <div className='user_info_input_container'>
                    <div className='user_info_button'>
                        <button type='submit'>정보 업데이트</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
    );
}

export default Userinfo;