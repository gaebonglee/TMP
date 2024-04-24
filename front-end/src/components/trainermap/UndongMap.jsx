import React, { useEffect, useRef, useState } from "react";
import "./UnDongMap.scss";
import { TbRestore } from "react-icons/tb";
import { BiTargetLock } from "react-icons/bi";
import LoadingSpinner from "./LoadingSpinner";

const UndongMap = (props) => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
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

  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      throw new Error("Geolocation is not supported");
    }

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        });
      });

      const { latitude, longitude } = position.coords;
      return { latitude, longitude };
    } catch (error) {
      alert("Error getting current location:", error);
      throw error;
    }
  };

  const updateCurrentLocation = async () => {
    try {
      const { latitude, longitude } = await getCurrentLocation();
      setLatitude(latitude);
      setLongitude(longitude);
      setCurrentLatitude(latitude);
      setCurrentLongitude(longitude);

      const newLocation = new window.naver.maps.LatLng(latitude, longitude);
      if (currentLocationMarker.current) {
        currentLocationMarker.current.setPosition(newLocation);
      }
      map.panTo(newLocation);
    } catch (error) {
      console.error("Error updating current location:", error);
    }
  };

  const fetchTrainers = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `http://localhost:5000/center?lat=${latitude}&lng=${longitude}`
      );
      const data = await response.json();
      setTrainers(data);
    } catch (error) {
      console.error("Error fetching trainers:", error);
    }
  };

  const handleResearchClick = async () => {
    try {
      const { latitude, longitude } = await getCurrentLocation();
      const newLocation = new window.naver.maps.LatLng(latitude, longitude);

      if (currentLocationMarker.current) {
        currentLocationMarker.current.setPosition(newLocation);
      }

      await fetchTrainers(latitude, longitude);
    } catch (error) {
      console.error("Error getting current location:", error);
    }
  };

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
      const newMap = new naver.maps.Map(mapRef.current, mapOptions);
      setMap(newMap);

      const markerElement = document.createElement("div");
      markerElement.innerHTML = `
        <div class="markerWrap" data-marker-id="currentLocation">현재 위치 HPE 교육센터</div>
        <div class="markerPin" data-marker-id="currentLocation"></div>
      `;

      const marker = new naver.maps.Marker({
        position: location,
        map: newMap,
        icon: {
          content: markerElement,
        },
      });

      currentLocationMarker.current = marker;
      markers.push(marker);

      naver.maps.Event.addListener(marker, "click", function () {
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
        marker.setAnimation(naver.maps.Animation.BOUNCE);
        setTimeout(() => {
          marker.setAnimation(null);
        }, 700);
        newMap.panTo(location);
      });

      const searchAddress = () => {
        if (props.address) {
          naver.maps.Service.geocode(
            {
              query: props.address,
            },
            function (status, response) {
              if (status === naver.maps.Service.Status.ERROR) {
                console.error("Failed to find address");
                return;
              }
              const result = response.v2.addresses[0];
              const newLocation = new naver.maps.LatLng(result.y, result.x);
              setLatitude(result.y);
              setLongitude(result.x);
              newMap.setCenter(newLocation);
              marker.setPosition(newLocation);
            }
          );
        }
      };

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

      updateCurrentLocation();
      const intervalId = setInterval(updateCurrentLocation, 5000);

      return () => {
        clearInterval(intervalId);
      };
    };

    loadNaverMapsScript();
  }, [trainers]);

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
