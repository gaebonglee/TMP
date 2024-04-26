import React from "react";
import LeftIntro from "./left/LeftIntro";
import Qualifications from "./left/Qualifications";
import TrainerSchedule from "./left/TrainerSchedule";
import Program from "./left/Program";
import Review from "./left/Review";
import LessonPrice from "./left/LessonPrice";
import CenterPlace from "./left/CenterPlace";
import "./LeftSection.scss";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../trainermap/LoadingSpinner";
const leftSection = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["loginInfo"],
    queryFn: () =>
      fetch("http://localhost:5000/session/checkSession", {
        method: "GET",
        credentials: "include",
      }).then((res) => res.json()),
  });

  if (isPending) return <LoadingSpinner />;

  if (error) return "An error has occurred: " + error.message;
  return (
    <div className="leftSection">
      <LeftIntro />
      <Qualifications />
      <TrainerSchedule />
      <Program />
      <Review />
      <LessonPrice />
      <CenterPlace />
    </div>
  );
};

export default leftSection;
