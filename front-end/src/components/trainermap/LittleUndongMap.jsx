import React, { useEffect, useRef, useState } from "react";
import LoadingSpinnerSmall from "../../style/LoadingSpinnerSmall";
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

      const map = new naver.maps.Map(mapRef.current, mapOptions);

      const markerOptions = {
        position: location,
        map: map,
        icon: {
          content: `<div class="markerWrap markerActiveWrap">트레이너</div><div class="markerPin markerActivePin"></div>`,
          size: new naver.maps.Size(38, 58),
          anchor: new naver.maps.Point(19, 58),
        },
      };

      new naver.maps.Marker(markerOptions);
    };

    loadNaverMapsScript();
  }, [lat, longi]);

  const mapStyle = {
    width: "100%",
    height: "400px",
  };

  return (
    <div className="mapWrap">
      {isLoading ? (
        <LoadingSpinnerSmall />
      ) : (
        <div ref={mapRef} style={mapStyle} />
      )}
    </div>
  );
};

export default LittleUndongMap;
