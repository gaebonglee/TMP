import React from "react";
import { TbAdjustmentsAlt } from "react-icons/tb";
import { FaPencilAlt } from "react-icons/fa";

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
          {!props.centerList ? (
            <TbAdjustmentsAlt size={20} color="#00491e" cursor={"pointer"} />
          ) : null}
        </div>
      </div>
      <div className="searchInput">
        <input
          id="searchBar"
          type="text"
          placeholder="지역,지하철역,센터,선생님 검색하기"
        />
        <div className="btn_search">
          <FaPencilAlt size={20} color="#00491e" />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default SearchInput;
