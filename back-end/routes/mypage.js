const express = require("express")
const router = express.Router();
const searchCenter= require("../sql/mypage/trainer/searchCenter")
const updateUser = require("../sql/mypage/user/updateUser")
const updateCoach = require("../sql/mypage/trainer/updateCoach")
const selectUser = require("../sql/mypage/user/selectUser")
const selectCoach = require("../sql/mypage/trainer/selectCoach")
const crypto = require('crypto');
const fetch = require('node-fetch');

router.post('/updateUserinfo', async(req, res) => {
    console.log("Received data:", req.body);
    const {name, email, phonenumber, user_id} = req.body
    let result = await updateUser.updateUser(name, email, phonenumber, user_id);
    res.status(200).send(result);
});

router.post('/selectUserinfo', async(req, res) => {
    console.log("Received data:", req.body);
    const {user_id} = req.body
    console.log(user_id)
    let result = await selectUser.selectUser(user_id);
    res.status(200).send(result);
});

router.post('/updateCoachinfo', async(req, res) => {
    console.log("Received data:", req.body);
    const {name, type, email, phonenumber, center_id, user_id} = req.body
    let result = await updateCoach.updateCoach(name, type, email, phonenumber, center_id, user_id)
    res.status(200).send(result);
});

router.post('/selectCoachinfo', async(req, res) => {
    console.log("Received data:", req.body);
    const {user_id} = req.body
    console.log("mypage", user_id)
    let result = await selectCoach.selectCoach(user_id);
    res.status(200).send(result);
});

router.post('/searchCenter', async (req, res) => {
    console.log("Received data:", req.body);
    const {center} = req.body
    let result = await searchCenter.searchCenter(center);
    res.status(200).send(result);
});


router.post('/certification', async(req, res) => {

        const { certificateNumber, phonenumber } = req.body;
        console.log('Received certificate number:', certificateNumber, phonenumber);

        const dateTime = new Date().toISOString();
        const salt = crypto.randomBytes(32).toString('hex');  
    
        const dataToSign = dateTime + salt;
        
        const signature = crypto.createHmac('sha256', process.env.COOL_SMS_API_SECRET)  
                                .update(dataToSign)
                                .digest('hex');
    
        const messageDetails = {
            to: `${phonenumber}`,
            from: `${process.env.COOL_SMS_FROM}`,
            text: `[TMP 인증번호] 휴대폰 인증번호 [${certificateNumber}]를 입력해주세요. `
        };
    
        const headers = {
            'Authorization': `HMAC-SHA256 apiKey=${process.env.COOL_SMS_API_KEY}, date=${dateTime}, salt=${salt}, signature=${signature}`,
            'Content-Type': 'application/json'
        };

        

        try {
            const apiResponse = await fetch('http://api.coolsms.co.kr/messages/v4/send', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ message: messageDetails })
            });
            const apiData = await apiResponse.json();
            res.status(200).json(apiData);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });



module.exports = router;
