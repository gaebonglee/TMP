import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";
import "./Search.scss";

const Search = () => {
  const [searchType, setSearchType] = useState("선생님");
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
  };

  const handleKeywordChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const clearKeyword = () => {
    setSearchKeyword("");
  };

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
          />
          {searchKeyword && (
            <div className="cancel_icon" onClick={clearKeyword}>
              <ImCancelCircle />
            </div>
          )}
          <div className="searchListbox"></div>
        </div>
        <div className="search_icon">
          <button>
            <FiSearch style={{paddingTop:'5px'}}/>
            <a>검색하기</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
