import React, { useState } from "react";
import TrainerListItem from "./TrainerListItem";
import "./TrainerList.scss";
import SearchInput from "./SearchInput";
import FilterList from "./FilterList";

const TrainerList = (props) => {
  const [filter, setFilter] = useState(true);

  const { trainers } = props;

  return (
    <div className="listWrap">
      <SearchInput setFilter={setFilter} />
      <div
        style={{
          width: "515px",
          height: "calc(-285px + 100vh)",
          overflowY: "auto",
        }}
      >
        {filter ? (
          <>
            <TrainerListItem />
            <TrainerListItem />
            <TrainerListItem />
            <TrainerListItem />
            <TrainerListItem />
            <TrainerListItem />
          </>
        ) : (
          <FilterList setFilter={setFilter} />
        )}
      </div>
    </div>
  );
};

export default TrainerList;
