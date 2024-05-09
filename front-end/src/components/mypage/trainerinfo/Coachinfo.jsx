import { React, useState, useEffect} from "react";
import "./Coachinfo.scss";
import { SlMagnifier } from "react-icons/sl";
import CenterSearchModal from "./CenterSearch";
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const Coachinfo = () => {
  const [coachData, setCoachData] = useState({
    name: "",
    type: "",
    email: "",
    center: "",
    phonenumber: "",
    center_id: "",
    user_id: "",
    certification: ""
  });
  console.log(coachData)
  const [centerKeyword, setCenterKeyword] = useState({center: ""});
  const [modalOpen, setModalOpen] = useState(false);
  const [centerData, setCenterData] = useState([])
  const [showCertificateButton, setShowCertificateButton] = useState(false);
  const [certificateNumber, setCertificateNumber] = useState(null)
  const [certificateStatus, setCertificateStatus] = useState(false)
  const [shouldNavigate, setShouldNavigate] = useState(false)
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

  const ShowModal = () => {
    setModalOpen(true);

    fetch("http://localhost:5000/mypage/searchCenter", {
      //요청지
      method: "POST", //메소드 지정
      headers: {
        //데이터 타입 지정
        'Accept': 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify(centerKeyword), //실제 데이터 파싱해서 body에 저장
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        console.log(result)
        setCenterData(result)
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  };

  const InputHandler = (e) => {
    const { name, value } = e.target;
    setCoachData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const CenterKeywordHandler = (e) => {
    const {name, value} = e.target;
    setCenterKeyword((prev) => {
      return {...prev, [name]: value}
    });
  };

  useEffect(() => {
    const checkSession = async () => {
        try {
            const response = await fetch('http://localhost:5000/session/checkSession', {
                credentials: 'include' // 교차 출처 호출 시 인증 정보 전송
            });
            const sessionData = await response.json()
            
            const selectResponse = await fetch('http://localhost:5000/mypage/selectCoachinfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sessionData),
                credentials: 'include'
            });
            const selectData = await selectResponse.json();
            console.log(selectData)
            setCoachData((prev)=>{
                return{...prev, name: selectData[0].user_name, type: selectData[0].trainning_type, email: selectData[0].email, center: selectData[0].center_name, center_id: selectData[0].center_id ,phonenumber: selectData[0].phonenumber, user_id: selectData[0].user_id}
              })
        } catch (error) {
            console.error('Error:', error);
        }
    };

    checkSession()
}, []);

useEffect(()=>{
  if(shouldNavigate){
    navigate('/');
  }
},[shouldNavigate, navigate])

  const UpdateHandler = (e) => {
    e.preventDefault()
    if(certificateStatus){
    fetch("http://localhost:5000/mypage/updateCoachinfo", {
      //요청지
      method: "POST", //메소드 지정
      headers: {
        //데이터 타입 지정
        "Accept": "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(coachData), //실제 데이터 파싱해서 body에 저장
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
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
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
    }
    else{
      Toast.fire({
        icon: 'error',
        title: '휴대폰 인증절차를 완료해주세요.'
      })
    }
  };

  const resetInput = () => {
    if (coachData.center) {  // 'true'를 명시적으로 검사할 필요 없이 직접 사용
      setCoachData((prev) => {
        return {...prev, center: ""}  // 'center'를 빈 문자열로 설정
      });
    }
    if(centerKeyword){
      setCenterKeyword((prev)=>{
        return {...prev, center: ""}
      })
    }
  }

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
            body: JSON.stringify({ certificateNumber: randomNumber, phonenumber: coachData.phonenumber })
        });
        const data = await response.json();
        console.log('Response:', data);
  }
  const CheckNumber = () => {
    if(certificateNumber === parseInt(coachData.certification)){
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
  
    <div className="wrapper">
      <form
        onSubmit={(e) => {
          UpdateHandler(e);
        }}
      >
        <div className="coach_info_container">
          <div className="coach_info_tab">
            <div className="coach_info_title">기본정보</div>
          </div>
          <div className="coach_info_hr_container">
            <hr className="coach_info_hr_top" />
          </div>
          <div className="coach_info_hr_container">
            <hr className="coach_info_hr" />
          </div>
          <div className="coach_info_input_container">
            <div className="coach_info_name">
              <div className="label_container">
                <label>
                  이름
                  <span className="aster">*</span>
                </label>
              </div>
              <input
                type="text"
                name="name"
                value={coachData.name}
                placeholder="필수 입력"
                onChange={InputHandler}
              ></input>
            </div>
            <div className="coach_info_trainning_type">
              <div className="label_container">
                <label>
                  지도 종목을 선택해주세요
                  <span className="aster">*</span>
                </label>
              </div>
              <div className="trainning_type_container">
                <button name="type" value="헬스" type="button" onClick={InputHandler} className={coachData.type === '헬스'? 'active' : ''}>
                  헬스
                </button>
                <button name="type" value="필라테스" type="button" onClick={InputHandler} className={coachData.type === '필라테스'? 'active' : ''}>
                  필라테스
                </button>
              </div>
            </div>
            <div className="coach_info_email">
              <div className="label_container">
                <label>이메일</label>
              </div>
              <input
                type="email"
                name="email"
                value={coachData.email}
                placeholder="선택 입력"
                onChange={InputHandler}
              ></input>
            </div>
            <div className="coach_info_center">
              <div className="label_container">
                <label>센터를 선택해주세요</label>
                <span className="aster">*</span>
              </div>
              <div className="coach_info_center_container">
                <input
                  type="text"
                  name="center"
                  value= {coachData.center === ""? centerKeyword.center : coachData.center}
                  placeholder="센터 이름을 검색하세요"
                  onChange={CenterKeywordHandler}
                  onClick={resetInput}
                ></input>
                <SlMagnifier
                  size={20}
                  className="coach_info_center_find"
                  onClick={ShowModal}
                />
                {modalOpen && <CenterSearchModal setModalOpen={setModalOpen} centerData={centerData} setCoachData = {setCoachData}/>}
              </div>
            </div>
            <div className="coach_info_phone">
              <div className="label_container">
                <label>
                  휴대폰 번호
                  <span className="aster">*</span>
                </label>
              </div>
              <div className="coach_info_phone_input_container">
                <input
                  type="text"
                  name="phonenumber"
                  value={coachData.phonenumber}
                  placeholder="-없이 입력"
                  onChange={InputHandler}
                />
                <button id="coach_info_phone_send" type="button" onClick={ButtonClickHandler}>
                  인증번호 발송
                </button>
              </div>
            </div>
            {showCertificateButton && 
            <div className="coach_info_phone">
              <div className="label_container">
                <label>
                  인증번호 6자리
                  <span className="aster">*</span>
                </label>
              </div>
              <div className="coach_info_phone_input_container">
                <input
                  type="text"
                  name="certification"
                  placeholder="인증번호를 입력해주세요"
                  value={coachData.certification}
                  onChange={InputHandler}
                  maxLength="6"
                />
                <button id="coach_info_phone_send" type="button" onClick={CheckNumber}>
                  인증하기
                </button>
              </div>
            </div>}
          </div>
          <div className="coach_info_hr_container">
            <hr className="coach_info_hr2" />
          </div>
          <div className="coach_info_input_container">
            <div className="coach_info_button">
              <button type="submit">정보 업데이트</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Coachinfo;
