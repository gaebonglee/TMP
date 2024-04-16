import React from "react";

const SearchInput = (props) => {
  function filterHandler() {
    props.setFilter((prevFilter) => !prevFilter);
  }

  return (
    <div className="searchTab">
      <div className="searchTab-Title">
        <div>
          <div>전체</div>
          <div>헬스</div>
        </div>
        <div className="titleSvg" onClick={filterHandler}>
          <img
            alt="equalizer-line"
            src="img/equalizer-line.svg"
            style={{
              width: "22px",
              cursor: "pointer",
            }}
          />
        </div>
      </div>
      <div className="searchInput">
        <input
          id="searchBar"
          type="text"
          placeholder="지역,지하철역,센터,선생님 검색하기"
        />
        <div className="btn_search">
          <img
            src="img/pencil-line.svg"
            alt="search"
            style={{ width: "24px", cursor: "pointer" }}
          />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default SearchInput;
