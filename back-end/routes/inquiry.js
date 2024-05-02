const express = require("express")
const router = express.Router();
const inquiry = require("../sql/inquiry/inquiry")

router.post('/', async(req, res) => {
    console.log("Received data:", req.body);
    const {inquiry_type, inquiry_phonenumber, inquiry_contents} = req.body
    let result = await inquiry.inquiry(inquiry_type, inquiry_phonenumber, inquiry_contents);
    res.status(200).send(result);
});

module.exports = router;