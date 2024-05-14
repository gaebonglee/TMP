import React, { useState, useEffect, useRef } from "react";
import { TbAdjustmentsAlt } from "react-icons/tb";
import { RiMapPin2Fill } from "react-icons/ri";
import { ImCancelCircle } from "react-icons/im";
import "./SearchInput.scss";
import { GiWhistle } from "react-icons/gi";

const SearchInput = (props) => {
  const [inputValue, setInputValue] = useState("");

  const [searchingData, setSearchingData] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchBarRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5000/center")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP 에러 ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setSearchingData(data);
      });
  }, []);

  function filterHandler() {
    props.setFilter((prevFilter) => !prevFilter);
  }

  function handleInputChange(event) {
    const value = event.target.value;
    setInputValue(value);

    if (value.length >= 1) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }

  const clearKeyword = () => {
    setInputValue("");
    setShowSuggestions(false);
  };

  const filteredSuggestions = searchingData.filter((item) => {
    const itemName =
      `${item.center_name} ${item.center_address} ${item.user_name}`.toLowerCase();
    return itemName.includes(inputValue.toLowerCase());
  });

  const handleSuggestionClick = (suggestion) => {
    setInputValue(`${suggestion.center_name}`);
    setShowSuggestions(false);
    props.setSearchCenter([suggestion.latitude, suggestion.longitude]);
  };

  return (
    <div className="searchTab">
      <div className="searchTab-Title">
        <div>
          <div>전체</div>
          <div>헬스</div>
        </div>
        <div className="titleSvg" onClick={filterHandler}>
          {!props.centerList ? (
            <TbAdjustmentsAlt size={30} color="#00491e" cursor={"pointer"} />
          ) : null}
        </div>
      </div>
      <div className="searchInput">
        <div className="inputContainer">
          <input
            id="searchBar"
            ref={searchBarRef}
            type="text"
            placeholder={
              inputValue ? "" : "트레이너 및 트레이너가 속한 센터 검색"
            }
            maxLength={"20"}
            value={inputValue}
            onChange={handleInputChange}
            autoComplete="off"
          />
          {inputValue && (
            <div className="cancel_icon" onClick={clearKeyword}>
              <ImCancelCircle />
            </div>
          )}
        </div>
        {showSuggestions && (
          <div className="listContainer">
            {filteredSuggestions.length > 0 ? (
              <ul className="suggention-item-list">
                {filteredSuggestions.map((suggestion) => (
                  <li
                    className="suggestion-item"
                    key={suggestion.center_id}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <h4>
                      <RiMapPin2Fill className="buildingIcon" />
                      {suggestion.center_name}
                    </h4>
                    <div>
                      <span className="trainerName">
                        <GiWhistle className="trainerWhistle" size={21} />
                        <b>{suggestion.user_name}</b> 트레이너
                      </span>
                      <span className="addressSpan">
                        {suggestion.center_address.slice(6, 14)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="noSearch">
                <h4>검색 결과가 없습니다.</h4>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
