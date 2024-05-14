import React, { useState, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";
import "./Search.scss";
import { Link } from "react-router-dom";
import { RiMapPin2Fill } from "react-icons/ri";
import useScript from "hooks/useScript";
import { GiWhistle } from "react-icons/gi";

const Search = ({ setSearchCene }) => {
  const [searchType, setSearchType] = useState("트레이너");
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
        const response = await fetch("http://localhost:5000/center");
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
      setSearchLocation(
        new window.naver.maps.LatLng(suggestion.latitude, suggestion.longitude)
      );
    } else {
      setSearchLocation(
        new window.naver.maps.LatLng(suggestion.latitude, suggestion.longitude)
      );
    }
  };

  const filteredResults = searchResults.filter((item) => {
    const itemName =
      `${item.center_name} ${item.center_address} ${item.user_name}`.toLowerCase();
    return itemName.includes(searchKeyword.toLowerCase());
  });

  return (
    <div className="search_container">
      <div className="search_contents">
        {/* <div className="searchType">
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
        </div> */}
        <div className="searchKeyword">
          <input
            type="text"
            placeholder={
              searchKeyword ? "" : "트레이너 및 트레이너가 속한 센터 검색"
            }
            maxLength={"20"}
            name="keyword"
            autoComplete="off"
            value={searchKeyword}
            onChange={handleKeywordChange}
          />
          {searchKeyword && (
            <div className="cancel_icon" onClick={clearKeyword}>
              <ImCancelCircle />
            </div>
          )}
          {showSuggestions && filteredResults.length > 0 ? (
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
                      <div>
                        <span className="trainerName">
                          <GiWhistle className="trainerWhistle" size={21} />
                          <b>{result.user_name}</b> 트레이너
                        </span>
                        <span className="addressSpan">
                          {result.center_address.slice(0, 10)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            showSuggestions && (
              <div className="searchListbox">
                <h4>검색 결과가 없습니다.</h4>
              </div>
            )
          )}
        </div>
        <div className="search_icon">
          <button className="src_btn">
            <FiSearch style={{ paddingTop: "5px" }} />
            {searchKeyword && filteredResults.length > 0 && searchLocation ? (
              <Link to={`/trainermap?center=${searchLocation}`}>검색하기</Link>
            ) : (
              <span>검색하기</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
