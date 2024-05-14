import React, { useEffect, useRef, useState, useCallback } from "react";
import "./UnDongMap.scss";
import { TbRestore } from "react-icons/tb";
import { BiTargetLock } from "react-icons/bi";
import useScript from "hooks/useScript";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

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
    searchCenter,
    setIsLoading,
    newCenter,
    clickedTrainers,
    setClickedTrainers,
  } = props;
  const markers = useRef([]);
  const currentLocationMarker = useRef(null);
  const scriptStatus = useScript(
    "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=0dfie9x7ty&submodules=geocoder"
  );
  const url = useLocation();

  var urlLat = null;
  var urlLng = null;

  var cCenter;
  // useEffect(() => {
  //   if (map) {
  //     console.log(newCenter);
  //   }
  // }, [newCenter]);

  useEffect(() => {
    if (url.search !== "") {
      const location = url.search.split(",");
      urlLat = location[0].slice(13);
      urlLng = location[1].slice(4, 15);
    }
    const getCurrentPosition = () => {
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
      try {
        const position = await getCurrentPosition();

        setCurrentLatitude(position.coords.latitude);
        setCurrentLongitude(position.coords.longitude);
      } catch (error) {
        if (error.code === 1) {
          Swal.fire(
            "위치 정보 액세스 권한이 거부되었습니다. 권한을 허용해주세요."
          );
        }
      }
    };

    if (mapRef.current && window.naver && window.naver.maps) {
      if (urlLat == null) {
        if (newCenter.current !== null) {
          setCurrentLatitude(newCenter.current[0]);
          setCurrentLongitude(newCenter.current[1]);
        } else {
          initMapAfterLocationUpdate();
          updateCurrentLocation();
        }
      } else {
        setCurrentLatitude(urlLat);
        setCurrentLongitude(urlLng);
      }
      initMap();
    }
  }, [currentLatitude]);

  if (map) {
    window.naver.maps.Event.addListener(map, "bounds_changed", function () {
      newCenter.current = [map.getCenter().y, map.getCenter().x];
    });
  }
  const initMap = () => {
    if (window.naver && window.naver.maps) {
      cCenter = new window.naver.maps.LatLng(currentLatitude, currentLongitude);
      const mapOptions = {
        center: cCenter,
        zoom: 15,
        scrollWheel: true,
        draggable: true,
        disableDoubleClickZoom: false,
        scaleControl: true,
        zoomControl: true,
        zoomControlOptions: {
          style: window.naver.maps.ZoomControlStyle.MEDIUM,
          position: window.naver.maps.Position.TOP_RIGHT,
        },
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: window.naver.maps.MapTypeControlStyle.BUTTON,
          position: window.naver.maps.Position.TOP_RIGHT,
        },
      };
      const newMap = new window.naver.maps.Map(mapRef.current, mapOptions);
      setMap(newMap);
      const markerElement = document.createElement("div");
      markerElement.innerHTML = `
      <div class="markerWrap markerActiveWrap" data-marker-id="currentLocation"></div>
      <div class="markerPin markerActivePin" data-marker-id="currentLocation"></div>
    `;

      const marker = new window.naver.maps.Marker({
        position: cCenter,
        map: newMap,
        icon: {
          content: markerElement,
        },
      });

      currentLocationMarker.current = marker;
      markers.current.push(marker);

      window.naver.maps.Event.addListener(marker, "click", function () {
        const markerWrap = markerElement.querySelector(
          '.markerWrap[data-marker-id="currentLocation"]'
        );
        const markerPin = markerElement.querySelector(
          '.markerPin[data-marker-id="currentLocation"]'
        );
        if (markerWrap && markerPin) {
          markers.current.forEach((m) => {
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

        markers.current.push(marker);

        window.naver.maps.Event.addListener(marker, "click", function () {
          const markerWrap = markerElement.querySelector(
            `.markerWrap[data-marker-id="${index}"]`
          );
          const markerPin = markerElement.querySelector(
            `.markerPin[data-marker-id="${index}"]`
          );
          if (markerWrap && markerPin) {
            markers.current.forEach((m) => {
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
          setClickedTrainers(...clickedTrainers, index);
          console.log("index:" + clickedTrainers);
        });
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (map && searchCenter[0] && searchCenter[1]) {
      map.panTo(new window.naver.maps.LatLng(searchCenter[0], searchCenter[1]));
    }
  }, [searchCenter]);

  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      throw new Error("Geolocation is not supported");
    }

    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 0,
      });
    });

    const { latitude, longitude } = position.coords;
    return { latitude, longitude };
  };

  const updateCurrentLocation = async () => {
    try {
      if (url.search !== "") {
        window.location = "/trainermap";
      }
      const { latitude, longitude } = await getCurrentLocation();

      setCurrentLatitude(latitude);
      setCurrentLongitude(longitude);

      const newLocation = new window.naver.maps.LatLng(latitude, longitude);
      if (currentLocationMarker.current) {
        currentLocationMarker.current.setPosition(newLocation);
      }
      if (map) {
        map.panTo(newLocation);
      }
    } catch (error) {
      console.error("Error updating current location:", error);
    }
  };

  const handleResearchClick = async () => {
    if (!map) {
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
        throw new Error(`HTTP 에러 ${response.status}`);
      }

      const data = await response.json();
      setTrainers(data);

      // 현재 위치 마커 제거
      currentLocationMarker.current.setMap(null);

      // 기존 마커들 제거
      markers.current.forEach((marker) => {
        marker.setMap(null);
      });
      markers.current = [];

      // 새로운 마커들 추가
      data.forEach((trainer) => {
        const markerLocation = new window.naver.maps.LatLng(
          trainer.latitude,
          trainer.longitude
        );

        const markerElement = document.createElement("div");
        markerElement.innerHTML = `
          <div class="markerWrap" data-marker-id="${trainer.user_id}">${trainer.center_name}</div>
          <div class="markerPin" data-marker-id="${trainer.user_id}"></div>
        `;

        const marker = new window.naver.maps.Marker({
          position: markerLocation,
          map: map, // 기존 map 객체 사용
          icon: {
            content: markerElement,
          },
        });

        markers.current.push(marker);

        // 마커 클릭 이벤트 핸들러 추가
        // window.naver.maps.Event.addListener(marker, "click", () => {
        //   setTrainerIndex(trainer.user_id);
        //   // 추가 동작 구현...
        // });
      });
    } catch (error) {
      console.error("Error fetching trainers:", error);
    } finally {
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
      {scriptStatus === "ready" ? (
        setIsLoading(false)
      ) : (
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
      )}
    </div>
  );
};

export default UndongMap;
