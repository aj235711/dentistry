const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  weightage: {
    type: Number,
    required: true,
    default: 1,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("Category", CategorySchema);
