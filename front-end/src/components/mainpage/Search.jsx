import React from "react";
import "./Search.scss";

const Search = () => {
  return (
    <div className="search_container">
      <div>
        <div className="search_contents">
          <label className="search_label">
            <div className="search_icon">
              <i class="ri-search-2-line"></i>
            </div>
            <input
              class="search_input"
              placeholder="지역, 지하철, 센터, 선생님 검색하기"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Search;
