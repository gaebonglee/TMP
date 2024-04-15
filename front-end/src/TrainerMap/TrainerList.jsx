import React, { useState } from "react";
import TrainerListItem from "./TrainerListItem";
import "./TrainerList.css";
import SearchInput from "./SearchInput";
import FilterList from "./FilterList";

const TrainerList = () => {
  const [filter, setFilter] = useState(false);
  return (
    <div className="listWrap">
      <SearchInput setFilter={setFilter} />
      <div>
        {filter ? (
          <>
            <TrainerListItem />
            <TrainerListItem />
            <TrainerListItem />
          </>
        ) : (
          <FilterList />
        )}
      </div>
    </div>
  );
};

export default TrainerList;
