const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
const authRouter = require("./routes/auth");
const sessionRouter = require("./routes/session");
const trainerMapRouter = require("./routes/trainermap");
const userRouter = require("./routes/user");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
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
app.use("/trainermap", trainerMapRouter);
app.use("/user", userRouter);

app.listen(5000, () => {
  console.log("server is running...");
});
