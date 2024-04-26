import React, { useEffect, useState } from "react";
import TrainerListItem from "./TrainerListItem";
import "./TrainerList.scss";
import SearchInput from "./SearchInput";
import FilterList from "./FilterList";

const TrainerList = (props) => {
  const [filter, setFilter] = useState(true);
  const { trainers, currentLatitude, currentLongitude, setTrainers } = props;

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
            {[...trainers].map((trainer, index) => (
              <TrainerListItem key={index} trainer={trainer} />
            ))}
          </>
        ) : (
          <FilterList
            currentLatitude={currentLatitude}
            currentLongitude={currentLongitude}
            setTrainers={setTrainers}
            setFilter={setFilter}
          />
        )}
      </div>
    </div>
  );
};

export default TrainerList;
