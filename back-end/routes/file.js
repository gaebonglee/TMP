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
router.get("/download/:filename(*)", (req, res) => {
  const googlStorage = new Storage({
    projectId: "balmy-elf-420205", // GCP 프로젝트 ID
    keyFilename: "./secure/balmy-elf-420205-381e2cb85c55.json", // GCP 서비스 계정 키 파일 경로
  });
  const bucketName = "cda_file"; // Google Cloud Storage 버킷 이름
  const bucket = googlStorage.bucket(bucketName);

  const filename = req.params.filename;
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

// 트레이너 intro update
router.post("/save-intro", async (req, res) => {
  const { userId, intro } = req.body;
  try {
    await file.updateTrainerIntro(intro, userId);
  } catch (error) {
    console.log("trainer intro update error::", error);
    return res.status(500).send("trainer intro update error");
  }
  res.send({ success: "success" });
});

// 트레이너 schedule update
router.post("/save-lessonSchedule", async (req, res) => {
  const { userId, schedule } = req.body;
  try {
    const selectTrainerSchedule = await file.selectTrainerSchedule(userId);

    if (selectTrainerSchedule.length === 0) {
      // insert
      await file.insertTrainerSchedule(schedule, userId);
    } else {
      // update
      await file.updateTrainerSchedule(schedule, userId);
    }
  } catch (error) {
    console.log("trainer intro update error::", error);
    return res.status(500).send("trainer intro update error");
  }
  res.send({ success: "success" });
});

// 트레이너 save-trainerShortIntro
router.post("/save-trainerShortIntro", async (req, res) => {
  const { userId, shortintro } = req.body;
  try {
    await file.updateTrainerShortIntro(shortintro, userId);
  } catch (error) {
    console.log("trainer shortIntro update error::", error);
    return res.status(500).send("trainer shortIntro update error");
  }
  res.send({ success: "success" });
});

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
      let fileUrl = "";
      if (req.body.table === "program") {
        fileUrl = `${req.body.table}/${req.body.userId}/${req.body.seq}/${fileInfo.name}`;
      } else {
        fileUrl = `${req.body.table}/${req.body.userId}/${fileInfo.name}`;
      }
      const [url] = await bucket.file(fileUrl).getSignedUrl(options);
      signedUrls.push({ name: fileInfo.name, url });
    } catch (error) {
      console.error("Error creating signed URL for", fileInfo.name, error);
      return res.status(500).send("Cannot create signed URL for some files");
    }
  }

  res.send({ signedUrls });
});

// 파일에 대한 사인된 URL을 생성하는 라우트
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
router.post("/delete-certifications", async (req, res) => {
  try {
    const { files, userId } = req.body;
    const specificPath = `${req.body.table}/${userId}/`;

    const filesToDelete = [];
    files.forEach((v, _i) => {
      filesToDelete.push(v.certification_img);
    });

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
    console.error("Error update files:", error);
    res.status(500).send("Failed to update files");
  }
});

router.post("/update-certifications-db", async (req, res) => {
  try {
    const { data, userId } = req.body;

    for (let i = 0; i < data.length; i++) {
      await file.updateTrainerCertifications(data[i], userId);
    }

    res.send({ result: `Success update files` });
  } catch (error) {
    console.error("Error update files:", error);
    res.status(500).send("Failed to update files");
  }
});

router.post("/delete-certifications-db", async (req, res) => {
  try {
    const { data, userId } = req.body;

    for (let i = 0; i < data.length; i++) {
      await file.deleteTrainerCertifications(data[i], userId);
    }

    res.send({ result: `Success delete files` });
  } catch (error) {
    console.error("Error deleting files:", error);
    res.status(500).send("Failed to delete files");
  }
});
router.post("/insert-certifications-db", async (req, res) => {
  try {
    const { data, userId } = req.body;

    const result = await file.insertTrainerCertifications(data, userId);

    res.send({ result: result.insertId });
  } catch (error) {
    console.error("Error insert files:", error);
    res.status(500).send("Failed to insert files");
  }
});

router.post("/insert-programs-db", async (req, res) => {
  try {
    const { data, userId } = req.body;

    const imgString = data.newImgArr.map((v) => v.name).join(",");
    data.newImgArr = imgString;

    const result = await file.insertTrainerProgram(data, userId);

    for (let i = 0; i < data.specialty.length; i++) {
      await file.insertTrainerProgramSpecialty(
        result.insertId,
        userId,
        data.specialty[i]
      );
    }

    res.send({ result: result.insertId, message: "success insert programs" });
  } catch (error) {
    console.error("Error insert files:", error);
    res.status(500).send("Failed to insert files");
  }
});

router.post("/update-programs-db", async (req, res) => {
  try {
    const { data, userId } = req.body;

    const imgString = data.newImgArr
      .map((item) => {
        return typeof item === "object" ? item.name : item;
      })
      .join(",");
    data.newImgArr = imgString;
    console.log(data);

    const specialtyArr =
      typeof data.specialty === "string" ? [] : data.specialty;

    typeof data.specialty !== "string" &&
      (await file.deleteTrainerProgramSpecialty(data.program_id, userId));
    typeof data.specialty !== "string" &&
      (await file.updateTrainerProgram(data, userId));

    for (let i = 0; i < specialtyArr.length; i++) {
      await file.insertTrainerProgramSpecialty(
        data.program_id,
        userId,
        data.specialty[i]
      );
    }

    res.send({ result: "success update programs" });
  } catch (error) {
    console.error("Error insert files:", error);
    res.status(500).send("Failed to insert files");
  }
});

router.post("/delete-programs-db", async (req, res) => {
  try {
    const { programId, userId } = req.body;

    await file.deleteTrainerProgramSpecialty(programId, userId);
    await file.deleteTrainerProgram(programId, userId);

    res.send({ result: `Success delete files` });
  } catch (error) {
    console.error("Error deleting files:", error);
    res.status(500).send("Failed to delete files");
  }
});

router.post("/update-trainerPrice-db", async (req, res) => {
  try {
    const { data, userId } = req.body;

    await file.deleteTrainerPrice(userId);
    await file.insertTrainerPrice(userId, data);

    res.send({ result: "success update trainerPrice" });
  } catch (error) {
    console.error("Error insert files:", error);
    res.status(500).send("Failed to insert files");
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
