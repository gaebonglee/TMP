const express = require("express");
const Storage = require("@google-cloud/storage");
const file = require("../sql/file/file");
const router = express.Router();

router.get("/info", (req, res) => {
  file.selectCenter(req.query.center_id, (err, result) => {
    if (err) {
      console.log("로그인 오류!!");
      res.status(400).end("로그인 오류!!");
      return;
    }
    res.status(200).send(result[0]);
  });
});
router.get("/download/:filename(*)", (req, res) => {
  const googlStorage = new Storage({
    projectId: "balmy-elf-420205", // GCP 프로젝트 ID
    keyFilename: "./secure/balmy-elf-420205-381e2cb85c55.json", // GCP 서비스 계정 키 파일 경로
  });
  const bucketName = "cda_file"; // Google Cloud Storage 버킷 이름
  const bucket = googlStorage.bucket(bucketName);

  const filename = req.params.filename;
  console.log("파일이름:", filename);
  try {
    const file = bucket.file(filename);
    const dotIndex = filename.indexOf(".");
    const imgType = filename.substring(dotIndex + 1);
    file.download((err, content) => {
      if (err) {
        console.error("파일 다운로드 실패:", err);
        res.status(500).send("파일을 다운로드하는 동안 문제가 발생했습니다.");
        return;
      }

      res.setHeader("Content-Type", `image/${imgType}`); // 이미지 타입에 맞게 설정
      res.send(content);
    });
  } catch (error) {
    console.error("파일 다운로드 실패:", error);
    res.status(500).send("파일을 다운로드하는 동안 문제가 발생했습니다.");
  }
});

module.exports = router;
