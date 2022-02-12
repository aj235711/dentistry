const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const Submission = mongoose.model("Submission");
const Project = mongoose.model("Project");
const authentication = require("../middlewares/authentication");

const router = express.Router();

router.post("/createSubmission", authentication, async (req, res) => {
  try {
    let project = await Project.findById(req.body.projectId);
    if (!project) {
      project = await new Project({
        name: req.body.projectName,
        userId: req.user._id,
      }).save();
    }
    const submission = new Submission({
      projectId: project._id,
      questions: req.body.questions,
      userId: req.user._id,
    });
    const sub = await submission.save();
    res.json({ success: true, submissionId: sub._id });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.put("/editProject", authentication, async (req, res) => {
  Project.updateOne(
    { _id: req.body.id },
    { projectName: req.body.projectName, published: req.body.published },
    async (err, numAffected) => {
      if (err) {
        console.log(err);
        res.json({ success: false });
      }
    }
  );
  res.json({ success: true });
});

router.delete("/delete/submission", authentication, async (req, res) => {
  Submission.deleteOne({ _id: req.query.id }, (err) => {
    if (err) {
      console.log(err);
      res.json({ success: false });
    }
  });
  res.json({ success: true });
});

router.delete("/delete/project", authentication, async (req, res) => {
  const project = await Project.findOne({ _id: req.query.id });
  if (project) {
    Submission.deleteMany({ projectId: req.query.id }, (err) => {
      if (err) {
        console.log(err);
        res.json({ success: false });
      }
    });
    Project.deleteOne({ _id: req.query.id }, (err) => {
      if (err) {
        console.log(err);
        res.json({ success: false });
      }
    });
  } else {
    res.json({ success: false, message: "no such project" });
  }
  res.json({ success: true });
});

router.get("/allProjects", authentication, async (req, res) => {
  try {
    const projects = await Submission.aggregate([
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$projectId",
          submissions: {
            $addToSet: "$_id",
          },
          latest: { $first: "$createdAt" },
        },
      },
      {
        $lookup: {
          from: "projects",
          localField: "_id",
          foreignField: "_id",
          as: "project",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$project", 0] }, "$$ROOT"],
          },
        },
      },
      { $match: { userId: mongoose.Types.ObjectId(req.user._id) } },
    ]);
    res.json({ success: true, projects });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, err: err.message });
  }
});

router.get("/allSubmissions", authentication, async (req, res) => {
  const projectId = req.params.projectId;
  const userId = req.user._id;
  // const userId = mongoose.Types.ObjectId(req.user._id);
  try {
    const submissions = Submission.find(projectId ? {projectId:projectId} : {userId:userId});
    res.json({ success: true, submissions });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});

router.get("/oneSubmission", authentication, async (req, res) => {
  try {
    const submission = await Submission.findOne({
      _id: req.query.submissionId,
    }).populate("projectId");
    res.json({ success: true, submission });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});

router.get("/submissionResults", authentication, async (req, res) => {
  try {
    const results = await Submission.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(req.query.submissionId),
        },
      },
      {
        $lookup: {
          from: "questions",
          localField: "questions.questionId",
          foreignField: "_id",
          as: "foreignQues",
        },
      },
      {
        $unwind: {
          path: "$foreignQues",
        },
      },
      {
        $unwind: {
          path: "$questions",
        },
      },
      {
        $redact: {
          $cond: [
            {
              $eq: ["$questions.questionId", "$foreignQues._id"],
            },
            "$$KEEP",
            "$$PRUNE",
          ],
        },
      },
      {
        $group: {
          _id: "$foreignQues.category",
          total: {
            $sum: 1,
          },
          yes: {
            $sum: {
              $cond: {
                if: {
                  $eq: ["$questions.response", "YES"],
                },
                then: 1,
                else: 0,
              },
            },
          },
          no: {
            $sum: {
              $cond: {
                if: {
                  $eq: ["$questions.response", "NO"],
                },
                then: 1,
                else: 0,
              },
            },
          },
          na: {
            $sum: {
              $cond: {
                if: {
                  $eq: ["$questions.response", "N/A"],
                },
                then: 1,
                else: 0,
              },
            },
          },
          catId: {
            $first: "$foreignQues.category",
          },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "catId",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: {
          path: "$category",
        },
      },
      {
        $sort: {
          "category.displayOrder": 1,
        },
      },
    ]);

    res.json({ results });
  } catch (err) {
    console.log(err);
    res.status(500).json("internal server error");
  }
});

module.exports = router;
