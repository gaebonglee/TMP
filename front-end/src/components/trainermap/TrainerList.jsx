import React, { useState } from "react";
import TrainerListItem from "./TrainerListItem";
import "./TrainerList.scss";
import SearchInput from "./SearchInput";
import FilterList from "./FilterList";

const TrainerList = () => {
  const [filter, setFilter] = useState(true);
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
          <FilterList setFilter={setFilter} />
        )}
      </div>
    </div>
  );
};

export default TrainerList;
