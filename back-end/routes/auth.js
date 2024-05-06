const express = require("express");
const axios = require("axios");
const login = require("../sql/login/login");
const router = express.Router();

// ------------------------------------------------
// ----------------- kakao login ------------------
// ------------------------------------------------
router.get("/kakao/user", async (req, res, next) => {
  await handleKakaoLogin(req, res, "user");
});

router.get("/kakao/trainer", async (req, res, next) => {
  await handleKakaoLogin(req, res, "trainer");
});

// ------------------------------------------------
// ----------------- naver login ------------------
// ------------------------------------------------
router.get("/naver/user", async (req, res, next) => {
  await handleNaverLogin(req, res, "user");
});

router.get("/naver/trainer", async (req, res, next) => {
  await handleNaverLogin(req, res, "trainer");
});

// ------------------------------------------------
// ----------------- google login -----------------
// ------------------------------------------------
// google user
router.get("/google/user", async (req, res, next) => {
  await handleGoogleLogin(req, res, "user");
});

// google trainer
router.get("/google/trainer", async (req, res, next) => {
  await handleGoogleLogin(req, res, "trainer");
});

// ------------------------------------------------
// ----------------login function -----------------
// ------------------------------------------------
async function handleKakaoLogin(req, res, role) {
  const code = req.query.code;

  try {
    // 카카오 OAuth를 통해 토큰 받아오기
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
          redirect_uri:
            role === "user"
              ? process.env.KAKAO_REDIRECT_URI_USER
              : process.env.KAKAO_REDIRECT_URI_TRAINER,
        },
      }
    );

    // 토큰을 사용하여 사용자 정보 가져오기
    const userInfo = await axios.post(
      "https://kapi.kakao.com/v2/user/me",
      {},
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + token.data.access_token,
        },
      }
    );

    // 사용자 정보 처리
    const userId = userInfo.data.id + "_kakao";
    let charIndex = userInfo.data.kakao_account.phone_number.indexOf(" ");
    let phoneNumber =
      "0" +
      userInfo.data.kakao_account.phone_number
        .substring(charIndex + 1)
        .replaceAll("-", "");

    // DB에서 사용자 조회
    login.selectUser(userId, (err, result) => {
      if (err) {
        console.log("로그인 오류!!");
        res.status(400).end("로그인 오류!!");
        return;
      }

      // 사용자가 DB에 없으면 새로 등록
      if (result.length === 0) {
        const userData = {
          user_id: userId,
          gender: userInfo.data.kakao_account.gender.substring(0, 1),
          email: userInfo.data.kakao_account.email,
          phonenumber: phoneNumber,
          user_roles: role,
          user_name: userInfo.data.kakao_account.name,
        };
        login.insertUser(userData, (err, result) => {
          if (err) {
            console.log("사용자 등록 오류...");
            res.status(400).end("사용자 등록 오류...");
            return;
          }
          console.log("사용자 등록 결과 : ", result);
        });

        if (role === "trainer") {
          login.insertTrainer(userData, (err, result) => {
            if (err) {
              console.log("트레이너 등록 오류...");
              res.status(400).end("트레이너 등록 오류...");
              return;
            }
          });
        }
      }

      // 세션에 사용자 정보 저장
      req.session.user_id = userId;
      req.session.role = role;
      req.session.gender = userInfo.data.kakao_account.gender.substring(0, 1);
      req.session.email = userInfo.data.kakao_account.email;
      req.session.phonenumber = phoneNumber;
      req.session.user_name = userInfo.data.kakao_account.name;
      req.session.save(() => {});
      // 리디렉션
      if (result.length !== 0 && result[0].user_roles !== role) {
        req.session.destroy((err) => {
          if (err) {
            throw err;
          }
          res.redirect(`http://localhost:3000/login/roleError/${role}`);
        });
      } else {
        res.redirect("http://localhost:3000/");
      }
    });
  } catch (error) {
    console.error(error);
    res.status(400).end("로그인 에러");
  }
}

