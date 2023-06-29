const { default: mongoose } = require("mongoose");
const Interview = require("../models/interview");
const Student = require("../models/student");

// Render Interview Page
module.exports.addInterview = function (req, res) {
  return res.render("interview", {
    title: "Add a company",
  });
};

// Create Interview
module.exports.createInterview = async function (req, res) {
  try {
    await Interview.create(req.body);
    return res.redirect("/");
  } catch (error) {
    console.warn("Error in adding Interview : ", error);
    return res.redirect("back");
  }
};

// Get Interview Details
module.exports.getInterviewDetails = async function (req, res) {
  try {
    const interview = await Interview.findById(req.params.id).populate(
      "students.student"
    );
    console.log("Interview with populate: ", interview);

    if (interview) {
      return res.render("interview_details", {
        title: "Details",
        interview,
      });
    }
  } catch (error) {
    console.warn("Error in getting interview details", error);
    return res.redirect("back");
  }
};

// Enroll Student
module.exports.enrollStudent = async function (req, res) {
  console.log("Enrolled students: ", req.body);
  try {
    const interview = await Interview.findById(req.body.company__id).populate(
      "students.student"
    );

    if (interview) {
      // Find the student within the interview's students array
      const present = interview.students.find(
        (student) => student.student.email === req.body.email
      );

      console.log("Student found : ", interview.students);

      // const present = await Interview.findOne({
      //   "students.studentId": student.id,
      // });

      if (!present) {
        const student = await Student.findOne({ email: req.body.email });

        console.log("Students enrolled: ", student);
        interview.students.push({
          student: student._id,
          result: req.body.result,
        });
        interview.save();

        student.interviews.push({
          company: req.body.company__id,
          result: req.body.result,
        });
        student.save();

        console.log("Checking array: ", interview);
        return res.redirect("back");
      }

      console.log("Student already exists");
      return res.redirect("back");
    }

    console.log("Company does not exists");
    return res.redirect("back");
  } catch (error) {
    console.log("Error in Enrolling student : ", error);
    return res.redirect("back");
  }
};

// Delete Student
module.exports.deleteStudent = function (req, res) {
  const interviewId = req.params.interviewId;
  const studentId = req.params.studentId;

  Interview.findById(interviewId)
    .then((interview) => {
      if (!interview) {
        console.log("Interview not found");
        return res.redirect("back");
      }

      // Find the index of the student to remove from the students array
      const studentIndex = interview.students.findIndex(
        (student) => student.student.toString() === studentId
      );

      if (studentIndex === -1) {
        console.log("Student not found in the interview");
        return res.redirect("back");
      }

      // Remove the student from the students array
      interview.students.splice(studentIndex, 1);

      // Save the updated interview document
      interview
        .save()
        .then(() => {
          // Remove the interview reference from the student's interviews array
          return Student.findByIdAndUpdate(
            studentId,
            { $pull: { interviews: { company: interviewId } } },
            { new: true }
          );
        })
        .then((updatedStudent) => {
          console.log("Student and Interview removed.");
          return res.redirect("/");
        })
        .catch((error) => {
          console.log("Interview not found");
          return res.redirect("back");
        });
    })
    .catch((error) => {
      console.log("Interview not found");
      return res.redirect("back");
    });
};
