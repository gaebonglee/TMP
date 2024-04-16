const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/kakao', async (req, res, next) => {
  const code = req.query.code;
  try {
    // get token
    const token = await axios.post(
      'https://kauth.kakao.com/oauth/token',
      {},
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: {
          grant_type: 'authorization_code',
          client_id: process.env.KAKAO_LOGIN_REST_KEY,
          code,
          redirect_uri: process.env.KAKAO_REDIRECT_URI,
        },
      }
    );

    const res2 = await axios.post(
      'https://kapi.kakao.com/v2/user/me',
      {},
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer ' + token.data.access_token,
        },
      }
    );
    console.log('user Info data :', res2.data);
    req.session.user_id = res2.data.id;
    req.session.gender = res2.data.kakao_account.gender;
    req.session.email = res2.data.kakao_account.email;
    req.session.phonenumber = res2.data.kakao_account.phone_number;
    req.session.user_name = res2.data.kakao_account.name;
    req.session.save(() => {});
    console.log('세션 생성:', req.session);
    res.redirect('http://localhost:3000/');
  } catch (e) {
    console.log(e);
    res.status(400).end('Sorry, Login Error');
  }
});

module.exports = router;
