import React, { useState } from "react";
import "./Purpose.scss";
// 아이콘
import { BiSelectMultiple } from "react-icons/bi";

const Purpose = () => {
  const [mainCategory, setMainCategory] = useState("다이어트 및 식단관리"); // 초기값 설정
  const [subCategories, setSubCategories] = useState([]);

  const mainCategories = [
    "다이어트 및 식단관리",
    "건강 및 체력관리",
    "체형개선",
  ];
  const subCategoriesOptions = {
    "다이어트 및 식단관리": ["스태미나", "근력 강화"],
    "건강 및 체력관리": ["다이어트", "바디 슬림"],
    체형개선: ["근육토닝", "바디라인"],
  };

  const descriptions = {
    스태미나:
      "스태미나 향상을 위한 운동은 장시간 지속되는 유산소 운동을 포함합니다.",
    "근력 강화":
      "근력을 강화하기 위해 저항성 운동을 사용하며, 이는 근육의 크기와 힘을 증가시킵니다.",
    다이어트: "체중 감소를 목표로 하는 다양한 운동 프로그램을 포함합니다.",
    "바디 슬림": "전신을 슬림하게 만드는데 초점을 맞춘 운동 방법입니다.",
    근육토닝:
      "특정 근육 그룹을 타겟팅하여 더욱 뚜렷하게 근육을 강조하는 운동입니다.",
    바디라인:
      "아름다운 바디 라인을 만드는 데 도움이 되는 운동을 통해 몸매를 조각합니다.",
  };

  const handleMainCategoryClick = (category) => {
    setMainCategory(category);
    setSubCategories([]); // Reset subcategories when main category changes
  };

  const handleSubCategoryChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSubCategories([...subCategories, value]);
    } else {
      setSubCategories(
        subCategories.filter((subCategory) => subCategory !== value)
      );
    }
  };

  return (
    <div className="purpose_page">
      <div className="purpose_title">
        <BiSelectMultiple />
        <h2>운동 목적 선택</h2>
      </div>

      <div>
        {mainCategories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleMainCategoryClick(category)}
            className={mainCategory === category ? "active" : ""}
          >
            {category}
          </button>
        ))}
      </div>
      {mainCategory && (
        <div>
          <h3>소분류 선택 및 상세 정보</h3>
          {subCategoriesOptions[mainCategory].map((subCategory) => (
            <div key={subCategory}>
              <label>
                <input
                  type="checkbox"
                  value={subCategory}
                  checked={subCategories.includes(subCategory)}
                  onChange={handleSubCategoryChange}
                />
                {subCategory}
              </label>
              <p>{descriptions[subCategory]}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Purpose;
