const express = require("express");
const passport = require("passport");
const router = express.Router();

const interviewController = require("../controllers/interviewController");

router.get("/add-interview", interviewController.addInterview);

router.post("/add-interview", interviewController.createInterview);

router.get("/:id", interviewController.getInterviewDetails);

router.post("/enroll-student", interviewController.enrollStudent);

router.get(
  "/:interviewId/students/:studentId",
  interviewController.deleteStudent
);
module.exports = router;
