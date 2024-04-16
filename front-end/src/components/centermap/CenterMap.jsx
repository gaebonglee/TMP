import React, { useEffect, useRef, useState } from "react";
import "./CenterMap.css";

const CenterMap = (props) => {
  const [latitude, setLatitude] = useState(37.5665);
  const [longitude, setLongitude] = useState(126.978);
  const mapRef = useRef(null);
  const [naverMap, setNaverMap] = useState(null);

  useEffect(() => {
    const { naver } = window;
    if (!mapRef.current || !naver) return;

    const location = new naver.maps.LatLng(latitude, longitude);
    const mapOptions = {
      center: location,
      zoom: 15,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };
    const map = new naver.maps.Map(mapRef.current, mapOptions);
    setNaverMap(map);

    const marker = new naver.maps.Marker({
      position: location,
      map: map,
      icon: {
        content: `<div class="markerWrap">현재 위치 HPE 교육센터</div> <div class="markerPin"></div>`,
      },
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          const newLocation = new naver.maps.LatLng(latitude, longitude);
          map.setCenter(newLocation);
          marker.setPosition(newLocation);
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    if (props.address) {
      naver.maps.Service.geocode(
        {
          query: props.address,
        },
        function (status, response) {
          if (status === naver.maps.Service.Status.ERROR) {
            return alert("주소를 찾을 수 없습니다.");
          }
          const result = response.v2.addresses[0];
          const newLocation = new naver.maps.LatLng(result.y, result.x);
          setLatitude(result.y);
          setLongitude(result.x);
          map.setCenter(newLocation);
          marker.setPosition(newLocation);
        }
      );
    }
  }, [props.address]);

  const mapStyle = {
    width: "calc(100% - 530px)",
    height: "calc(100px + 100vh)",
    top: "80px",
    right: "0px",
    position: "absolute",
  };

  return (
    <>
      <div ref={mapRef} style={mapStyle}>
        <div>
          <div className="myLocation">
            <div
              className="btn"
              onClick={() => {
                if (naverMap) {
                  navigator.geolocation.getCurrentPosition((position) => {
                    const { latitude, longitude } = position.coords;
                    setLatitude(latitude);
                    setLongitude(longitude);
                    const newLocation = new window.naver.maps.LatLng(
                      latitude,
                      longitude
                    );
                    naverMap.setCenter(newLocation);
                  });
                }
              }}
            >
              <img src="img/crosshair-line.svg" alt="" />
            </div>
          </div>
          <div className="research">
            <div className="researchBtn">
              <button size="48" color="#fff" className="rBtn">
                <image
                  src="img/arrow-go-back-fill.svg"
                  alt=""
                  style={{
                    boxSizing: "border-box",
                    width: "24px",
                    height: "24px",
                    marginRight: "8px",
                    borderStyle: "none",
                    objectFit: "cover",
                    objectPosition: "center center",
                    zIndex: 999,
                  }}
                />
                <span>이 지역 다시 검색</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CenterMap;
