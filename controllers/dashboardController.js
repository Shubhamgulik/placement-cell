const Student = require("../models/student");
const Interview = require("../models/interview");

module.exports.dashboard = async function (req, res) {
  const students = await Student.find({});
  const interviews = await Interview.find({});

  return res.render("home", {
    title: "Dashboard",
    students,
    interviews,
  });
};
