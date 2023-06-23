const { default: mongoose } = require("mongoose");
const Student = require("../models/student");

module.exports.addStudent = function (req, res) {
  return res.render("student", {
    title: "Add a student",
  });
};

module.exports.createStudent = async function (req, res) {
  console.log("Student body : ", req.body);

  try {
    const student = await Student.findOne({ email: req.body.email });
    if (!student) {
      await Student.create(req.body);
      return res.redirect("/");
    } else {
      console.log("Student Already Exists.");
      return res.redirect("back");
    }
  } catch (error) {
    console.warn("Error in adding Student : ", error);
    return res.redirect("back");
  }
};

module.exports.getStudentDetails = async function (req, res) {
  console.log("Student ID: ", req.params.id);
  try {
    const student = await Student.findById(req.params.id);

    if (student) {
      const interviews = await student.populate("interviews.company");
      // console.log("Scheduled Interviews: ", interviews);
      return res.render("student_details", {
        title: "Details",
        student,
        interviews,
      });
    }
  } catch (error) {
    console.warn("Error in getting Student Details :::", error);
    return res.redirect("back");
  }
};

module.exports.updateStudent = function (req, res) {
  const studentId = req.params.id;

  const {
    name,
    email,
    batch,
    college,
    dsaScore,
    webdScore,
    reactScore,
    placed,
  } = req.body;

  // Update the student document
  Student.findByIdAndUpdate(
    studentId,
    {
      name,
      email,
      batch,
      college,
      dsaScore,
      webdScore,
      reactScore,
      placed,
    },
    { new: true } // To return the updated student document
  )
    .then((updatedStudent) => {
      if (!updatedStudent) {
        return res.status(404).json({ error: "Student not found" });
      }

      return res.redirect("back");
    })
    .catch((error) => {
      return res.redirect("Error in updating student: ", error);
    });
};
