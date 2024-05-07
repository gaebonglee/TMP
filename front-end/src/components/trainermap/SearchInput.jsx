import React, { useState, useEffect, useRef } from "react";
import { TbAdjustmentsAlt } from "react-icons/tb";
// import { FaPencilAlt } from "react-icons/fa";
import { HiMapPin } from "react-icons/hi2";

const SearchInput = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchingData, setSearchingData] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchBarRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5000/center/centerall")
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

  useEffect(() => {
    if (props.searchCenter !== null) {
      setInputValue(`${props.searchCenter}`);
    }
  }, [props.searchCenter]);

  function filterHandler() {
    props.setFilter((prevFilter) => !prevFilter);
  }

  function handleInputChange(event) {
    const value = event.target.value;
    setInputValue(value);
    if (value.length >= 1) {
      setShowSuggestions(true);
      const newSuggestions = getSuggestions(value);
      setSuggestions(newSuggestions);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  }

  function getSuggestions(value) {
    const suggestions = searchingData.filter((item) => {
      const itemName =
        `${item.center_name} ${item.center_address}`.toLowerCase();
      return itemName.includes(value.toLowerCase());
    });
    return suggestions;
  }

  const handleSuggestionClick = (suggestion) => {
    setInputValue(`${suggestion.center_name}`);
    setShowSuggestions(false);
    // props.setSearchCenter(
    //   new window.naver.maps.LatLng(suggestion.latitude, suggestion.longitude)
    // );
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
            placeholder="지역,지하철역,센터,선생님 검색하기"
            value={inputValue}
            onChange={handleInputChange}
            autoComplete="off"
          />
        </div>
        {/* <div className="btn_search" onClick={handleSearch}>
          <FaPencilAlt size={20} color="#00491e" />
        </div> */}
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
                  <HiMapPin className="buildingIcon" size={24} />
                  <h4>{suggestion.center_name}</h4>
                </div>
                <span className="addressSpan">
                  {suggestion.center_address.slice(0, 9)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
