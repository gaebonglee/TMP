import React, { useState } from "react";
import TrainerListItem from "./TrainerListItem";
import "style/TrainerList.scss";
import SearchInput from "./SearchInput";
import FilterList from "./FilterList";
import { Link } from "react-router-dom";

const TrainerList = (props) => {
  const [filter, setFilter] = useState(true);
  const {
    trainers,
    currentLatitude,
    currentLongitude,
    setTrainers,
    setSearchCenter,
    centerList,
    setSearchingData,
    searchCenter,
    setIsloading,
  } = props;

  return (
    <div className="listWrap">
      <SearchInput
        searchCenter={searchCenter}
        setFilter={setFilter}
        centerList={centerList}
        setSearchingData={setSearchingData}
        setSearchCenter={setSearchCenter}
      />
      <div
        style={{
          width: "515px",
          height: "calc(-285px + 100vh)",
          overflowY: "auto",
        }}
      >
        {filter ? (
          trainers.length > 0 ? (
            trainers.map((trainer, index) =>
              trainer ? (
                <Link key={index} to={`/trainerDetail/${trainer.user_id}`}>
                  <TrainerListItem key={index} trainer={trainer} />
                </Link>
              ) : null
            )
          ) : (
            <h3 style={{ textAlign: "center" }}>
              해당되는 트레이너가 없습니다
            </h3>
          )
        ) : (
          <FilterList
            trainers={trainers}
            setFilter={setFilter}
            setIsloading={setIsloading}
            currentLatitude={currentLatitude}
            currentLongitude={currentLongitude}
            setTrainers={setTrainers}
          />
        )}
      </div>
    </div>
  );
};

export default TrainerList;
