import { React, useState, useEffect} from "react";
import "./Coachinfo.scss";
import { SlMagnifier } from "react-icons/sl";
import CenterSearchModal from "./CenterSearch";

const Coachinfo = () => {
  const [coachData, setCoachData] = useState({
    name: "",
    type: "",
    email: "",
    center: "",
    phonenumber: "",
    center_id: "",
    user_id: ""
  });
  console.log(coachData)
  const [centerKeyword, setCenterKeyword] = useState({center: ""});
  const [modalOpen, setModalOpen] = useState(false);
  const [centerData, setCenterData] = useState([])
  console.log(centerKeyword)
  const showModal = () => {
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

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setCoachData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const centerKeywordHandler = (e) => {
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

  const UpdateHandler = (e) => {
    e.preventDefault();
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
        return alert("Info updated successfully");
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
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

  return (
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
        <label htmlFor="coach_info_img_upload" className="coach_info_img">
          <img alt="coach_info_img" className="coach_info_img_1"></img>
          <div className="coach_info_img_text">프로필 사진 변경</div>
          <input
            id="coach_info_img_upload"
            type="file"
            name="coach_img"
          ></input>
        </label>
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
              onChange={inputHandler}
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
              <button name="type" value="헬스" type="button" onClick={inputHandler} className={coachData.type === '헬스'? 'active' : ''}>
                헬스
              </button>
              <button name="type" value="필라테스" type="button" onClick={inputHandler} className={coachData.type === '필라테스'? 'active' : ''}>
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
              onChange={inputHandler}
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
                onChange={centerKeywordHandler}
                onClick={resetInput}
              ></input>
              <SlMagnifier
                size={20}
                className="coach_info_center_find"
                onClick={showModal}
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
                onChange={inputHandler}
              />
              <button id="coach_info_phone_send" type="submit">
                인증번호 발송
              </button>
            </div>
          </div>
        </div>
        <div className="coach_info_hr_container">
          <hr className="coach_info_hr2" />
        </div>
        <div className="coach_info_input_container">
          <div className="coach_info_button">
            <button type="submit">정보 업데이트</button>
          </div>
          <div className="coach_info_cancle">회원 탈퇴</div>
        </div>
      </div>
    </form>
  );
};

export default Coachinfo;
