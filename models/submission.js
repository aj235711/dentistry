const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
  {
    name:{
      type: String,
      required: true,
    },
    weightage:{
      type: Number,
      required: true,
      default: 1,
    }
  }
);

const QuestionSchema = mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required:true,
    },
    text:{
      type: String,
      requirde: true,
    },
    weightage: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    }
  }
)

const SubmissionSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    questions:[
      {
        questionId:{
          type: mongoose.Schema.Types.ObjectId,
          ref:'Question'
        },
        response:{
          type: Number,
          required: true,
          min:-1,
          max:1,
          default:0,
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
module.exports = mongoose.model("Question", QuestionSchema);
module.exports = mongoose.model("Submission", SubmissionSchema);
