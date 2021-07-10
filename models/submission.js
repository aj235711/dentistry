const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    introduction: [Number],
    methodology: [Number],
    results: [Number],
    discussion: [Number],
    conclusion: [Number],
    abstract: [Number],
    references: [Number],
    generalWriting: [Number],
    total: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Submission", SubmissionSchema);
