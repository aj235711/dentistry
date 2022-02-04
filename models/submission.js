const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    questions: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
        },
        response: {
          type: String,
          required: true,
          default: "NA",
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Submission", SubmissionSchema);
