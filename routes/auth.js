const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jsonwt = require("jsonwebtoken");
require("dotenv").config();
const saltrounds = 10;

const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.post("/signup", async (req, res) => {
  var newUser = new User({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
  });
  await User.findOne({ email: newUser.email })
    .then(async (profile) => {
      if (!profile) {
        bcrypt.hash(newUser.password, saltrounds, async (err, hash) => {
          if (err) {
            console.log("error:", err.message);
          } else {
            newUser.password = hash;
            await newUser
              .save()
              .then(() => res.status(200).send("User Created"))
              .catch((er) => console.log("error: ", er.message));
          }
        });
      } else {
        res.send("User already exist");
      }
    })
    .catch((err) => console.log("error: ", err));
});

router.post("/login", async (req, res) => {
  var newUser = {
    email: req.body.email,
    password: req.body.password,
  };
  await User.findOne({ email: newUser.email })
    .then((profile) => {
      if (!profile) {
        res.send("User not Found");
      } else {
        bcrypt.compare(
          newUser.password,
          profile.password,
          async (err, result) => {
            if (err) {
              console.log("error: ", err.message);
            } else if (result == true) {
              const payload = {
                id: profile.id,
                email: profile.email,
              };
              jsonwt.sign(
                payload,
                process.env.secretKey,
                { expiresIn: 3600 },
                (err, token) => {
                  if (err) {
                    console.log("error: ", err.message);
                  }
                  res.json({
                    success: true,
                    token: "Bearer " + token,
                  });
                }
              );
            } else {
              res.send("User Unauthorized");
            }
          }
        );
      }
    })
    .catch((err) => console.log("error: ", err.message));
});
module.exports = router;
