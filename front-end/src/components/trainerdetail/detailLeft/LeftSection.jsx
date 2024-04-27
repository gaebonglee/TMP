import React, { useEffect } from "react";
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

  useEffect(() => {
    if (!isPending && (!data || !data.info1)) {
      navigate("/");
    }
  }, [data, isPending, navigate]);

  if (isPending) return <LoadingSpinner />;

  if (error) return "An error has occurred: " + error.message;

  if (!data || !data.info1) {
    return null;
  }

  console.log(data);
  return (
    <div className="leftSection">
      <LeftIntro data={data.info1} />
      <Qualifications data={data.info2} />
      <TrainerSchedule data={data.info1} />
      <Program data={data.info3} />
      <Review />
      <LessonPrice data={data.info4} />
      <CenterPlace data={data.info1} />
    </div>
  );
};

export default LeftSection;