async function handleNaverLogin(req, res, role) {
  const code = req.query.code;

  let client_id = process.env.NAVER_CLIENT_ID;
  let client_secret = process.env.NAVER_CLIENT_SECRET;
  let redirect_uri = "";
  role === "user"
    ? (redirect_uri = process.env.NAVER_REDIRECT_URI_USER)
    : (redirect_uri = process.env.NAVER_REDIRECT_URI_TRAINER);
  let state = "RANDOM_STATE";

  try {
    // get token
    const token = await axios.post(
      "https://nid.naver.com/oauth2.0/token",
      {},
      {
        headers: {
          "X-Naver-Client-Id": client_id,
          "X-Naver-Client-Secret": client_secret,
        },
        params: {
          grant_type: "authorization_code",
          client_id,
          client_secret,
          code,
          redirect_uri,
          state,
        },
      }
    );

    let access_token = token.data.access_token;
    let header = "Bearer " + access_token; // Bearer 다음에 공백 추가

    const res2 = await axios.post(
      "https://openapi.naver.com/v1/nid/me",
      {},
      {
        headers: { Authorization: header },
      }
    );

    const userId = res2.data.response.id + "_naver";

    login.selectUser(userId, (err, result) => {
      if (err) {
        console.log("로그인 오류!!");
        res.status(400).end("로그인 오류!!");
        return;
      }

      // 사용자가 DB에 없으면 새로 등록
      if (result.length === 0) {
        const userData = {
          user_id: userId,
          gender: res2.data.response.gender.toLowerCase(),
          email: res2.data.response.email,
          phonenumber: res2.data.response.mobile.replaceAll("-", ""),
          user_roles: role,
          user_name: res2.data.response.name,
        };
        login.insertUser(userData, (err, result) => {
          if (err) {
            console.log("사용자 등록 오류...");
            res.status(400).end("사용자 등록 오류...");
            return;
          }
          console.log("사용자 등록 결과 : ", result);
        });

        if (role === "trainer") {
          login.insertTrainer(userData, (err, result) => {
            if (err) {
              console.log("트레이너 등록 오류...");
              res.status(400).end("트레이너 등록 오류...");
              return;
            }
          });
        }
      }

      // 세션에 사용자 정보 저장
      req.session.user_id = res2.data.response.id + "_naver";
      req.session.role = role;
      req.session.gender = res2.data.response.gender.toLowerCase();
      req.session.email = res2.data.response.email;
      req.session.phonenumber = res2.data.response.mobile.replaceAll("-", "");
      req.session.user_name = res2.data.response.name;
      req.session.save(() => {});

      // 리디렉션
      if (result.length !== 0 && result[0].user_roles !== role) {
        req.session.destroy((err) => {
          if (err) {
            throw err;
          }
          res.redirect(`http://localhost:3000/login/roleError/${role}`);
        });
      } else {
        res.redirect("http://localhost:3000/");
      }
    });
  } catch (e) {
    console.log(e);
    res.status(400).end("Sorry, Login Error");
  }
}

async function handleGoogleLogin(req, res, role) {
  const code = req.query.code;

  let client_id = process.env.GOOGLE_CLIENT_ID;
  let client_secret = process.env.GOOGLE_CLIENT_SECRET;
  let redirect_uri = "";
  role === "user"
    ? (redirect_uri = process.env.GOOGLE_REDIRECT_URI_USER)
    : (redirect_uri = process.env.GOOGLE_REDIRECT_URI_TRAINER);

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

    let access_token = token.data.access_token;

    const res1 = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo`,
      {
        params: {
          access_token,
        },
      }
    );
    let res2 = null;
    try{
      res2 = await axios.get(
      `https://people.googleapis.com/v1/people/me?personFields=genders,phoneNumbers&access_token=${access_token}`
    );
  } catch (error) {
    console.log("error: ", error)
  }
    const userId = res1.data.id + "_google";

    let googlePhoneNumber = null;
    if (res2 !==null){
      googlePhoneNumber =
      !!res2.data.phoneNumbers === true
        ? res2.data.phoneNumbers[0].value.replaceAll("-", "")
        : "";
    }

    login.selectUser(userId, (err, result) => {
      if (err) {
        console.log("로그인 오류!!");
        res.status(400).end("로그인 오류!!");
        return;
      }

      // 사용자가 DB에 없으면 새로 등록
      if (result.length === 0) {
        const userData = {
          user_id: userId,
          gender: 
          res2 !== null? res2.data.genders[0].value.substring(0, 1): "",
          email: res1.data.email,
          phonenumber: res2 !== null? googlePhoneNumber : "",
          user_roles: role,
          user_name: res1.data.name,
        };
        login.insertUser(userData, (err, result) => {
          if (err) {
            console.log("사용자 등록 오류...");
            res.status(400).end("사용자 등록 오류...");
            return;
          }
          console.log("사용자 등록 결과 : ", result);
        });

        if (role === "trainer") {
          login.insertTrainer(userData, (err, result) => {
            if (err) {
              console.log("트레이너 등록 오류...");
              res.status(400).end("트레이너 등록 오류...");
              return;
            }
          });
        }
      }

      // 세션에 사용자 정보 저장
      req.session.user_id = res1.data.id + "_google";
      req.session.role = result[0]?.user_roles === "admin"? "admin" : role;
      req.session.gender = res2 !== null? res2.data.genders[0].value.substring(0, 1): "";
      req.session.email = res1.data.email;
      req.session.phonenumber = googlePhoneNumber;
      req.session.user_name = res1.data.name;
      req.session.save(() => {});

      // 리디렉션
      if (result.length !== 0 && result[0].user_roles !== role) {
        if(result[0].user_roles === "admin"){
          res.redirect("http://localhost:3000/")
          return;
        }
        req.session.destroy((err) => {
          if (err) {
            throw err;
          }
          res.redirect(`http://localhost:3000/login/roleError/${role}`);
        });
      } else {
        res.redirect("http://localhost:3000/");
      }
    });
  } catch (e) {
    console.log(e);
    res.status(400).end("Sorry, Google Login Error");
  }
}
module.exports = router;
