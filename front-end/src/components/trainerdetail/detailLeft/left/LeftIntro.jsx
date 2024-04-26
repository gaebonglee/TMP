import React, { useState } from "react";
import "./LeftIntro.scss";
import { useParams } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import ImageUpload from "../../../imageUpload/ImageUpload";

const LeftIntro = ({ data }) => {
  const [visible, setVisible] = useState(8); // 처음에는 8개의 이미지만 보여줌
  const [seeMore, setSeeMore] = useState(true); // 처음에는 8개의 이미지만 보여줌

  const fileNames = data.intro_img.split(",");

  // const [selectedFile, setSelectedFile] = useState(null);

  // const handleSubmit = async () => {
  //   const formData = new FormData();
  //   formData.append("image", selectedFile);

  //   try {
  //     await axios.post("http://localhost:5000/file/upload", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     console.log("이미지 업로드 성공.");
  //   } catch (error) {
  //     console.error("이미지 업로드 실패:", error);
  //   }
  // };

  const showMoreImages = () => {
    setVisible(fileNames.length); // 모든 이미지를 보여줌
    setSeeMore(false);
  };

  // const [images, setImages] = useState([]);

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   const imageUrl = URL.createObjectURL(file);

  //   // 새 이미지 URL을 기존 이미지 배열에 추가
  //   setImages((prevImages) => [...prevImages, imageUrl]);
  // };
  return (
    <div className="intro_detail" id="intro_page_contents_wrap">
      <h1>선생님 소개</h1>
      <div id="wrap_container">
        <div className="intro_photo">
          {fileNames.slice(0, visible).map((result, index) => (
            <div className="image_container" key={index}>
              <img
                src={`https://storage.googleapis.com/cda_file/trainer/${data.user_id}/${result}`}
                alt={`Loaded file ${index}`}
                className="intro_photos"
                onClick={index === 7 ? showMoreImages : undefined}
              />
              {index === 7 && seeMore && (
                <div className="overlay" onClick={showMoreImages}>
                  더 보기
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="intro_text">
          {data.intro_img && <br />}
          <p>{data.intro}</p>
        </div>
      </div>
    </div>
  );
};

export default LeftIntro;
