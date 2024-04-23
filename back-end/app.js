const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
const authRouter = require("./routes/auth");
const sessionRouter = require("./routes/session");
const centerRouter = require("./routes/center");
const reviewRouter = require("./routes/review");
const filterRouter = require("./routes/filter");

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

// router 추가
app.use("/auth", authRouter);
app.use("/session", sessionRouter);
app.use("/center", centerRouter);
app.use("/review", reviewRouter);
app.use("/filter", filterRouter);

app.listen(5000, () => {
  console.log("server is running...");
});
