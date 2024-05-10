import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";

// 기본 이미지 경로
const defaultImagePath = "/image/tmp_mainlogo2.png";

const RightEditSection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [trainerName, setTrainerName] = useState("");

  const {
    isLoading,
    error,
    data: userInfo,
  } = useQuery({
    queryKey: ["userInfo"], // 문자열 형태로 전달
    queryFn: async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/session/checkSession",
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }
        return response.json();
      } catch (error) {
        throw new Error("Failed to fetch user info: " + error.message);
      }
    },
  });

  useEffect(() => {
    if (!isLoading && userInfo) {
      const { user_name } = userInfo;
      setTrainerName(user_name);
    }
  }, [isLoading, userInfo]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="right_edit_container">
      <div className="right_edit_img_container">
        <img
          src={
            selectedFile ? URL.createObjectURL(selectedFile) : defaultImagePath
          }
          className="right_edit_img"
          alt="right_edit_img"
        />
      </div>
      <div className="right_edit_wrap">
        <div className="right_edit_top">
          <div className="right_edit_top_wrap">
            <p>{trainerName} 트레이너</p>
            <label
              htmlFor="fileInput"
              style={{ textDecorationLine: "underline", cursor: "pointer" }}
            >
              프로필 사진변경
            </label>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
          <p>센터없음</p>
          <div className="star_wrap">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
        </div>
        <div className="right_edit_bottom">
          <p>한줄소개내용</p>
          <div className="right_edit_bottom_flex">
            <div className="bottom_flexLeft">
              <p>자격검증</p>
              <p>전문분야</p>
            </div>
            <div className="bottom_flexRight">
              <p>개수</p>
              <p>바디프로필, 바디프로필, 바디프로필</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightEditSection;
