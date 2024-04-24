import React from 'react';

const IntroImgEdit = () => {
    return (
        <div>
        <div className="introEdit_container">
          <div className="subtitle">
            <p>트레이너님 및 레슨방식을 잘 보여주는 사진을 추가해주세요.</p>
          </div>
          <div className="precautions_wrap">
            <ul>
              <li>맨 첫장이 대표사진(프로필)으로 설정됩니다.</li>
              <li>최소 3장의 사진이 있어야 페이지 게시 가능합니다.</li>
            </ul>
          </div>
          <div className="Edit_content_wrap">
            <div className="introEdit_photos"></div>
            <button className="introEdit_photo_btn">사진 추가하기</button>
          </div>
        </div>
      </div>
    );
};

export default IntroImgEdit;