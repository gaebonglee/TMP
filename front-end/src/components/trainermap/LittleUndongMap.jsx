import React, { useEffect, useRef, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import "../../components/trainermap/UnDongMap.scss";

const LittleUndongMap = ({ lat, longi }) => {
  const mapRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadNaverMapsScript = () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=0dfie9x7ty&callback=initMap`;
      script.async = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
      setIsLoading(false);
    };

    const initializeMap = () => {
      const { naver } = window;
      if (!mapRef.current || !naver) return;

      const location = new naver.maps.LatLng(lat, longi);
      const mapOptions = {
        center: location,
        zoom: 15,
        zoomControl: true,
        zoomControlOptions: {
          position: naver.maps.Position.TOP_RIGHT,
        },
      };
      new naver.maps.Map(mapRef.current, mapOptions);
    };

    loadNaverMapsScript();
  }, []);

  const mapStyle = {
    width: "100%",
    height: "400px",
  };

  return (
    <div className="mapWrap">
      {isLoading ? <LoadingSpinner /> : <div ref={mapRef} style={mapStyle} />}
    </div>
  );
};

export default LittleUndongMap;
