import React, { useState } from "react";
import SearchInput from "../trainermap/SearchInput";
import CenterListItem from "./CenterListItem";

const CenterList = () => {
  const [centerList, setCenterList] = useState(true);
  return (
    <>
      <SearchInput centerList={centerList} setCenterList={setCenterList} />
      <div
        style={{
          width: "515px",
          height: "calc(-122px + 100vh)",
          overflowY: "auto",
        }}
      >
        <CenterListItem />
        <CenterListItem />
        <CenterListItem />
        <CenterListItem />
        <CenterListItem />
        <CenterListItem />
        <CenterListItem />
        <CenterListItem />
        <CenterListItem />
      </div>
    </>
  );
};

export default CenterList;
