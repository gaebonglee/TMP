import { NavermapsProvider } from "react-naver-maps";

import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";

import UndongMap from "./TrainerMap/UndongMap";
import TrainerList from "./TrainerMap/TrainerList";

function App() {
  

  const [searchPosition, setSearchPosition] = useState({
    lat: 37.3595704,
    lng: 127.105399,
  }); // [latitude, longitude

  const [address, setAddress] = useState("");

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    console.log(fullAddress);
    setAddress(fullAddress);
  };

  return (
    <>
      <TrainerList />
      <NavermapsProvider ncpClientId="0dfie9x7ty" submodules={["geocoder"]}>
        <UndongMap address={address} />
      </NavermapsProvider>
      {/* <DaumPostcode onComplete={handleComplete} />; */}
    </>
  );
}

export default App;
