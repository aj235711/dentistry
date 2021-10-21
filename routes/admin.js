const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Category = mongoose.model("Category");
const Question = mongoose.model("Question");
const bcrypt = require("bcrypt");
const passport = require("passport");
const authentication = require("../middlewares/authentication");

const router = express.Router();

router.post("/getCategories", authentication, async (req, res) => {
  console.log(req.user);
  try {
    const categories = await Category.find().sort("name");
    res.json({ categories });
  } catch (err) {
    console.log(err);
    res.status(500).json("internal server error");
  }
});

router.post("/addCategory", authentication, async (req, res) => {
  try {
    const { name, description, weightage } = req.body;
    const newCategory = new Category({
      name,
      description,
      weightage,
    });
    await newCategory.save();
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json("internal server error");
  }
});

router.post("/editCategory", authentication, async (req, res) => {
  try {
    const { name, description, weightage, _id } = req.body;
    await Category.findByIdAndUpdate(_id, {
      name,
      description,
      weightage,
    });
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json("internal server error");
  }
});

router.post("/deleteCategory", authentication, async (req, res) => {
  try {
    const { _id } = req.body;
    await Category.findByIdAndDelete(_id);
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json("internal server error");
  }
});

router.post("/getQuestions", authentication, async (req, res) => {
  try {
    const questions = await Question.find({ isDeleted: { $ne: true } }).sort(
      "name"
    );
    res.json({ questions });
  } catch (err) {
    console.log(err);
    res.status(500).json("internal server error");
  }
});

router.post("/addQuestion", authentication, async (req, res) => {
  try {
    const { text, category, weightage } = req.body;
    const newQuestion = new Question({
      category,
      text,
      weightage,
    });
    await newQuestion.save();
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json("internal server error");
  }
});

router.post("/editQuestion", authentication, async (req, res) => {
  try {
    const { text, weightage, _id } = req.body;
    await Question.findByIdAndUpdate(_id, {
      text,
      weightage,
    });
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json("internal server error");
  }
});

router.post("/deleteQuestion", authentication, async (req, res) => {
  try {
    const { _id } = req.body;
    await Question.findByIdAndUpdate(_id, { isDeleted: true });
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json("internal server error");
  }
});

module.exports = router;
