import React, { useEffect, useState } from "react";
import "./CenterLocationEdit.scss";
import { FaSearch, FaTimes } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";

const CenterLocationEdit = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [centerLocationData, setCenterLocationData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/center/centerall")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP 에러 ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCenterLocationData(data);
      })
      .catch((error) => {
        console.error("에러 발생", error);
      });
  }, []);

  const handleInputChange = (event) => {
    const userInput = event.target.value;
    setSearchTerm(userInput);
    setIsInputDisabled(false); // 입력 필드를 활성화

    // 자동완성 제안을 보이게 할 조건을 추가
    if (userInput.length >= 2) {
      setShowSuggestions(true);
      const filteredSuggestions = centerLocationData.filter((location, index) =>
        location.center_name.includes(userInput)
      );
      setSuggestions(filteredSuggestions);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.center_name);
    setIsInputDisabled(true); // 입력 필드를 비활성화
    setShowSuggestions(false); // 자동완성 제안을 숨김
  };

  const handleResetInput = () => {
    setSearchTerm("");
    setIsInputDisabled(false); // 입력 필드를 활성화
    setShowSuggestions(false); // 자동완성 제안을 숨김
  };

  return (
    <div>
      <h1>레슨 이용 센터</h1>
      <h4 className="subtitle">소속 센터가 변경되었을 경우 수정해주세요.</h4>
      <div>
        <div style={{ position: "relative" }}>
          <input
            id="centerLocationInput"
            maxLength={40}
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="센터 이름을 입력하세요"
            disabled={isInputDisabled}
            autoComplete="off"
          />
          {isInputDisabled ? (
            <FaTimes
              size={30}
              className="reset-icon"
              onClick={handleResetInput}
            />
          ) : (
            <FaSearch size={30} className="search-icon" />
          )}
        </div>
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <div className="listContainer">
          <ul className="suggention-item-list">
            {suggestions.map((suggestion, index) => (
              <li
                className="suggestion-item"
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="flexBox">
                  <FaBuilding className="buildingIcon" size={24} />
                  <h4>{suggestion.center_name}</h4>
                </div>
                <span className="addressSpan">{suggestion.center_address}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CenterLocationEdit;
