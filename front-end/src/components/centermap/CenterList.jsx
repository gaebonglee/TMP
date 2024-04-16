import React from "react";
import SearchInput from "../trainermap/SearchInput";
import CenterListItem from "./CenterListItem";

const CenterList = () => {
  return (
    <>
      <SearchInput />
      <div
        style={{
          width: "515px",
          height: "calc(-242px + 100vh)",
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
