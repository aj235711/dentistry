const mongoose = require("mongoose");

const QuestionSchema = mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  text: {
    type: String,
    requirde: true,
  },
  weightage: {
    type: Number,
    default: 1,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Question", QuestionSchema);
