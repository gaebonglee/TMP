const express = require("express")
const router = express.Router();
const inquiry = require("../sql/inquiry/inquiry")

router.post('/inquiry', async(req, res) => {
    console.log("Received data:", req.body);
    const {inquiry_type, inquiry_password, inquiry_contents} = req.body
    let result = await inquiry.inquiry(inquiry_type, inquiry_password, inquiry_contents);
    res.status(200).send(result);
});

router.post('/inquirypassword', async(req, res) => {
    console.log("Received data:", req.body);
    const {password} = req.body
    let result = await inquiry.inquiryPassword(password);
    res.status(200).send(result);
});

router.post('/inquirylist', async(req, res) => {
    console.log("Received data:", req.body);
    const {password} = req.body
    let result = await inquiry.inquiryList(password);
    console.log("inquiryResult: ", result)
    res.status(200).send(result);
});



module.exports = router;