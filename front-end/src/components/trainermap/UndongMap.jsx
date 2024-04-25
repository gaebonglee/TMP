import React, { useEffect, useRef, useState } from "react";
import "./UnDongMap.scss";
import { TbRestore } from "react-icons/tb";
import { BiTargetLock } from "react-icons/bi";
import LoadingSpinner from "./LoadingSpinner";

const UndongMap = (props) => {
  const [latitude, setLatitude] = useState(37.5665);
  const [longitude, setLongitude] = useState(126.978);
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const {
    trainers,
    setTrainers,
    setTrainerIndex,
    setCurrentLatitude,
    setCurrentLongitude,
  } = props;
  const markers = [];
  const currentLocationMarker = useRef(null);
  const { naver } = window;
  useEffect(() => {
    const loadNaverMapsScript = () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=0dfie9x7ty&callback=initMap&submodules=geocoder`;
      script.async = true;
      script.onload = () => {
        initializeMap();
        setIsLoading(false);
      };
      document.head.appendChild(script);
      setIsLoading(false);
    };

    const initializeMap = () => {
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
      const newMap = new naver.maps.Map(mapRef.current, mapOptions);
      setMap(newMap);

      const marker = new naver.maps.Marker({
        position: location,
        map: newMap,
        icon: {
          content: `<div class="markerWrap">현재 위치 HPE 교육센터</div> <div class="markerPin"></div>`,
        },
      });
      currentLocationMarker.current = marker;

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
            setCurrentLatitude(latitude);
            setCurrentLongitude(longitude);
            const newLocation = new naver.maps.LatLng(latitude, longitude);
            newMap.setCenter(newLocation);
            marker.setPosition(newLocation);
          },
          (error) => {
            console.error("Error getting current location:", error);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }

      trainers.forEach((trainer, index) => {
        const markerLatitude = trainer.latitude;
        const markerLongitude = trainer.longitude;
        const markerLocation = new naver.maps.LatLng(
          markerLatitude,
          markerLongitude
        );

        const markerElement = document.createElement("div");
        markerElement.innerHTML = `
          <div class="markerWrap" data-marker-id="${index}">${trainer.center_name}</div>
          <div class="markerPin" data-marker-id="${index}"></div>
        `;

        const marker = new naver.maps.Marker({
          position: markerLocation,
          map: newMap,
          icon: {
            content: markerElement,
          },
        });

        markers.push(marker);

        naver.maps.Event.addListener(marker, "click", function () {
          const markerWrap = markerElement.querySelector(
            `.markerWrap[data-marker-id="${index}"]`
          );
          const markerPin = markerElement.querySelector(
            `.markerPin[data-marker-id="${index}"]`
          );
          if (markerWrap && markerPin) {
            markers.forEach((m) => {
              const wrap = m.icon.content.querySelector(".markerWrap");
              const pin = m.icon.content.querySelector(".markerPin");
              wrap.classList.remove("markerActiveWrap");
              pin.classList.remove("markerActivePin");
            });
            if (markerWrap.classList.contains("markerActiveWrap")) {
              markerWrap.classList.remove("markerActiveWrap");
              markerPin.classList.remove("markerActivePin");
            } else {
              markerWrap.classList.add("markerActiveWrap");
              markerPin.classList.add("markerActivePin");
            }
          }
          marker.setAnimation(naver.maps.Animation.BOUNCE);
          setTimeout(() => {
            marker.setAnimation(null);
          }, 700);
          newMap.panTo(markerLocation);

          setTrainerIndex(index);
        });
      });

      setIsLoading(false);
    };

    loadNaverMapsScript();
  }, [trainers]);

  const updateCurrentLocation = () => {
    if (map && currentLocationMarker.current) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          setCurrentLatitude(latitude);
          setCurrentLongitude(longitude);
          const newLocation = new naver.maps.LatLng(latitude, longitude);
          map.setCenter(newLocation);
          currentLocationMarker.current.setPosition(newLocation);
        },
        (error) => {
          console.error("Error getting current location:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    }
  };

  const handleResearchClick = () => {
    console.log(latitude, longitude);
  };

  const mapStyle = {
    width: "calc(100% - 528px)",
    height: "calc(100vh - 90px)",
    top: "90px",
    right: "0px",
    position: "absolute",
  };

  return (
    <div className="mapWrap">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="mapContainer" ref={mapRef} style={mapStyle}>
          <div>
            <div className="myLocation">
              <div className="btn" onClick={updateCurrentLocation}>
                <BiTargetLock size={27} color="#00491e" />
              </div>
            </div>
            <div className="research">
              <div className="researchBtn">
                <button
                  size="48"
                  color="#fff"
                  className="rBtn"
                  onClick={handleResearchClick}
                >
                  <TbRestore size={25} color="#00491e" />
                  <span>이 지역 다시 검색</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UndongMap;
