import React, { useState } from "react";
import "./FilterList.scss";
import { RiArrowGoBackLine } from "react-icons/ri";

const FilterList = (props) => {
  const [value, setValue] = useState(500);
  const [priceValue, setPriceValue] = useState(4);

  const [comfort, setComfort] = useState([
    "운동복 대여",
    "무료주차",
    "개인 락커",
  ]);

  const handleChange = (event) => {
    setValue(Number(event.target.value));
  };
  function handleChangePrice(event) {
    setPriceValue(Number(event.target.value));
  }

  function handleClass(e) {
    e.target.classList.toggle("active");
    console.log(e.target.textContent);
  }

  return (
    <div className="FilterList">
      <div className="searchHelper">
        <div
          onClick={() => {
            props.setFilter(true);
          }}
        >
          <RiArrowGoBackLine size={20} color="#00491e" cursor={"pointer"} />
        </div>
        <div
          style={{ fontSize: "15px", fontWeight: "bolder", cursor: "pointer" }}
          onClick={() => {}}
        >
          필터 초기화
        </div>
      </div>
      <hr />
      <div className="filterSort">
        <div className="SORT">정렬</div>
        <div className="sort">
          <div className="defaultSort">
            <input type="radio" name="sort" id="defaultSort" defaultChecked />
            기본순
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
          <div>{value}m 이내</div>
        </div>
        <div>
          <input
            type="range"
            name=""
            id="searchRangeBar"
            max={3000}
            min={500}
            step={500}
            onChange={handleChange}
          />
        </div>
        <div className="meter">
          <div>500m</div>
          <div>3km</div>
        </div>
      </div>
      <div className="priceRound">
        <div className="priceRoundTitle">
          <div>가격</div>
          <div>{priceValue}만원 이내</div>
        </div>
        <div>
          <input
            type="range"
            name=""
            id="priceRangeBar"
            min={4}
            max={20}
            step={1}
            onChange={handleChangePrice}
          />
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
            <input type="radio" name="gender" id="all" defaultChecked />
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
          {[...comfort].map((comfort, index) => (
            <div key={index} className="round_box" onClick={handleClass}>
              {comfort}
            </div>
          ))}
        </div>
      </div>
      <div className="btn_area">
        <button id="filterBtn">필터 적용하기</button>
      </div>
    </div>
  );
};

export default FilterList;
