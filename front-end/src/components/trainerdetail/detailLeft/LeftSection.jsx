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
import { useNavigate, useParams } from "react-router-dom";

const LeftSection = () => {
  const { trainerId } = useParams();
  const navigate = useNavigate();
  const { isPending, error, data } = useQuery({
    queryKey: ["trainerDetail"],
    queryFn: () =>
      fetch(`http://localhost:5000/trainerDetail/left/${trainerId}`, {
        method: "GET",
      }).then((res) => res.json()),
  });

  if (isPending) return <LoadingSpinner />;

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="leftSection">
      <LeftIntro data={data.info1} />
      <Qualifications data={data.info2} />
      <TrainerSchedule />
      <Program />
      <Review />
      <LessonPrice />
      <CenterPlace />
    </div>
  );
};

export default LeftSection;
