const express = require("express");
const { Storage } = require("@google-cloud/storage");
const file = require("../sql/file/file");
const router = express.Router();

const storage = new Storage({
  projectId: "balmy-elf-420205",
  keyFilename: "./secure/balmy-elf-420205-381e2cb85c55.json",
});
const bucket = storage.bucket("cda_file");

// async function uploadFile(userId, localFilePath) {
//   try {
//     await storage.bucket(bucketName).upload(localFilePath, {
//       destination: `trainer/${userId}/`,
//       metadata: {
//         contentType: "auto", // MIME 타입 자동 감지
//       },
//     });
//     console.log(`${localFilePath} has been uploaded to ${bucketName}`);
//   } catch (error) {
//     console.error("Failed to upload file:", error);
//   }
// }

// 여러 파일에 대한 사인된 URL을 생성하는 라우트
router.post("/generate-signed-urls", async (req, res) => {
  const filesInfo = req.body.files; // 파일 정보 배열
  const signedUrls = [];
  for (let fileInfo of filesInfo) {
    const options = {
      version: "v4",
      action: "write",
      expires: Date.now() + 15 * 60 * 1000, // 15분 후 만료
      contentType: fileInfo.type,
    };

    try {
      const [url] = await bucket
        .file(`${req.body.table}/${req.body.userId}/${fileInfo.name}`)
        .getSignedUrl(options);
      signedUrls.push({ name: fileInfo.name, url });
    } catch (error) {
      console.error("Error creating signed URL for", fileInfo.name, error);
      return res.status(500).send("Cannot create signed URL for some files");
    }
  }

  res.send({ signedUrls });
});

// 여러 파일에 대한 사인된 URL을 생성하는 라우트
router.post("/generate-signed-url", async (req, res) => {
  const filesInfo = req.body.files; // 파일 정보 배열
  const signedUrls = [];
  for (let fileInfo of filesInfo) {
    const options = {
      version: "v4",
      action: "write",
      expires: Date.now() + 15 * 60 * 1000, // 15분 후 만료
      contentType: fileInfo.type,
    };

    try {
      const [url] = await bucket
        .file(`${req.body.table}/${req.body.userId}/${fileInfo.name}`)
        .getSignedUrl(options);
      signedUrls.push({ name: fileInfo.name, url });

      // 파일이름을 db에 업데이트
      await file.updateUserImg(fileInfo.name, req.body.userId);
    } catch (error) {
      console.error("Error creating signed URL for", fileInfo.name, error);
      return res.status(500).send("Cannot create signed URL for some files");
    }
  }
  res.send({ signedUrls });
});

router.post("/delete-files", async (req, res) => {
  try {
    const { files: newFiles, userId } = req.body;
    const specificPath = `${req.body.table}/${userId}/`;
    const [files] = await bucket.getFiles({ prefix: specificPath });
    const sortedFiles = files.sort((a, b) => {
      return new Date(a.metadata.updated) - new Date(b.metadata.updated);
    });
    const storageFiles = sortedFiles.map((file) => file.name.split("/").pop());
    const fileUri = `${process.env.FILE_SERVER_URL}/${req.body.table}/${userId}/`;

    const filteredFiles = newFiles.map((value, index) => {
      return value.substring(fileUri.length);
    });

    const filesToDelete = storageFiles.filter(
      (fileName) => !filteredFiles.includes(fileName)
    );

    for (const fileName of filesToDelete) {
      await bucket.file(`${specificPath}${fileName}`).delete();
      // console.log(`Deleted ${fileName}`);
    }

    res.send({ result: `Deleted files success` });
  } catch (error) {
    console.error("Error deleting files:", error);
    res.status(500).send("Failed to delete files");
  }
});

router.post("/update-files", async (req, res) => {
  try {
    const { userId } = req.body;
    const specificPath = `${req.body.table}/${userId}/`;
    const [files] = await bucket.getFiles({ prefix: specificPath });
    const sortedFiles = files.sort((a, b) => {
      return new Date(a.metadata.updated) - new Date(b.metadata.updated);
    });
    const storageFiles = sortedFiles.map((file) => file.name.split("/").pop());
    console.log(storageFiles);
    const joinFiles = storageFiles.join(",");

    await file.updateTrainerImg(joinFiles, userId);

    res.send({ result: `Success update files` });
  } catch (error) {
    console.error("Error deleting files:", error);
    res.status(500).send("Failed to delete files");
  }
});

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

module.exports = router;
