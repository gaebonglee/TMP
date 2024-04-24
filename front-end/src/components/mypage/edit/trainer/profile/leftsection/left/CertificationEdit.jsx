import React from "react";

const CertificationEdit = ({ content, setContent }) => {
  return (
    <div className="certificationEdit_container">
      <div className="subtitle">
        <p>트레이너님 및 레슨방식을 잘 보여주는 사진을 추가해주세요.</p>
      </div>
      <div className="precautions_wrap">
        <ul>
          <li>증명서 또는 관련 사진이 확인된 후 게시됩니다.</li>
          <li>항목 작성 후 게시요청 해주세요.</li>
          <li>
            승인 또는 반려 관련하여 트레이너님께 직접 연락드릴 수 있습니다.
          </li>
          <li>
            트레이너 페이지에는 항목 형식에 따라 자동 순서대로 보여집니다.
          </li>
        </ul>
      </div>
      <button className="add_certification_btn">자격항목 추가하기</button>
      <div className="tableWrap">
        <div className="certificationEdit_table">
          <div className="certificationEdit_status">
            <button className="black" />
            삭제
            <button className="green" />
            게시요청
          </div>
          <div className="certificationEdit_input">
            <select className="certification_type">
              <option value={1}>자격증</option>
              <option value={2}>수상경력</option>
            </select>
            <input
              placeholder="내용을 입력해주세요"
              type="text "
              maxLength={80}
            ></input>
          </div>
          <button className="certificationEdit_add_photo" />
          증명서 사진 업로드
        </div>
      </div>
    </div>
  );
};

export default CertificationEdit;
