const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
const authRouter = require("./routes/auth");
const sessionRouter = require("./routes/session");
const centerRouter = require("./routes/center");
const reviewRouter = require("./routes/review");
const mypageRouter = require("./routes/mypage");
const fileRouter = require("./routes/file");
const filterRouter = require("./routes/filter");
const trainerDetailRouter = require("./routes/trainerDetail");
const inquiryRouter = require("./routes/inquiry");
const reservationRouter = require("./routes/reservation");
const mainpageRouter = require("./routes/mainpage");

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// router 추가
app.use("/auth", authRouter);
app.use("/session", sessionRouter);
app.use("/center", centerRouter);
app.use("/review", reviewRouter);
app.use("/mypage", mypageRouter);
app.use("/filter", filterRouter);
app.use("/file", fileRouter);
app.use("/filter", filterRouter);
app.use("/trainerDetail", trainerDetailRouter);
app.use("/servicecenter", inquiryRouter);
app.use("/reservation", reservationRouter);
app.use("/mainpage", mainpageRouter);

app.listen(5000, () => {
  console.log("server is running...");
});
