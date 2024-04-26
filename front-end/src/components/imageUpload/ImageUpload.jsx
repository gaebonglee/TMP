import axios from "axios";
import React, { useState } from "react";

const ImageUpload = () => {
  const [images, setImages] = useState([]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const mappedFiles = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prevImages) => [...prevImages, ...mappedFiles]);
  };

  const uploadImages = async () => {
    const formData = new FormData();
    images.forEach((image) => formData.append("files", image.file));

    try {
      const response = await axios.post(
        "http://localhost:5000/file/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("업로드 성공:", response.data);
    } catch (error) {
      console.error("업로드 실패:", error);
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleImageChange} />
      <button onClick={uploadImages}>업로드</button>
      <div>
        {images.map((image, index) => (
          <img
            key={index}
            src={image.preview}
            alt="preview"
            style={{ width: "100px", height: "100px" }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
