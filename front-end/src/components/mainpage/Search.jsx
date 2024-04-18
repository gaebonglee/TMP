import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";
import "./Search.scss";

const Search = () => {
  return (
    <div className="search_container">
      <div className="search_contents">
        <div className="searchType">
          <div className="bar">
            <a>선생님</a>
            <IoMdArrowDropdown />
          </div>
        </div>
        <div className="searchKeyword">
          <input
            type="text"
            placeholder="지역, 지하철, 센터, 선생님 검색하기"
            maxLength={"20"}
            name="keyword"
            autoComplete="off"
          />
          <div className="cancel_icon">
            <ImCancelCircle />
          </div>
          <div className="searchListbox"></div>
        </div>
        <button className="search_icon">
          <FiSearch />
          <a>검색하기</a>
        </button>
      </div>
    </div>
  );
};

export default Search;
