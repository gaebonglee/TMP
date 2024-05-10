import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./RightEdit.scss";

// 기본 이미지 경로
const defaultImagePath = "/image/tmp_mainlogo2.png";

const RightEdit = ({ data }) => {
  const userInfo = data.info1;
  const [selectedFile, setSelectedFile] = useState(data.info1.user_img);
  const reviewSum = data.infoReview.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.point;
  }, 0);
  const reviewAvg = reviewSum / data.infoReview.length;
  const reviewArr = [0, 1, 2, 3, 4];
  const handleFileChange = async (event) => {
    const files = event.target.files[0];
    console.log(files);
    const filesInfo = [
      {
        name: files.name,
        type: files.type,
      },
    ];

    // const deleteResponse = await fetch(
    //   "http://localhost:5000/file/delete-files",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       files: [files.name],
    //       userId: userInfo.user_id,
    //       table: "user",
    //     }),
    //   }
    // );

    const response = await fetch(
      "http://localhost:5000/file/generate-signed-url",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          files: filesInfo,
          userId: userInfo.user_id,
          table: "user",
        }),
      }
    );

    const { signedUrls } = await response.json();

    await Promise.all(
      signedUrls.map(async ({ name, url }) => {
        const result = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": files.type,
          },
          body: files,
        });

        if (result.ok) {
          console.log(`${name} uploaded successfully.`);
        } else {
          console.error(`Failed to upload ${name}.`);
        }
      })
    );

    setSelectedFile(event.target.files[0].name);
    console.log("변경 이미지 ::", event.target.files[0].name);
  };

  return (
    <div className="right_edit_container">
      <div className="right_edit_img_container">
        <img
          src={
            selectedFile
              ? `${process.env.REACT_APP_FILE_SERVER_URL}/user/${userInfo.user_id}/${selectedFile}`
              : defaultImagePath
          }
          className="right_edit_img"
          alt="right_edit_img"
        />
      </div>
      <div className="right_edit_wrap">
        <div className="right_edit_top">
          <div className="right_edit_top_wrap">
            <p>{userInfo.user_name} 트레이너&nbsp;</p>
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
          <p>{data.info1.center_name}</p>
          <div className="trainer_star">
            <div className="star_wrap">
              {reviewArr.map((_v, i) => {
                return i < reviewAvg ? (
                  <FaStar key={i} />
                ) : (
                  <FaStar key={i} style={{ color: "black" }} />
                );
              })}
            </div>
            <div className="review_average_score">
              {!!reviewAvg ? reviewAvg.toFixed(1) : 0.0}&nbsp;(
              {data.infoReview.length})
            </div>
          </div>
        </div>
        <div className="right_edit_bottom">
          <p>{data.info1.short_intro}</p>
          <div className="right_edit_bottom_flex">
            <div className="bottom_flexLeft">
              <p>자격검증</p>
              <p>전문분야</p>
            </div>
            <div className="bottom_flexRight">
              <p>{data.info2.length}개</p>
              <p>{data.info1.trainning_type}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightEdit;
