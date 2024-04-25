import React, { useEffect, useRef, useState } from "react";
import "./UnDongMap.scss";
import { TbRestore } from "react-icons/tb";
import { BiTargetLock } from "react-icons/bi";
import LoadingSpinner from "./LoadingSpinner";

const UndongMap = (props) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
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

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported"));
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    });
  };

  const updateCurrentLocation = async () => {
    try {
      const { latitude, longitude } = await getCurrentLocation();
      setLatitude(latitude);
      setLongitude(longitude);
      setCurrentLatitude(latitude);
      setCurrentLongitude(longitude);

      if (map) {
        const newLocation = new window.naver.maps.LatLng(latitude, longitude);
        if (currentLocationMarker.current) {
          currentLocationMarker.current.setPosition(newLocation);
        }
        map.panTo(newLocation);
      }
    } catch (error) {
      console.error("Error updating current location:", error);
    }
  };



  const handleResearchClick = () => {
    console.log(latitude, longitude);
  };

  useEffect(() => {
    const initializeMap = async () => {
      try {
        const { latitude, longitude } = await getCurrentLocation();
        setLatitude(latitude);
        setLongitude(longitude);
        setCurrentLatitude(latitude);
        setCurrentLongitude(longitude);

        const mapOptions = {
          center: new window.naver.maps.LatLng(latitude, longitude),
          zoom: 15,
          zoomControl: true,
          zoomControlOptions: {
            position: window.naver.maps.Position.TOP_RIGHT,
          },
        };
        const newMap = new window.naver.maps.Map(mapRef.current, mapOptions);
        setMap(newMap);

        const markerElement = document.createElement("div");
        markerElement.innerHTML = `
          <div class="markerWrap" data-marker-id="currentLocation">현재 위치 HPE 교육센터</div>
          <div class="markerPin" data-marker-id="currentLocation"></div>
        `;

        const marker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(latitude, longitude),
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
          newMap.panTo(new window.naver.maps.LatLng(latitude, longitude));
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

        setIsLoading(false);
      } catch (error) {
        console.error("Error initializing map:", error);
        setIsLoading(false);
      }
    };

    const loadNaverMapsScript = () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=0dfie9x7ty&submodules=geocoder";
      script.async = true;
      script.onload = () => {
        initializeMap();
      };
      document.head.appendChild(script);
    };

    loadNaverMapsScript();
  }, [trainers]);

  useEffect(() => {
    if (map && latitude && longitude) {
      const intervalId = setInterval(updateCurrentLocation, 10000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [map, latitude, longitude]);

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
