import React, { useState } from "react";
import "./Purpose.scss";
// 아이콘
import { BiSelectMultiple } from "react-icons/bi";

const Purpose = ({ setSubCategories }) => {
  const [mainCategory, setMainCategory] = useState("다이어트 및 식단관리"); // 초기값 설정
  const [subCategories, setSelectedSubCategories] = useState([]);

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
    다이어트:
      "트레이너 작성 상세내용 테스트/트레이너 작성 상세내용 테스트/트레이너 작성 상세내용 테스트/",
    식단관리:
      "트레이너 작성 상세내용 테스트/트레이너 작성 상세내용 테스트/트레이너 작성 상세내용 테스트/",
    "바디 프로필":
      "트레이너 작성 상세내용 테스트/트레이너 작성 상세내용 테스트/트레이너 작성 상세내용 테스트/",
    "대회 준비":
      "트레이너 작성 상세내용 테스트/트레이너 작성 상세내용 테스트/트레이너 작성 상세내용 테스트/",
    "기초체력 강화":
      "트레이너 작성 상세내용 테스트/트레이너 작성 상세내용 테스트/트레이너 작성 상세내용 테스트/",
    근력향상:
      "트레이너 작성 상세내용 테스트/트레이너 작성 상세내용 테스트/트레이너 작성 상세내용 테스트/",
    통증케어:
      "트레이너 작성 상세내용 테스트/트레이너 작성 상세내용 테스트/트레이너 작성 상세내용 테스트/",
    "산전산후 케어":
      "트레이너 작성 상세내용 테스트/트레이너 작성 상세내용 테스트/트레이너 작성 상세내용 테스트/",
    "하체라인 개선":
      "트레이너 작성 상세내용 테스트/트레이너 작성 상세내용 테스트/트레이너 작성 상세내용 테스트/",
    "바른체형 유지":
      "트레이너 작성 상세내용 테스트/트레이너 작성 상세내용 테스트/트레이너 작성 상세내용 테스트/",
  };

  const handleMainCategoryClick = (category) => {
    setMainCategory(category);
    setSubCategories([]); // Reset subcategories when main category changes
  };
  const handleSubCategoryChange = (event) => {
    const { value, checked } = event.target;
    setSelectedSubCategories((prevSubCategories) => {
      let updatedSubCategories;
      if (checked) {
        updatedSubCategories = [...prevSubCategories, value];
      } else {
        updatedSubCategories = prevSubCategories.filter(
          (subCategory) => subCategory !== value
        );
      }
      setSubCategories(updatedSubCategories); // 업데이트된 서브카테고리 리스트를 상위 컴포넌트로 전달
      return updatedSubCategories;
    });
  };

  return (
    <div className="purpose_page">
      <div className="purpose_title">
        <BiSelectMultiple />
        <h2>운동 목적</h2>
      </div>
      <br />

      <div className="purpose_mainCategories_btn">
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
        <div className="subCategories_wrap">
          {subCategoriesOptions[mainCategory].map((subCategory) => (
            <div key={subCategory}>
              <label>
                <input
                className="purpose_sub_checkbox"
                  type="checkbox"
                  value={subCategory}
                  checked={subCategories.includes(subCategory)}
                  onChange={handleSubCategoryChange}
                />
                {subCategory}
              </label>
              <p className="purpose_subCategory_text">
                {descriptions[subCategory]}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Purpose;
