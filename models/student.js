const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, 
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    batch: {
      type: String,
      required: true,
    },
    college: {
      type: String,
      required: true,
    },
    dsaScore: {
      type: Number,
      required: true,
    },
    webdScore: {
      type: Number,
      required: true,
    },
    reactScore: {
      type: Number,
      required: true,
    },
    placed: {
      type: String,
      enum: ["Placed", "Not placed"],
      required: true,
    },
    interviews: [
      {
        company: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Interview",
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

module.exports = new mongoose.model("Student", studentSchema);
