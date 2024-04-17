import React from "react";

const TrainerListItem = () => {
  return (
    <div
      className="TrainerListItem"
      style={{
        marginBottom: 17,
        width: 491,
        height: 198,
        position: "relative",
        background: "white",
        borderRadius: 24,
        overflow: "hidden",
        border: "2px #A2EE94 solid",
      }}
    >
      <div
        style={{
          left: 178,
          top: 24,
          position: "absolute",
          color: "black",
          fontSize: 16,
          fontFamily: "Inter",
          fontWeight: "600",

          wordWrap: "break-word",
        }}
      >
        @@@ 선생님
      </div>
      <div
        className="3050000"
        style={{
          width: 283,
          height: 57,
          left: 178,
          top: 54,
          position: "absolute",
        }}
      >
        <span
          style={{
            color: "black",
            fontSize: 15,
            fontFamily: "Inter",
            fontWeight: "600",

            wordWrap: "break-word",
          }}
        >
          [서울 피티 대표] <br />
          ~~스포츠모델 그랑프리
          <br />
          <br />
        </span>
        <span
          style={{
            color: "#6D6D6D",
            fontSize: 15,
            fontFamily: "Inter",
            fontWeight: "600",

            wordWrap: "break-word",
          }}
        >
          30회 기준 회당{" "}
        </span>
        <span
          style={{
            color: "#6D6D6D",
            fontSize: 15,
            fontFamily: "Inter",
            fontWeight: "800",

            wordWrap: "break-word",
          }}
        >
          50,000원
          <br />
        </span>
      </div>
      <div
        className="Pt10"
        style={{
          height: 19,
          left: 200,
          top: 135,
          position: "absolute",
          color: "#6D6D6D",
          fontSize: 15,
          fontFamily: "Inter",
          fontWeight: "600",
          marginTop: 5,
          wordWrap: "break-word",
        }}
      >
        서울 PT샵 강남점 - 강남역 보도 10분
      </div>
      <div
        className="Nn"
        style={{
          height: 23,
          left: 398,
          top: 24,
          position: "absolute",
          color: "black",
          fontSize: 16,
          fontFamily: "Inter",
          fontWeight: "600",

          wordWrap: "break-word",
        }}
      >
        후기 NN개
      </div>
      <img
        className="trainerimg"
        style={{
          width: 160,
          height: 199,
          left: 0,
          top: 0,
          position: "absolute",
        }}
        src="img/morae.jpg"
        alt="1"
      />
      <img
        className="MapPin"
        style={{
          width: 20,
          height: 19,
          left: 178,
          top: 140,
          position: "absolute",
        }}
        src="img/map-pin-line.svg"
        alt="2"
      />
      <img
        className="StarFill"
        style={{
          width: 22,
          height: 21,
          left: 370,
          top: 24,
          position: "absolute",
        }}
        src="img/star-fill.svg"
        alt="3"
      />
    </div>
  );
};

export default TrainerListItem;
