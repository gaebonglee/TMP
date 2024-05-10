import React, { useState } from "react";
import "./FilterList.scss";
import { RiArrowGoBackLine } from "react-icons/ri";

const FilterList = (props) => {
  const {
    currentLatitude,
    currentLongitude,
    setTrainers,
    setFilter,
    setIsloading,
    trainers,
  } = props;

  const [value, setValue] = useState(500);
  const [priceValue, setPriceValue] = useState(4);
  const [comfort, setComfort] = useState([
    "운동복 대여",
    "무료주차",
    "개인 락커",
  ]);
  const [filterData, setFilterData] = useState({
    meter: 500,
    price: 4,
    comfort: [],
    gender: "m",
    sort: "defaultSort",
    latitude: currentLatitude,
    longitude: currentLongitude,
  });

  console.log(filterData);
  const handleChange = (event) => {
    setValue(Number(event.target.value));
    setFilterData((prevFilterData) => ({
      ...prevFilterData,
      meter: Number(event.target.value),
    }));
  };

  const handleChangePrice = (event) => {
    setPriceValue(Number(event.target.value));
    setFilterData((prevFilterData) => ({
      ...prevFilterData,
      price: Number(event.target.value),
    }));
  };

  const handleClass = (event) => {
    event.target.classList.toggle("active");
    const item = event.target.textContent;
    setFilterData((prevFilterData) => ({
      ...prevFilterData,
      comfort: prevFilterData.comfort.includes(item)
        ? prevFilterData.comfort.filter((c) => c !== item)
        : [...prevFilterData.comfort, item],
    }));
  };

  const handleReset = () => {
    setValue(500);
    setPriceValue(4);
    setComfort(["운동복 대여", "무료주차", "개인 락커"]);
    setFilterData({
      meter: 500,
      price: 4,
      comfort: [],
      gender: "m",
      sort: "defaultSort",
      latitude: currentLatitude,
      longitude: currentLongitude,
    });
  };

  const handleFilter = () => {
    fetch("http://localhost:5000/filter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filterData),
    })
      .then((res) => res.json())
      .then((data) => {
        setFilter(true);
        setTrainers(data);
        props.setFilter(true);
      });
  };

  const handleSortChange = (event) => {
    setFilterData((prevFilterData) => ({
      ...prevFilterData,
      sort: event.target.id,
    }));
  };

  return (
    <div className="FilterList">
      <div className="searchHelper">
        <div onClick={() => props.setFilter(true)}>
          <RiArrowGoBackLine size={20} color="#00491e" cursor="pointer" />
        </div>
        <div
          style={{ fontSize: "15px", fontWeight: "bolder", cursor: "pointer" }}
          onClick={handleReset}
        >
          필터 초기화
        </div>
      </div>
      <hr />
      {/* <div className="filterSort">
        <div className="SORT">정렬</div>
        <div className="sort">
          <div className="defaultSort">
            <label>
              <input
                type="radio"
                name="sort"
                id="defaultSort"
                onChange={handleSortChange}
                checked={filterData.sort === "defaultSort"}
              />
              기본순
            </label>
          </div>
          <div className="meterSort">
            <label>
              <input
                type="radio"
                name="sort"
                id="meterSort"
                onChange={handleSortChange}
                checked={filterData.sort === "meterSort"}
              />
              거리순
            </label>
          </div>
          <div className="starSort">
            <label>
              <input
                type="radio"
                name="sort"
                id="starSort"
                onChange={handleSortChange}
                checked={filterData.sort === "starSort"}
              />
              별점순
            </label>
          </div>
        </div>
      </div> */}
      <div className="searchRound">
        <div className="searchRoundTitle">
          <div>검색반경</div>
          <div>{value}m 이내</div>
        </div>
        <div>
          <input
            type="range"
            id="searchRangeBar"
            max={3000}
            min={500}
            step={500}
            onChange={handleChange}
            value={value}
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
            id="priceRangeBar"
            min={4}
            max={20}
            step={1}
            onChange={handleChangePrice}
            value={priceValue}
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
          {/* <label>
            <input
              type="radio"
              name="gender"
              checked={filterData.gender === "all"}
              onChange={() => setFilterData({ ...filterData, gender: "all" })}
            />
            전체
          </label> */}
          <label>
            <input
              type="radio"
              name="gender"
              checked={filterData.gender === "f"}
              onChange={() => setFilterData({ ...filterData, gender: "f" })}
            />
            여성
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              checked={filterData.gender === "m"}
              onChange={() => setFilterData({ ...filterData, gender: "m" })}
              defaultChecked
            />
            남성
          </label>
        </div>
      </div>
      {/* <div className="comfort">
        <div>이용편의</div>
        <div className="comfortBox">
          {comfort.map((comfort, index) => (
            <div key={index} className="round_box" onClick={handleClass}>
              {comfort}
            </div>
          ))}
        </div>
      </div> */}
      <div className="btn_area">
        <button id="filterBtn" onClick={handleFilter}>
          필터 적용하기
        </button>
      </div>
    </div>
  );
};

export default FilterList;
