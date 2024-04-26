const express = require("express")
const router = express.Router();
const searchCenter= require("../sql/mypage/trainer/searchCenter")
const updateUser = require("../sql/mypage/user/updateUser")
const updateCoach = require("../sql/mypage/trainer/updateCoach")
const selectUser = require("../sql/mypage/user/selectUser")
const selectCoach = require("../sql/mypage/trainer/selectCoach")


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


module.exports = router;
