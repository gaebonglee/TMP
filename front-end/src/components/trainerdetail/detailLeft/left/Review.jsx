import React, { useEffect, useState, useRef } from "react";
import "./Review.scss";
import { LuPencilLine } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Review = () => {
  const [reviewList, setReviewList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const fileInputRef = useRef(null);
  const [reviewContent, setReviewContent] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [sessionUserId, setSessionUserId] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const url = useLocation();

  const receivedId = url.pathname.split("/")[2];

  const handleStarClick = (rating) => {
    setSelectedRating(rating);
  };

  function handleReview() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setPreviewImages([]);
    setReviewContent("");
    setSelectedRating(0);
    setSelectedFiles([]);
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + selectedFiles.length > 3) {
      alert("최대 3개의 사진까지만 등록할 수 있습니다.");
      return;
    }

    setSelectedFiles([...selectedFiles, ...files]);

    for (let file of files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImages((prevImages) => [...prevImages, e.target.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index) => {
    const newPreviewImages = [...previewImages];
    const newSelectedFiles = [...selectedFiles];
    newPreviewImages.splice(index, 1);
    newSelectedFiles.splice(index, 1);
    setPreviewImages(newPreviewImages);
    setSelectedFiles(newSelectedFiles);
  };

  const handleReviewContentChange = (e) => {
    setReviewContent(e.target.value);
  };

  const handleFileUpload = async () => {
    try {
      const filesInfo = selectedFiles.map((file) => ({
        name: file.name,
        type: file.type,
      }));

      const response = await fetch(
        "http://localhost:5000/file/generate-signed-urls",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            files: filesInfo,
            userId: sessionUserId,
            table: "your_table_name",
          }),
        }
      );

      const { signedUrls } = await response.json();

      await Promise.all(
        signedUrls.map(async ({ name, url }) => {
          const file = selectedFiles.find((f) => f.name === name);
          const result = await fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": file.type,
            },
            body: file,
          });
          if (result.ok) {
            console.log(`${name} uploaded successfully.`);
          } else {
            console.error(`Failed to upload ${name}.`);
          }
        })
      );

      // 업로드된 파일의 URL을 가져오는 로직 추가
      const uploadedFileUrls = await Promise.all(
        signedUrls.map(async ({ name, url }) => {
          return `${process.env.FILE_SERVER_URL}/${url
            .split("/")
            .slice(-2)
            .join("/")}`;
        })
      );

      setPreviewImages([...previewImages, ...uploadedFileUrls]);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const handleFetchReview = async () => {
    if (selectedRating === 0) {
      alert("별점을 선택해주세요.");
      return;
    }

    if (!sessionUserId) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      await handleFileUpload();

      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("files", file);
      });
      formData.append("user_id", sessionUserId);
      formData.append("point", selectedRating);
      formData.append("review", reviewContent);
      formData.append("review_img", previewImages);
      formData.append("received_id", receivedId);

      console.log(formData.get("user_id"));

      const response = await fetch("http://localhost:5000/review", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok && data.message === "SUCCESS") {
        alert("리뷰가 등록되었습니다.");
        handleCloseModal();
      } else {
        throw new Error(data.message || "리뷰 등록에 실패했습니다.");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:5000/review/${receivedId}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setReviewList(data);
      });

    fetch("http://localhost:5000/session/checkSession", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setSessionUserId(data.user_id);
      });
  }, []);

  const calculateAveragePoint = () => {
    if (reviewList.length === 0) {
      return 0;
    }

    const totalPoint = reviewList.reduce(
      (sum, review) => sum + review.point,
      0
    );
    return totalPoint / reviewList.length;
  };

  return (
    <div className="review" id="intro_page_contents_wrap">
      <h1>후기</h1>
      <div id="wrap_container">
        <div className="review_wrap">
          {reviewList.length > 0 ? (
            <>
              <div className="star_review_wrap">
                <span>{calculateAveragePoint().toFixed(1)}</span>
                <div className="review_summary">
                  <div className="star_wrap">
                    {[...Array(Math.round(calculateAveragePoint()))].map(
                      (n, index) => (
                        <FaStar key={index} />
                      )
                    )}
                  </div>
                  <div className="review_num">
                    <span>{reviewList.length}</span>
                    <span>개의 후기</span>
                  </div>
                </div>
              </div>
              <div className="review_btn">
                <button onClick={handleReview}>
                  <LuPencilLine />
                  <a className="create_review">리뷰 남기기</a>
                </button>
              </div>
            </>
          ) : (
            <div className="flexBox">
              <div>등록된 리뷰가 없습니다.</div>
              <div className="review_btn">
                <button onClick={handleReview}>
                  <LuPencilLine />
                  <a className="create_review">리뷰 남기기</a>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div id="wrap_container">
        <div className="review_contents">
          <div className="review_title">
            <p>생생한 후기를 확인하세요!</p>
          </div>
          <div className="review_list">
            <ul>
              {reviewList.length > 0 ? (
                reviewList.map((review, index) => (
                  <li key={index} className="review_li">
                    <div>
                      <div className="review_header">
                        <div>
                          <span className="review_userName">
                            {review.user_name}
                          </span>
                          <span className="reviewDate">
                            {review.register_date?.slice(0, 10) || ""}
                          </span>
                        </div>
                        <div className="reviewStar">
                          <div className="star_wrap">
                            {[...Array(Math.round(review.point))].map(
                              (n, index) => (
                                <FaStar key={index} />
                              )
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="review_context">
                        <div className="review_context_photo">
                          {Array.isArray(review.review_img) ? (
                            review.review_img.map((img, index) => (
                              <img
                                key={index}
                                src={img}
                                alt={`Review Image ${index}`}
                              />
                            ))
                          ) : (
                            <img src={review.review_img} alt="Review Image" />
                          )}
                        </div>
                        <div className="review_context_text">
                          <p>{review.review}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li>등록된 리뷰가 없습니다.</li>
              )}
            </ul>
            <div className="reviewAll_btn">
              <button>
                <span>전체 후기 보기</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div
          className="modal show fade"
          onClick={handleCloseModal}
          tabIndex={-1}
          role="dialog"
        >
          <div
            className="modal-dialog modal-dialog-scrollable"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-body">
                <div className="modal-component">
                  <h5 className="headerTitle">
                    솔직한 후기를 남겨주세요!
                    <div className="exitButton" onClick={handleCloseModal}>
                      X
                    </div>
                  </h5>
                  <div className="reviewWrap">
                    <label className="reviewTitle">
                      일반이용 후기 "작성 요령"
                    </label>
                  </div>
                  <ul className="help">
                    <li>
                      • 해당 코치님에게 트레이닝을 받은 증빙사진이 필요합니다.
                      (PT 약정서/계약서 or 코치님과 함께 찍은 사진 등 기타)
                    </li>
                    <li>• 증빙사진의 공개/비공개 여부를 선택할 수 있습니다.</li>
                    <li>
                      • 업로드된 사진을 터치/드래그 하여 삭제/이동 할 수
                      있습니다.
                    </li>
                    <li>
                      • 증빙이 적절하지 않을 시 삭제처리 됩니다.(상시 모니터링
                      중)
                    </li>
                  </ul>
                  <div style={{ marginTop: "12px" }}>
                    <div className="flexBox reviewWrap">
                      <div className="ReviewEditModal">
                        <label className="reviewTitle">
                          별점을 선택해주세요
                        </label>
                        <div className="star-rating">
                          {[...Array(5)].map((_, index) => (
                            <FaStar
                              key={index}
                              size={36}
                              className="gostar"
                              onClick={() => handleStarClick(index + 1)}
                              style={{
                                color:
                                  index < selectedRating
                                    ? "rgb(255,187,51)"
                                    : "darkgray",
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flexBox reviewWrap">
                        <label className="reviewTitle">
                          증빙사진을 올려주세요 (최대 3개)
                        </label>
                        <div className="flexBox">
                          <input type="checkbox" name="" id="check_photo" />
                          <label htmlFor="check_photo"></label>
                          <label
                            htmlFor="check_photo"
                            className="reviewPhotoAuth"
                          >
                            사진 공개
                          </label>
                        </div>
                      </div>
                      <div className="preview-images-container">
                        {previewImages.map((image, index) => (
                          <div key={index} className="preview-image">
                            <img src={image} alt={`Preview ${index}`} />
                            <div
                              className="remove-image"
                              onClick={() => handleRemoveImage(index)}
                            >
                              <AiOutlineClose />
                            </div>
                          </div>
                        ))}
                      </div>
                      <label htmlFor="review_filename">
                        <div className="addPhotoButton">+ 사진 추가하기</div>
                      </label>
                      <input
                        type="file"
                        name="p_image_1"
                        id="review_filename"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        multiple
                      />
                    </div>
                    <div style={{ margin: "24px 0px" }}>
                      <div
                        className="reviewWrap"
                        style={{
                          paddingBottom: "8px",
                        }}
                      >
                        <label className="reviewTitle">
                          내용을 작성해주세요.
                          <div
                            style={{
                              float: "right",
                              fontSize: "14px",
                              color: "rgb(108,118,128)",
                            }}
                          >
                            {reviewContent.length}/400
                          </div>
                        </label>
                      </div>
                      <textarea
                        id="review_content"
                        name="content"
                        maxLength={400}
                        placeholder="내용을 입력해주세요"
                        rows="6"
                        onChange={handleReviewContentChange}
                      ></textarea>
                    </div>
                    <div className="button_Div">
                      <button
                        onClick={handleFetchReview}
                        className={`button_Basic ${
                          reviewContent.length > 0 ? "active" : ""
                        }`}
                        disabled={reviewContent.length === 0}
                      >
                        <span>리뷰 작성 완료</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && <div className="modal-backdrop show fade"></div>}
    </div>
  );
};

export default Review;
