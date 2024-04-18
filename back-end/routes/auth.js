const express = require("express");
const axios = require("axios");
const router = express.Router();

// ------------------------------------------------
// ----------------- kakao login ------------------
// ------------------------------------------------
router.get("/kakao/user", async (req, res, next) => {
  const code = req.query.code;
  try {
    // get token
    const token = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      {},
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          grant_type: "authorization_code",
          client_id: process.env.KAKAO_LOGIN_REST_KEY,
          code,
          redirect_uri: process.env.KAKAO_REDIRECT_URI_USER,
        },
      }
    );

    const res2 = await axios.post(
      "https://kapi.kakao.com/v2/user/me",
      {},
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + token.data.access_token,
        },
      }
    );

    req.session.user_id = res2.data.id + "_kakao";
    req.session.role = "user";
    req.session.gender = res2.data.kakao_account.gender.substring(0, 1);
    req.session.email = res2.data.kakao_account.email;
    let charIndex = res2.data.kakao_account.phone_number.indexOf(" ");
    req.session.phonenumber =
      "0" +
      res2.data.kakao_account.phone_number
        .substring(charIndex + 1)
        .replaceAll("-", "");
    req.session.user_name = res2.data.kakao_account.name;
    req.session.save(() => {});

    res.redirect("http://localhost:3000/");
  } catch (e) {
    console.log(e);
    res.status(400).end("Sorry, Login Error");
  }
});

// kakao trainer
router.get("/kakao/trainer", async (req, res, next) => {
  const code = req.query.code;
  console.log("req.url->", req.url);
  try {
    // get token
    const token = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      {},
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          grant_type: "authorization_code",
          client_id: process.env.KAKAO_LOGIN_REST_KEY,
          code,
          redirect_uri: process.env.KAKAO_REDIRECT_URI_TRAINER,
        },
      }
    );

    const res2 = await axios.post(
      "https://kapi.kakao.com/v2/user/me",
      {},
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + token.data.access_token,
        },
      }
    );

    req.session.user_id = res2.data.id + "_kakao";
    req.session.role = "trainer";
    req.session.gender = res2.data.kakao_account.gender.substring(0, 1);
    req.session.email = res2.data.kakao_account.email;
    let charIndex = res2.data.kakao_account.phone_number.indexOf(" ");
    req.session.phonenumber =
      "0" +
      res2.data.kakao_account.phone_number
        .substring(charIndex + 1)
        .replaceAll("-", "");
    req.session.user_name = res2.data.kakao_account.name;

    req.session.save(() => {});
    res.redirect("http://localhost:3000/");
  } catch (e) {
    console.log(e);
    res.status(400).end("Sorry, Login Error");
  }
});

// ------------------------------------------------
// ----------------- naver login ------------------
// ------------------------------------------------
router.get("/naver/user", async (req, res, next) => {
  const code = req.query.code;

  let client_id = process.env.NAVER_CLIENT_ID;
  let client_secret = process.env.NAVER_CLIENT_SECRET;
  let redirect_uri = process.env.NAVER_REDIRECT_URI_USER;
  let state = "RANDOM_STATE";

  try {
    // get token
    const token = await axios.get(
      `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}&code=${code}&state=${state}`,
      {
        headers: {
          "X-Naver-Client-Id": client_id,
          "X-Naver-Client-Secret": client_secret,
        },
      }
    );

    let access_token = token.data.access_token;
    var header = "Bearer " + access_token; // Bearer 다음에 공백 추가

    const res2 = await axios.get("https://openapi.naver.com/v1/nid/me", {
      headers: { Authorization: header },
    });
    console.log("user Info data :", res2.data);
    req.session.user_id = res2.data.response.id + "_naver";
    req.session.role = "user";
    req.session.gender = res2.data.response.gender.toLowerCase();
    req.session.email = res2.data.response.email;
    req.session.phonenumber = res2.data.response.mobile.replaceAll("-", "");
    req.session.user_name = res2.data.response.name;
    console.log("req.session:", req.session);
    req.session.save(() => {});

    res.redirect("http://localhost:3000/");
  } catch (e) {
    console.log(e);
    res.status(400).end("Sorry, Login Error");
  }
});

// naver trainer
router.get("/naver/trainer", async (req, res, next) => {
  const code = req.query.code;

  let client_id = process.env.NAVER_CLIENT_ID;
  let client_secret = process.env.NAVER_CLIENT_SECRET;
  let redirect_uri = process.env.NAVER_REDIRECT_URI_TRAINER;
  let state = "RANDOM_STATE";

  try {
    // get token
    const token = await axios.get(
      `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}&code=${code}&state=${state}`,
      {
        headers: {
          "X-Naver-Client-Id": client_id,
          "X-Naver-Client-Secret": client_secret,
        },
      }
    );

    let access_token = token.data.access_token;
    var header = "Bearer " + access_token; // Bearer 다음에 공백 추가

    const res2 = await axios.get("https://openapi.naver.com/v1/nid/me", {
      headers: { Authorization: header },
    });

    req.session.user_id = res2.data.response.id + "_naver";
    req.session.role = "trainer";
    req.session.gender = res2.data.response.gender.toLowerCase();
    req.session.email = res2.data.response.email;
    req.session.phonenumber = res2.data.response.mobile.replaceAll("-", "");
    req.session.user_name = res2.data.response.name;
    req.session.save(() => {});

    res.redirect("http://localhost:3000/");
  } catch (e) {
    console.log(e);
    res.status(400).end("Sorry, Login Error");
  }
});

// ------------------------------------------------
// ----------------- google login ------------------
// ------------------------------------------------
// google user
router.get("/google/user", async (req, res, next) => {
  const code = req.query.code;

  let client_id = process.env.GOOGLE_CLIENT_ID;
  let client_secret = process.env.GOOGLE_CLIENT_SECRET;
  let redirect_uri = process.env.GOOGLE_REDIRECT_URI_USER;

  try {
    // get token
    const token = await axios.post(
      "https://oauth2.googleapis.com/token",
      {},
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          code,
          client_id,
          client_secret,
          redirect_uri,
          grant_type: "authorization_code",
        },
      }
    );

    const res2 = await axios.post(
      "https://www.googleapis.com/userinfo/v2/me",
      {},
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + token.data.access_token,
        },
      }
    );

    // let access_token = token.data.access_token;

    console.log("user Info data :", res2.data);
    // req.session.user_id = res2.data.response.id + "_google";
    // req.session.role = "user";
    // req.session.gender = res2.data.response.gender.toLowerCase();
    // req.session.email = res2.data.response.email;
    // req.session.phonenumber = res2.data.response.mobile.replaceAll("-", "");
    // req.session.user_name = res2.data.response.name;
    console.log("req.session:", req.session);
    // req.session.save(() => {});

    console.log("session info:", req.session);
    // res.redirect("http://localhost:3000/");
  } catch (e) {
    console.log(e);
    res.status(400).end("Sorry, Login Error");
  }
});

module.exports = router;
