const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      require: true,
    },
    date: {
      type: String,
      required: true,
    },
    students: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
        },
        result: {
          type: String,
          enum: ["Pass", "On Hold", "Fail", "Didn't attempt"],
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Interview", interviewSchema);
