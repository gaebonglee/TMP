import React from "react";

const ProgramEdit = ({ content, setContent }) => {
  const handleInputChange = (e) => {
    setContent(e.target.value);
  };

  const ProgramEdit = () => {
    return (
      <div className="programEdit_container">
        <div className="subtitle">
          <p>트레이닝 분야 및 방법에 대해 자세히 작성해주세요.</p>
        </div>
        <div className="precautions_wrap">
          <ul>
            <li>자세한 프로그램 및 전문분야 내용이 큰 신뢰를 줄 수 있어요.</li>
            <li>사진 변경 후 '사진 저장하기' 버튼을 눌러 저장해주세요.</li>
          </ul>
        </div>
        <button className="add_program_btn">프로그램 추가하기</button>
        <div className="tableWrap">
          <div className="programEdit_table">
            <div className="programEdit_status">
              <button className="black" />
              삭제
              <button className="green" />
              게시요청
            </div>
            <div className="programEdit_input_title">
              <p />
              프로그램 제목을 작성해주세요.
              <input
                type="text"
                placeholder="제목을 입력해주세요."
                maxLength={40}
              />
            </div>
            <div className="programEdit_speciality">
                <p/>프로그램의 전문 분야를 선택해주세요. (1~3개)
                <div className="speciality_btn">식단관리</div>ㄴ
                <div className="speciality_btn">식단관리</div>
                <div className="speciality_btn">식단관리</div>
                <div className="speciality_btn">식단관리</div>
                <div className="speciality_btn">식단관리</div>
                <div className="speciality_btn">식단관리</div>
                <div className="speciality_btn">식단관리</div>
                <div className="speciality_btn">식단관리</div>
            </div>
            <div className="programEdit_add_photo">
                <p>참고 사진을 올릴 수 있어요.(선택)</p>
            </div>
            <div className="programEdit_text">
                <p>내용을 상세히 작성해주세요.</p>
                <textarea placeholder="내용을 입력해주세요."/>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default ProgramEdit;
