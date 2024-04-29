import React, { useEffect, useRef, useState, useCallback } from "react";
import "./UnDongMap.scss";
import { TbRestore } from "react-icons/tb";
import { BiTargetLock } from "react-icons/bi";
import LoadingSpinner from "./LoadingSpinner";

const UndongMap = (props) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const {
    trainers,
    setTrainers,
    setTrainerIndex,
    setCurrentLatitude,
    setCurrentLongitude,
    currentLatitude,
    currentLongitude,
    setIsLoading,
    searchCenter,
  } = props;
  const markers = [];
  const currentLocationMarker = useRef(null);
  const coords = useRef({ latitude: 0, longitude: 0 });
  const [currentLocationSearchData, setCurrentLocationSearchData] = useState(
    {}
  );

  const initMap = useCallback(() => {
    if (mapRef.current && window.naver && window.naver.maps) {
      const center = new window.naver.maps.LatLng(
        currentLatitude,
        currentLongitude
      );
      const mapOptions = {
        center,
        zoom: 15,
      };
      const newMap = new window.naver.maps.Map(mapRef.current, mapOptions);
      setMap(newMap);

      const markerElement = document.createElement("div");
      markerElement.innerHTML = `
        <div class="markerWrap markerActiveWrap" data-marker-id="currentLocation"></div>
        <div class="markerPin markerActivePin" data-marker-id="currentLocation"></div>
      `;

      const marker = new window.naver.maps.Marker({
        position: center,
        map: newMap,
        icon: {
          content: markerElement,
        },
      });

      currentLocationMarker.current = marker;
      markers.push(marker);

      window.naver.maps.Event.addListener(marker, "click", function () {
        const markerWrap = markerElement.querySelector(
          '.markerWrap[data-marker-id="currentLocation"]'
        );
        const markerPin = markerElement.querySelector(
          '.markerPin[data-marker-id="currentLocation"]'
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
        marker.setAnimation(window.naver.maps.Animation.BOUNCE);
        setTimeout(() => {
          marker.setAnimation(null);
        }, 700);
        newMap.panTo(center);
      });

      trainers.forEach((trainer, index) => {
        const markerLatitude = trainer.latitude;
        const markerLongitude = trainer.longitude;
        const markerLocation = new window.naver.maps.LatLng(
          markerLatitude,
          markerLongitude
        );

        const markerElement = document.createElement("div");
        markerElement.innerHTML = `
          <div class="markerWrap" data-marker-id="${index}">${trainer.center_name}</div>
          <div class="markerPin" data-marker-id="${index}"></div>
        `;

        const marker = new window.naver.maps.Marker({
          position: markerLocation,
          map: newMap,
          icon: {
            content: markerElement,
          },
        });

        markers.push(marker);

        window.naver.maps.Event.addListener(marker, "click", function () {
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
          marker.setAnimation(window.naver.maps.Animation.BOUNCE);
          setTimeout(() => {
            marker.setAnimation(null);
          }, 700);
          newMap.panTo(markerLocation);

          setTrainerIndex(index);
        });
      });

      updateCurrentLocation();
    }
  }, [currentLatitude, currentLongitude, trainers, setTrainerIndex]);

  useEffect(() => {
    if (map && searchCenter) {
      map.panTo(searchCenter);
    }
  }, [searchCenter]);

  useEffect(() => {
    const scriptId = "naver-maps-script";
    const loadNaverMapsScript = () => {
      if (!document.getElementById(scriptId)) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.type = "text/javascript";
        script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=0dfie9x7ty&callback=initMap&submodules=geocoder`;
        script.async = true;
        document.head.appendChild(script);
        script.onload = () => {
          initMap();
        };
      } else {
        initMap();
      }
    };

    loadNaverMapsScript();
  }, [initMap]);

  useEffect(() => {
    const getCurrentPosition = () => {
      setIsLoading(true);
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        });
        setIsLoading(false);
      });
    };

    const initMapAfterLocationUpdate = async () => {
      setIsLoading(true);
      try {
        await getCurrentPosition();
        initMap();
      } catch (error) {
        if (error.code === 1) {
          alert("위치 정보 액세스 권한이 거부되었습니다. 권한을 허용해주세요.");
        } else {
          console.error("Error getting current location:", error);
          setCurrentLatitude(37.5665);
          setCurrentLongitude(126.978);
          console.log(
            "현재 위치를 가져오는 데 실패했습니다. 기본 위치로 지도를 초기화합니다."
          );
        }
        initMap();
        setIsLoading(false);
      }
    };

    initMapAfterLocationUpdate();
  }, [setCurrentLatitude, setCurrentLongitude, initMap]);

  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      throw new Error("Geolocation is not supported");
    }

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        });
      });

      const { latitude, longitude } = position.coords;
      return { latitude, longitude };
    } catch (error) {
      console.log("Error getting current location:", error);
      throw error;
    }
  };

  const updateCurrentLocation = async () => {
    try {
      const { latitude, longitude } = await getCurrentLocation();

      setCurrentLatitude(latitude);
      setCurrentLongitude(longitude);

      const newLocation = new window.naver.maps.LatLng(latitude, longitude);
      if (currentLocationMarker.current) {
        currentLocationMarker.current.setPosition(newLocation);
      }
      if (map) {
        map.setCenter(newLocation);
      }
    } catch (error) {
      console.error("Error updating current location:", error);
    }
  };

  const handleResearchClick = async () => {
    if (!map) {
      console.error("Map object is not initialized.");
      return;
    }

    try {
      setIsLoading(true);

      const bounds = map.getBounds();
      const southWest = bounds.getSW();
      const northEast = bounds.getNE();

      const currentLocationSearchData = {
        SWlatitude: southWest.lat(),
        SWlongitude: southWest.lng(),
        NElatitude: northEast.lat(),
        NElongitude: northEast.lng(),
      };

      const response = await fetch(
        "http://localhost:5000/center/currentlocation",
        {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentLocationSearchData),
        }
      );

      if (!response.ok) {
        setIsLoading(false);
        throw new Error(`HTTP 에러 ${response.status}`);
      }

      const data = await response.json();
      setIsLoading(false);
      setTrainers(data);
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
      setIsLoading(false);
    }
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
      <div ref={mapRef} style={mapStyle}>
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
    </div>
  );
};

export default UndongMap;
