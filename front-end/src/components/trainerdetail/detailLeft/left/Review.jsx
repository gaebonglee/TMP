import React, { useEffect, useState, useRef } from "react";
import "./Review.scss";
import { LuPencilLine } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const Review = ({ sectionRefs }) => {
  const [reviewList, setReviewList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const fileInputRef = useRef(null);
  const [reviewContent, setReviewContent] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [sessionUserId, setSessionUserId] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const url = useLocation();
  const [expandedImageIndex, setExpandedImageIndex] = useState(null);
  const reviewIndex = useRef(0);

  const receivedId = url.pathname.split("/")[2];

  const handleStarClick = (rating) => {
    setSelectedRating(rating);
  };
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    iconColor: "white",
    customClass: {
      popup: "colored-toast",
    },
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  function handleReview() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setPreviewImages([]);
    setReviewContent("");
    setSelectedRating(0);
    setSelectedFiles([]);
    setExpandedImageIndex(null);
    setIsEditModalOpen(false);
    setSelectedReview(null);
  }

  function handleEdit(reviewId) {
    const selectedReview = reviewList.find(
      (review) => review.review_id === reviewId
    );
    setSelectedReview(selectedReview);
    setIsEditModalOpen(true);
  }

  function handleCloseEditModal() {
    setIsEditModalOpen(false);
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + selectedFiles.length > 3) {
      Toast.fire({
        icon: "info",
        title: "최대 3개의 사진까지 업로드 가능합니다.",
      });
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
            userId: receivedId,
            table: "review",
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
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const handleFetchReview = async () => {
    if (selectedRating === 0) {
      Toast.fire({
        icon: "info",
        title: "별점을 선택해주세요.",
      });
      return;
    }

    if (!sessionUserId) {
      Toast.fire({
        icon: "info",
        title: "회원 로그인이 필요합니다.",
      });
      handleCloseModal();

      return;
    }

    try {
      await handleFileUpload();

      const formData = new FormData();
      const fileImgArr = [];
      selectedFiles.forEach((file) => {
        fileImgArr.push(file.name);
      });

      formData.append("review_img", fileImgArr.join(","));
      formData.append("user_id", sessionUserId);
      formData.append("point", selectedRating);
      formData.append("review", reviewContent);
      formData.append("received_id", receivedId);

      console.log(formData.get("user_id"));

      const response = await fetch("http://localhost:5000/review", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok && data.message === "SUCCESS") {
        Toast.fire({
          icon: "success",
          title: "후기가 등록되었습니다.",
        });
        handleCloseModal();
        window.location.reload();
      } else {
        throw new Error(data.message || "후기 등록에 실패했습니다.");
      }
    } catch (error) {
      Swal.fire(error.message);
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

  function handleDelete(reviewId) {
    Swal.fire({
      title: "정말로 삭제하시겠습니까?",
      showDenyButton: true,
      confirmButtonText: "네",
      denyButtonText: `아니오`,
      confirmButtonColor: "#a2ee94",
      denyButtonColor: "#ff0000",
      focusConfirm: false,
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/review/${reviewId}/delete`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: sessionUserId,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message === "SUCCESS") {
              Toast.fire({
                icon: "success",
                title: "삭제되었습니다.",
              });
              window.location.reload();
            } else {
              Toast.fire({
                icon: "info",
                title: "취소되었습니다.",
              });
            }
          });
      }
    });
  }

  function handleUpdateReview() {
    if (!selectedReview) {
      Toast.fire({
        icon: "info",
        title: "수정할 후기를 선택해주세요",
      });
      return;
    }

    fetch(`http://localhost:5000/review/${selectedReview.review_id}/update`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: sessionUserId,
        point: selectedReview.point,
        review: selectedReview.review,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "SUCCESS") {
          Toast.fire({
            icon: "success",
            title: "후기 수정에 성공하였습니다",
          });
          window.location.reload();
        } else {
          Toast.fire({
            icon: "info",
            title: "수정할 후기를 선택해주세요",
          });
        }
      });
  }

  return (
    <div className="review" id="intro_page_contents_wrap">
      <h1
        className="centerInfo_h1_title"
        id="header_section11"
        ref={sectionRefs.current.header_section11}
      >
        후기
      </h1>
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
                  <a className="create_review">후기 남기기</a>
                </button>
              </div>
            </>
          ) : (
            <div className="flexBox" style={{ flex: 1 }}>
              <div>
                <h4>후기를 작성해주세요.</h4>
              </div>
              <div className="review_btn">
                <button onClick={handleReview}>
                  <LuPencilLine />
                  <a className="create_review">후기 남기기</a>
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
                          <CgProfile size={24} />
                          <span className="review_userName">
                            {review.user_name}
                          </span>
                          <span className="reviewDate">
                            {review.register_date?.slice(0, 10) || ""}
                          </span>
                          {sessionUserId === review.user_id ? (
                            <>
                              <RiDeleteBin5Line
                                onClick={() => handleDelete(review.review_id)}
                                className="deleteReview"
                                size={24}
                              />
                              <FaPencilAlt
                                onClick={() => handleEdit(review.review_id)}
                                className="editReview"
                                size={24}
                              />
                            </>
                          ) : null}
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
                          {review.review_img
                            ? review.review_img
                                .split(",")
                                .map((img, imgindex) => (
                                  <div key={imgindex} className="reviewImage">
                                    <div className="review_div">
                                      <div
                                        className="img_review"
                                        onClick={() => {
                                          setExpandedImageIndex(imgindex);
                                          reviewIndex.current = index;
                                        }}
                                      >
                                        <img
                                          className="img img_review"
                                          src={`${process.env.REACT_APP_FILE_SERVER_URL}/review/${receivedId}/${img}`}
                                          alt={`Review ${index}`}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                ))
                            : null}
                        </div>
                        <div className="review_context_text">
                          <p>{review.review}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li style={{ textAlign: "center", margin: 10, padding: 10 }}>
                  {" "}
                  <h3>등록된 후기가 없습니다.</h3>
                </li>
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
                        <span>후기 작성 완료</span>
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

      {isEditModalOpen && (
        <div
          className="modal show fade"
          onClick={handleCloseEditModal}
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
                    후기 수정하기
                    <div className="exitButton" onClick={handleCloseEditModal}>
                      X
                    </div>
                  </h5>
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
                              onClick={() =>
                                setSelectedReview({
                                  ...selectedReview,
                                  point: index + 1,
                                })
                              }
                              style={{
                                color:
                                  index < selectedReview.point
                                    ? "rgb(255,187,51)"
                                    : "darkgray",
                              }}
                            />
                          ))}
                        </div>
                      </div>
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
                            {selectedReview.review.length}/400
                          </div>
                        </label>
                      </div>
                      <textarea
                        id="review_content"
                        name="content"
                        maxLength={400}
                        placeholder="내용을 입력해주세요"
                        rows="6"
                        value={selectedReview.review}
                        onChange={(e) =>
                          setSelectedReview({
                            ...selectedReview,
                            review: e.target.value,
                          })
                        }
                      ></textarea>
                    </div>
                    <div className="button_Div">
                      <button
                        onClick={handleUpdateReview}
                        className="button_Basic active"
                      >
                        <span>후기 수정 완료</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isEditModalOpen && <div className="modal-backdrop show fade"></div>}

      {/* 이미지 확대 모달 */}
      {expandedImageIndex !== null && reviewList.length > 0 && (
        <div
          className="expendedModal"
          onClick={() => setExpandedImageIndex(null)}
        >
          <div
            className="expendedModal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`${`${
                process.env.REACT_APP_FILE_SERVER_URL
              }/review/${receivedId}/${
                reviewList[reviewIndex.current].review_img?.split(",")[
                  expandedImageIndex
                ] || ""
              }`}`}
              alt="Expanded"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Review;
