import React, { useState } from "react";
import "./LeftIntro.scss";
import { useParams } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import ImageUpload from "../../../imageUpload/ImageUpload";

const LeftIntro = () => {
  const { trainerId } = useParams();
  const [visible, setVisible] = useState(8); // 처음에는 8개의 이미지만 보여줌
  const [seeMore, setSeeMore] = useState(true); // 처음에는 8개의 이미지만 보여줌

  const fileNames = [
    "t1.jpg",
    "t2.jpg",
    "t3.jpg",
    "t4.jpg",
    "t5.jpg",
    "t6.jpg",
    "t7.jpg",
    "t8.jpg",
    "t9.jpg",
    "t10.jpg",
  ]; // 다운로드 받고자 하는 파일 목록

  // {fileNames.slice(0, visible).map((result, index) => (
  //   <div className="image_container" key={index}>
  //     <img
  //       src={`https://storage.googleapis.com/cda_file/trainer/${trainerId}/${result}`}
  //       alt={`Loaded file ${index}`}
  //       className="intro_photos"
  //       onClick={index === 7 ? showMoreImages : undefined}
  //     />
  //     {index === 7 && seeMore && (
  //       <div className="overlay" onClick={showMoreImages}>
  //         더 보기
  //       </div>
  //     )}
  //   </div>
  // ))}
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      await axios.post("http://localhost:5000/file/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("이미지 업로드 성공.");
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
    }
  };
  const showMoreImages = () => {
    setVisible(fileNames.length); // 모든 이미지를 보여줌
    setSeeMore(false);
  };
  const [images, setImages] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);

    // 새 이미지 URL을 기존 이미지 배열에 추가
    setImages((prevImages) => [...prevImages, imageUrl]);
  };
  return (
    <div className="intro_detail" id="intro_page_contents_wrap">
      <h1>선생님 소개</h1>
      <div id="wrap_container">
        <ImageUpload />
        <div className="intro_photo"></div>
        <div className="intro_text">
          <p>
            테스트 내용입니다.테스트 내용입니다.테스트 내용입니다.테스트
            내용입니다.테스트 내용입니다.테스트 내용입니다.테스트
            내용입니다.테스트 내용입니다.테스트 내용입니다.테스트
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeftIntro;
