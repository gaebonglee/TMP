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

router.post('/deleteinquirylist', async(req, res) => {
    console.log("Received data:", req.body);
    const {inquiry_id} = req.body
    let result = await inquiry.deleteInquiryList(inquiry_id);
    console.log("inquiryResult: ", result)
    res.status(200).send(result);
});

router.get('/inquirylist/admin', async(req, res) => {
    let result = await inquiry.adminInquiryList();
    console.log("adminInquiryResult: ", result)
    res.status(200).send(result);
});

router.post('/inquirylist/answer', async(req, res) => {
    console.log("Received data:", req.body);
    const {inquiry_answer, inquiry_id} = req.body
    let result = await inquiry.answerInquiryList(inquiry_answer, inquiry_id);
    console.log("inquiryResult: ", result)
    res.status(200).send(result);
});




module.exports = router;