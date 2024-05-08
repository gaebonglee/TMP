import React, { useState, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";
import "./Search.scss";
import { Link } from "react-router-dom";
import { RiMapPin2Fill } from "react-icons/ri";
import useScript from "hooks/useScript";

const Search = ({ setSearchCene }) => {
  const [searchType, setSearchType] = useState("선생님");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const scriptStatus = useScript(
    "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=0dfie9x7ty&submodules=geocoder"
  );
  const [searchLocation, setSearchLocation] = useState(null);

  useEffect(() => {
    if (scriptStatus === "ready") {
      // naver.maps 접근
    }
  }, [scriptStatus]);

  useEffect(() => {
    // 검색 데이터 가져오기
    const fetchSearchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/center/centerall");
        if (!response.ok) {
          throw new Error(`HTTP 에러 ${response.status}`);
        }
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("검색 데이터를 가져오는 중 에러 발생:", error);
      }
    };

    fetchSearchData();
  }, []);

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
  };

  const handleKeywordChange = (e) => {
    const value = e.target.value;
    setSearchKeyword(value);

    if (value.length >= 1) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const clearKeyword = () => {
    setSearchKeyword("");
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchKeyword(`${suggestion.center_name}`);
    setShowSuggestions(false);

    if (scriptStatus === "ready") {
      console.log(scriptStatus);
    } else {
      setSearchLocation(
        new window.naver.maps.LatLng(suggestion.latitude, suggestion.longitude)
      );
    }
  };

  const filteredResults = searchResults.filter((item) => {
    const itemName = `${item.center_name} ${item.center_address}`.toLowerCase();
    return itemName.includes(searchKeyword.toLowerCase());
  });

  return (
    <div className="search_container">
      <div className="search_contents">
        <div className="searchType">
          <div className="bar" onClick={() => handleSearchTypeChange("선생님")}>
            <span>{searchType}</span>
            <IoMdArrowDropdown />
          </div>
          <div className="searchTypeDropdown">
            <div
              className="option"
              onClick={() => handleSearchTypeChange("선생님")}
            >
              선생님
            </div>
            <div
              className="option"
              onClick={() => handleSearchTypeChange("센터")}
            >
              센터
            </div>
          </div>
        </div>
        <div className="searchKeyword">
          <input
            type="text"
            placeholder={
              searchKeyword ? "" : "지역, 지하철, 센터, 선생님 검색하기"
            }
            maxLength={"20"}
            name="keyword"
            autoComplete="off"
            value={searchKeyword}
            onChange={handleKeywordChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                alert("엔터키 누름");
                handleKeywordChange();
              }
            }}
          />
          {searchKeyword && (
            <div className="cancel_icon" onClick={clearKeyword}>
              <ImCancelCircle />
            </div>
          )}
          {showSuggestions && filteredResults.length > 0 && (
            <div className="searchListbox">
              <ul className="suggention-item-list">
                {filteredResults.map((result, index) => (
                  <li
                    className="suggention-item"
                    key={index}
                    onClick={() => handleSuggestionClick(result)}
                  >
                    <div className="flexBox">
                      <h3>
                        <RiMapPin2Fill className="buildingIcon" />
                        {result.center_name}
                      </h3>
                      <span className="addressSpan">
                        {result.center_address.slice(0, 10)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="search_icon">
          <button className="src_btn">
            <FiSearch style={{ paddingTop: "5px" }} />
            {searchKeyword ? (
              <Link to={`/trainermap?center=${searchLocation}`}>검색하기</Link>
            ) : (
              <Link to="/trainermap">검색하기</Link>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
