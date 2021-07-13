const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const User = mongoose.model("User");
const Submission = mongoose.model("Submission");
const Project = mongoose.model("Project");

const router = express.Router();

router.post(
  "/createProject",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const project = new Project({
        projectName: req.body.projectName,
        userId: req.user._id,
      });
      // if(!Project.findOne({projectName: project.projectName})){
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
      // } else{
      //   res.json({success: false, message: "Project already exists"});
      // }
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, err: err.message });
    }
  }
);

router.post('/createSubmission',passport.authenticate("jwt", { session: false }), async (req, res) => {
  try{
    const project = await Project.findById(req.body.projectId);
    project.catch(err => res.json({error: err.message}));
    if(project){
      const submission = new Submission({
        projectId: req.body.projectId,
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
      res.json({ success: true});
    } else {
      res.json({success: false, error: "project not found"});
    }
    
  }catch(err) {
    res.json({success: false, error: err.message});
  }
});

router.put("/editProject",passport.authenticate("jwt", { session: false }),async (req, res) => {
  try{
    const project = await Project.findById(req.body.id);
    if(project){
      project.update({projectName: req.body.projectName, published:req.body.published})
      await project.save();
      res.json({success: true});
    }else{
      res.json({success: false,error: "Not Found"});
    }
  } catch(e){
    res.status(500).send(e.message);
  }
})

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
