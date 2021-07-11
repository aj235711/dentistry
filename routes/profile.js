const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const User = mongoose.model("User");
const Submission = mongoose.model("Submission");
const Project = mongoose.model("Project");

const router = express.Router();

router.get(
  "/allProjects",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const projects = await Project.find({ userId: req.user._id });
      res.json({ success: true, projects });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, err: err.message });
    }
  }
);

router.post(
  "/createProject",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const project = new Project({
        projectName: req.body.projectName,
        userId: req.user._id,
      });
      const p = await project.save();
      const submission = new Submission({
        projectId: p._id,
        introduction: req.body.introduction,
        methodology: req.body.methodology,
        results: req.body.results,
        discussion: req.body.discussion,
        conclusion: req.body.conslusion,
        abstract: req.body.abstract,
        references: req.body.references,
        generalWriting: req.body.generalWriting,
        total: req.body.total,
      });
      await submission.save();
      res.json({ success: true });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, err: err.message });
    }
  }
);

router.get(
  "/allSubmissions",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const submissions = await Submission.find({
        projectId: req.body.projectId,
      });
      res.json({ success: true, submissions });
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
);

module.exports = router;
