import React, {useState, useEffect } from 'react';
import './Userinfo.scss';

const Userinfo = () => {

const [userData, setUserData] = useState({name: "", email: "", phonenumber: "", user_roles:"", user_id: ""})

const inputHandler = (e) => {
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

const UpdateHandler = (e) => {
    e.preventDefault();
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
        console.log(data);
        setUserData((prev)=>{
           return {...prev, name: data[0]?.name, email: data[0]?.email, phonenumber: data[0]?.phonenumbe, user_id: data[0]?.user_id }
        })
        return alert('Info updated successfully')
})
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
});
};


    return (
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
                    <input type="text" name="name" placeholder='필수 입력' value={userData.name} onChange={inputHandler}></input>
                </div>
                <div className='user_info_email'>
                    <div className='label_container'>
                        <label>이메일</label>
                    </div>
                    <input type="email" name="email" placeholder='선택 입력' value={userData.email} onChange={inputHandler}></input>
                </div>
                <div className='user_info_phone'>
                    <div className='label_container'>
                        <label>휴대폰 번호
                            <span className='aster'>*</span>
                        </label>
                    </div>
                    <div className='user_info_phone_input_container'>
                        <input type="text" name="phonenumber" placeholder="-없이 입력" value={userData.phonenumber} onChange={inputHandler}/>
                        <button id='user_info_phone_send' type='submit' >인증번호 발송</button>
                    </div>
                </div>
            </div>
            <div className='user_info_hr_container'>
            <hr className='user_info_hr2'/>
            </div> 
            <div className='user_info_input_container'>
                <div className='user_info_button'>
                    <button type='submit'>정보 업데이트</button>
                </div>
                <div className='user_info_cancle'>회원 탈퇴</div>
            </div>
        </div>
    </form>
    );
}

export default Userinfo;