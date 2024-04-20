import React, { useState } from "react";
import "./Purpose.scss";

const Purpose = () => {
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const handleMainCategoryChange = (event) => {
    setMainCategory(event.target.value);
    setSubCategory(""); // 대분류 변경 시 소분류 초기화
  };

  const handleSubCategoryChange = (event) => {
    setSubCategory(event.target.value);
  };

  return (
    <div>
      <h2>운동 목적 선택</h2>
      <select onChange={handleMainCategoryChange} value={mainCategory}>
        <option value="">대분류 선택</option>
        <option value="체력 증진">다이어트 및 식단관리</option>
        <option value="체중 감량">건강 및 체력관리</option>
        <option value="체형개선">체형개선</option>
      </select>
      {mainCategory && (
        <select onChange={handleSubCategoryChange} value={subCategory}>
          <option value="">소분류 선택</option>
          {mainCategory === "체력 증진" && (
            <>
              <option value="스태미나">스태미나</option>
              <option value="근력 강화">근력 강화</option>
            </>
          )}
          {mainCategory === "체중 감량" && (
            <>
              <option value="다이어트">다이어트</option>
              <option value="바디 슬림">바디 슬림</option>
            </>
          )}
        </select>
      )}
    </div>
  );
};

export default Purpose;
