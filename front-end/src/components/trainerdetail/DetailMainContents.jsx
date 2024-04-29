import React, { useEffect } from "react";
import LeftSection from "../trainerdetail/detailLeft/LeftSection";
import RightIntro from "../trainerdetail/detailRight/RightIntro";
import "./DetailMainContents.scss";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../trainermap/LoadingSpinner";
import LeftSectionCenter from "./detailLeft/LeftSectionCenter";
import LeftSectionReview from "./detailLeft/LeftSectionReview";

const DetailMainContents = ({ trainerInfo }) => {
  const { trainerId } = useParams();
  const navigate = useNavigate();
  const { isPending, error, data } = useQuery({
    queryKey: ["trainerDetail"],
    queryFn: () =>
      fetch(`http://localhost:5000/trainerDetail/${trainerId}`, {
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
    <div className="DetailMainContents">
      <div className="DetailMain">
        <div className="DetailMainPadding">
          <div className="LeftSection">
            {trainerInfo === "coach" ? (
              <LeftSection data={data} />
            ) : trainerInfo === "center" ? (
              <LeftSectionCenter data={data} />
            ) : (
              // 변경해야 컴포넌트
              <LeftSectionReview data={data} />
            )}
          </div>
          <div className="RightIntro">
            <RightIntro data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailMainContents;
