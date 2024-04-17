import React, { useRef, useState } from "react";
import "./MultiStepProgress.scss";

const MultiStepProgress = () => {
  let [currentProgress, setCurrentProgress] = useState(1);
  const circle = useRef();
  const progressBar = useRef();
  // 첫 번째 circle은 항상 active 되어야 되므로 2부터 시작해주기.
  const progressArr = [2, 3, 4];

  const minusSteps = (e) => {
    // ui에 적혀있는 숫자 번호 가져오기
    let progressCount = Number(
      circle.current.childNodes[currentProgress - 2].textContent
    );
    progressBar.current.style = `width: ${(progressCount - 1) * 25}%`;
    setCurrentProgress((currentProgress -= 1));
    if (currentProgress === progressCount) {
      circle.current.childNodes[progressCount].classList.remove("active");
    }
  };

  const addSteps = (e) => {
    let progressCount = Number(
      circle.current.childNodes[currentProgress - 1].textContent
    );
    setCurrentProgress((prev) => (prev += 1));
    progressBar.current.style = `width: ${progressCount * 25}%`;
    if (currentProgress === progressCount) {
      circle.current.childNodes[progressCount].classList.add("active");
    }
  };

  return (
    <div className="container">
      {/* // ref는 부모 요소에 넣어주기. */}
      <div className="steps" ref={circle}>
        {/* // 첫 번째 circle은 항상 active 되어 있도록 해주기. */}
        <span className="circle active">1</span>
        {progressArr.map((i) => (
          <span className="circle">{i}</span>
        ))}
        <div className="progress-bar">
          <span ref={progressBar} className="indicator"></span>
        </div>
      </div>
      <div className="buttons">
        {/* // 현재 프로그래스 위치가 1(처음)이면 prev 버튼 못 누르게 하기 */}
        <button
          id="prev"
          disabled={currentProgress === 1 ? true : false}
          onClick={() => {
            minusSteps();
          }}
        >
          Prev
        </button>
        {/* // 현재 프로그래스 위치가 4(마지막)이면 next 버튼 못 누르게 하기. */}
        <button
          id="next"
          disabled={currentProgress === 4 ? true : false}
          onClick={() => {
            addSteps();
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MultiStepProgress;
