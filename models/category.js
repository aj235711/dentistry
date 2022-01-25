const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  weightage: {
    type: Number,
    default: 1,
  },
  description: {
    type: String,
  },
  showNa: {
    type: String,
    default: "YES",
  },
  displayOrder: {
    type: Number,
  },
});

module.exports = mongoose.model("Category", CategorySchema);
