import React from "react";
import "./FilterList.css";

const FilterList = (props) => {
  return (
    <div className="FilterList">
      <div className="searchHelper">
        <div
          onClick={() => {
            props.setFilter(true);
          }}
        >
          <img
            src="img/arrow-go-back-fill.svg"
            style={{ width: "24px", cursor: "pointer" }}
          />
        </div>
        <div
          style={{ fontSize: "15px", fontWeight: "bolder", cursor: "pointer" }}
        >
          필터 초기화
        </div>
      </div>
      <hr />
      <div className="filterSort">
        <div className="SORT">정렬</div>
        <div className="sort">
          <div className="defaultSort">
            <input type="radio" name="sort" id="defaultSort" /> 기본순
          </div>
          <div className="meterSort">
            <input type="radio" name="sort" id="meterSort" />
            거리순
          </div>
          <div className="starSort">
            <input type="radio" name="sort" id="starSort" />
            별점순
          </div>
        </div>
      </div>
      <div className="searchRound">
        <div className="searchRoundTitle">
          <div>검색반경</div>
          <div>NNNm 이내</div>
        </div>
        <div>
          <progress value="50" max="100"></progress>
        </div>
        <div className="meter">
          <div>NNNm</div>
          <div>Nkm</div>
        </div>
      </div>
      <div className="priceRound">
        <div className="priceRoundTitle">
          <div>가격</div>
          <div>4만원 이내</div>
        </div>
        <div>
          <progress value="50" max="200"></progress>
        </div>
        <div className="price">
          <div>4만원</div>
          <div>20만원</div>
        </div>
      </div>
      <div className="genderBox">
        <div className="GENDER">성별</div>
        <div className="genderCheck">
          <div>
            <input type="radio" name="gender" id="all" />
            전체
          </div>
          <div>
            <input type="radio" name="gender" id="female" />
            여성
          </div>
          <div>
            <input type="radio" name="gender" id="male" />
            남성
          </div>
        </div>
      </div>
      <div className="comfort">
        <div>이용편의</div>
        <div className="comfortBox">
          <div>운동복 대여</div>
          <div>무료주차</div>
          <div>개인 락커</div>
        </div>
      </div>
      <div className="btn_area">
        <button id="filterBtn">필터 적용하기</button>
      </div>
    </div>
  );
};

export default FilterList;
