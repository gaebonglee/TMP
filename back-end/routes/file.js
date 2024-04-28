const express = require("express");
const multer = require("multer");
const multerGoogleStorage = require("multer-google-storage");
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

router.get("/name", (req, res) => {
  file.selectCenter(req.query.center_id, (err, result) => {
    if (err) {
      console.log("로그인 오류!!");
      res.status(400).end("로그인 오류!!");
      return;
    }
    res.status(200).send(result[0]);
  });
});

const storage = multerGoogleStorage.storageEngine({
  projectId: "balmy-elf-420205", // GCP 프로젝트 ID
  keyFilename: "./secure/balmy-elf-420205-381e2cb85c55.json", // GCP 계정 키 파일 경로
  bucket: "cda_file", // Google Cloud Storage 버킷 이름
  filename: function (req, file, cb) {
    cb(null, "test2/" + file.originalname); // 파일 이름
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.array("files"), (req, res) => {
  res.send("Files uploaded successfully.");
});

// front 부분
// function ImageUploader() {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleSubmit = async () => {
//     const formData = new FormData();
//     formData.append('image', selectedFile);

//     try {
//       await axios.post('http://localhost:3003/api/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log('이미지 업로드 성공.');
//     } catch (error) {
//       console.error('이미지 업로드 실패:', error);
//     }
//   };

//   return (
//     <div>
//       <input type='file' onChange={handleFileChange} />
//       <button onClick={handleSubmit}>업로드</button>
//     </div>
//   );
// }

module.exports = router;
