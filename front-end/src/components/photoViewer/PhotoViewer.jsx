import React, { useEffect, useState } from "react";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import axios from "axios";
import "./PhotoViewer.scss";
import { ImCancelCircle } from "react-icons/im";

const PhotoViewer = ({ center_id, fileName }) => {
  const [isViewerOpen, setViewerOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const handleViewerToggle = () => {
    setViewerOpen(!isViewerOpen);
  };

  useEffect(() => {
    const handleDownload = async () => {
      try {
        const dotIndex = fileName.indexOf(".");
        const imgType = fileName.substring(dotIndex + 1);
        const response2 = await axios.get(
          `http://localhost:5000/file/download/center/${center_id}/${fileName}`,
          {
            responseType: "arraybuffer",
          }
        );

        const blob = new Blob([response2.data], { type: `image/${imgType}` }); // 이미지 타입에 맞게 설정
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      } catch (error) {
        console.error("이미지 다운로드 실패:", error);
      }
    };

    handleDownload();
  }, []);

  return (
    <div>
      <button onClick={handleViewerToggle} className="photo__vr__btn">
        VR 보기
      </button>
      {isViewerOpen && (
        <div className="photoBox360">
          <button
            className="photoCancel360"
            onClick={() => {
              const photoBox360 = document.querySelector(".photoBox360");
              photoBox360.style.visibility = "hidden";
              setTimeout(() => {
                photoBox360.style.visibility = "visible";
                setViewerOpen(false);
              }, 500);
            }}
          >
            <ImCancelCircle />
          </button>
          <ReactPhotoSphereViewer src={imageUrl} width={"90%"} height={"80%"} />
        </div>
      )}
    </div>
  );
};

export default PhotoViewer;
