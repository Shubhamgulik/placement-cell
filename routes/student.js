const express = require("express");
const passport = require("passport");
const router = express.Router();

const studentController = require("../controllers/studentController");

router.get("/add-student", studentController.addStudent);

router.post("/add-student", studentController.createStudent);

router.get("/:id", studentController.getStudentDetails);

router.post("/:id", studentController.updateStudent);

module.exports = router;
