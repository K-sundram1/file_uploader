const express = require("express");
const router = express.Router();
const { localFileUpload,imageUpload,videoupload} = require("../controllers/fileupload");

// Define your route
router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoupload", videoupload);



module.exports = router;
