import React, { useEffect, useState } from "react";
import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
} from "react-naver-maps";
import UnDongMapCSS from "./UnDongMap.css";

const UndongMap = (props) => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const navermap = useNavermaps();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude, position.coords.longitude);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);
  if (props.address) {
    navermap.Service.geocode(
      { query: props.address },
      function (status, response) {
        if (status === navermap.Service.Status.ERROR) {
          return alert("주소를 찾을 수 없습니다.");
        }
        let result = response.v2.addresses[0];
        console.log(result.x, result.y);
        setLatitude(result.y);
        setLongitude(result.x);
      }
    );
  }
  const mapSytle = {
    width: "calc(100% - 512px)",
    height: "100vh",
    top: "155px",
    right: "0px",
    position: "absolute",
  };

  return (
    <MapDiv style={mapSytle}>
      <NaverMap
        center={{ lat: latitude, lng: longitude }}
        defaultZoom={15}
        zoomControl={true}
        zoomControlOptions={{ position: navermap.Position.TOP_RIGHT }}
      >
        <Marker
          icon={{
            content: `<div class="markerWrap">현재 위치 HPE 교육센터</div>
            <div class="markerPin"></div>  `,
          }}
          position={new navermap.LatLng(latitude, longitude)}
        />
      </NaverMap>
    </MapDiv>
  );
};

export default UndongMap;
