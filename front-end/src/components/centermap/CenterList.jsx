import React from "react";
import SearchInput from "../trainermap/SearchInput";
import CenterListItem from "./CenterListItem";

const CenterList = () => {
  return (
    <div>
      <SearchInput />
      <CenterListItem />
      <CenterListItem />
      <CenterListItem />
    </div>
  );
};

export default CenterList;
