import React from "react";
import TrainerEditForm from "../components/mypage/trainerdetailinfo/TrainerEditForm";
const TrainerProfileEdit = ({ userId }) => {
  return (
    <div>
      <TrainerEditForm userId={userId} />
    </div>
  );
};

export default TrainerProfileEdit;
