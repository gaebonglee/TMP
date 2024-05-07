import React, { useEffect } from "react";
import LeftEdit from "../trainerdetailinfo/profile/leftsection/LeftEdit";
import RightEdit from "../trainerdetailinfo/profile/rightsection/RightEdit";
import "../../../components/trainerdetail/DetailMainContents.scss";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "components/trainermap/LoadingSpinner";

const TrainerEditForm = ({ userId }) => {
  const navigate = useNavigate();
  const { isPending, error, data } = useQuery({
    queryKey: ["trainerDetail"],
    queryFn: () =>
      fetch(`http://localhost:5000/trainerDetail/${userId}`, {
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

  return (
    <div className="DetailMainContents">
      <div className="DetailMain">
        <div className="DetailMainPadding">
          <div className="LeftSection">
            <LeftEdit data={data} userId={userId} />
          </div>
          <div className="RightIntro">
            <RightEdit data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerEditForm;
