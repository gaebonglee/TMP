import React, { useState, useEffect } from "react";
import "./Purpose.scss";
import { BiSelectMultiple } from "react-icons/bi";

const Purpose = ({ setSubCategories }) => {
  const [mainCategory, setMainCategory] = useState("다이어트 및 식단관리");
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  const mainCategories = [
    "다이어트 및 식단관리",
    "건강 및 체력관리",
    "체형 개선",
  ];
  const subCategoriesOptions = {
    "다이어트 및 식단관리": [
      "다이어트",
      "식단관리",
      "바디 프로필",
      "대회 준비",
    ],
    "건강 및 체력관리": [
      "기초체력 강화",
      "근력향상",
      "통증케어",
      "산전산후 케어",
    ],
    "체형 개선": ["하체라인 개선", "바른체형 유지"],
  };

  const descriptions = {
    다이어트: "체중 감량을 목표로 하는 식단 조절 및 운동을 도와드립니다.",
    식단관리:
      "영양소 균형을 맞춰 건강 유지 또는 목표 체중에 도달할 수 있게 도와드립니다.",
    바디프로필:
      "바디프로필 촬영을 목표로 하는 분들께 조금 더 강화된 운동과 식단으로 관리를 도와드립니다.",
    대회준비:
      "특정 스포츠나 피트니스 대회에 참가하기 위한 체계적인 훈련과 식단 조절을 도와드립니다.",
    기초체력강화:
      "일상 생활에서 필요한 최소한의 체력을 향상시키기 위한 운동을 도와드립니다. 스태미너, 근력, 유연성 등의 기본적인 체력 요소를 강화하는 것을 포함합니다.",
    근력향상:
      "특정 근육이나 근육군의 힘과 크기를 증가시키는 운동을 도와드립니다. 웨이트 트레이닝이나 저항 운동을 통해 이루어집니다.",
    통증케어:
      "만성적 또는 급성의 통증을 관리와 완화를 도와드립니다. 물리치료, 스트레칭, 적절한 운동 등을 통해 수행합니다.",
    산전산후케어:
      "임신 전과 후에 여성의 건강을 관리를 도와드립니다. 적절한 운동, 영양 관리 및 일상 활동의 조절을 포함하여 모체와 태아의 건강을 최적화하는 것을 목표로 합니다.",
    하체라인개선:
      "다리와 엉덩이의 라인을 보다 미적으로 개선하기 위한 운동과 관리를 도와드립니다. 근력 훈련과 유산소 운동을 포함하여 전체적인 하체의 균형과 형태를 개선하는 것을 목적으로 합니다.",
    바른체형유지:
      "체형의 균형을 잘 유지하며 자세를 개선을 도와드립니다. 올바른 자세를 위한 운동과 일상 활동에서의 자세 관리를 통해 신체의 통증을 줄이고 효율적인 신체 기능을 유지시키는 것을 목표로 합니다.",
  };

  useEffect(() => {
    setSubCategories(selectedSubCategories);
  }, [selectedSubCategories]);

  const handleSubCategoryChange = (event) => {
    const { value, checked } = event.target;
    let updatedSubCategories;
    if (checked) {
      updatedSubCategories = [...selectedSubCategories, value];
    } else {
      updatedSubCategories = selectedSubCategories.filter(
        (subCategory) => subCategory !== value
      );
    }
    setSelectedSubCategories(updatedSubCategories);
  };

  return (
    <div className="purpose_page">
      <div className="purpose_title">
        <BiSelectMultiple />
        <h3>운동 목적</h3>
        <span>중복 선택 가능합니다.</span>
      </div>
      <br />
      <div className="purpose_mainCategories_btn">
        {mainCategories.map((category, index) => (
          <button
            key={index}
            onClick={() => setMainCategory(category)}
            className={mainCategory === category ? "active" : ""}
          >
            {category}
          </button>
        ))}
      </div>
      {mainCategory && (
        <div className="subCategories_wrap">
          {subCategoriesOptions[mainCategory].map((subCategory) => (
            <div key={subCategory}>
              <label>
                <input
                  type="checkbox"
                  value={subCategory}
                  checked={selectedSubCategories.includes(subCategory)}
                  onChange={handleSubCategoryChange}
                />
                <span className="subCategory_text">{subCategory}</span>
              </label>
              <p className="purpose_subCategory_text">
                {descriptions[subCategory.replace(/ /g, "")]}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Purpose;
