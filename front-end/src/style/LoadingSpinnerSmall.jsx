import React from "react";
import "./LoadingSpinnerSmall.scss";

const LoadingSpinnerSmall = () => {
  return (
    <div className="loading__small-overlay">
      <div className="loading__small-spinner"></div>
    </div>
  );
};

export default LoadingSpinnerSmall;
