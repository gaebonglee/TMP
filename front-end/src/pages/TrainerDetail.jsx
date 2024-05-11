import React, { createRef, useRef, useState } from "react";
import Menu from "../components/trainerdetail/menu/Menu";
import DetailMainContents from "../components/trainerdetail/DetailMainContents";

const TrainerDetail = ({ loginInfo }) => {
  const [trainerInfo, setTrainerInfo] = useState("coach");
  const handleTrainerInfo = (infoName) => {
    setTrainerInfo(infoName);
  };
  const sectionRefs = useRef({
    header_section1: createRef(),
    header_section2: createRef(),
    header_section3: createRef(),
    header_section4: createRef(),
    header_section5: createRef(),
    header_section6: createRef(),
    header_section7: createRef(),
    header_section8: createRef(),
    header_section9: createRef(),
    header_section10: createRef(),
    header_section11: createRef(),
    // 추가 섹션이 있다면 여기에 더 추가
  });
  return (
    <section>
      <Menu
        trainerInfo={trainerInfo}
        handleTrainerInfo={handleTrainerInfo}
        sectionRefs={sectionRefs}
      />
      <DetailMainContents
        trainerInfo={trainerInfo}
        sectionRefs={sectionRefs}
        loginInfo={loginInfo}
      />
    </section>
  );
};

export default TrainerDetail;
