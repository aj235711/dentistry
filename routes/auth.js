const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jsonwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
require("dotenv").config();
const saltrounds = 10;

const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

const createOtp = () => {
  return String(Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000);
};

const sendOtp = async (toEmail, otp, res) => {
  const transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: process.env.mail1,
        pass: process.env.mail1,
      },
    })
  );
  const to = toEmail,
    subject = "OTP for Dentistry",
    message = otp;
  const mailOptions = {
    from: process.env.mail1,
    to: to,
    subject: subject,
    html: message,
  };
  return transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).json("unexpected error");
    } else {
      console.log("Email sent: " + info.response);
      res.json({ success: true });
    }
  });
};

router.post("/signup", async (req, res) => {
  var newUser = new User({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
  });
  try {
    const profile = await User.findOne({ email: newUser.email });
    if (!profile) {
      bcrypt.hash(newUser.password, saltrounds, (err, hash) => {
        if (err) {
          console.log("error:", err.message);
        } else {
          newUser.password = hash;
          newUser
            .save()
            .then(() => res.json({ success: true, msg: "User Created" }))
            .catch((er) => console.log("error: ", er.message));
        }
      });
    } else {
      res.json({ success: false, msg: "User already exists" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json("internal server error");
  }
});

router.post("/login", async (req, res) => {
  var newUser = {
    email: req.body.email,
    password: req.body.password,
  };
  User.findOne({ email: newUser.email })
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
              res.status(500).json("An error occured");
            } else if (result === true) {
              const otp = createOtp();
              profile.otp = otp;
              await profile.save();
              await sendOtp(req.body.email, otp, res);
            } else {
              res.send("User Unauthorized");
            }
          }
        );
      }
    })
    .catch((err) => console.log("error: ", err.message));
});

router.post("/verifyOtp", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (req.body.otp === user.otp) {
      const payload = {
        id: user._id,
        email: user.email,
        name: user.name,
      };
      jsonwt.sign(
        payload,
        process.env.secretKey,
        { expiresIn: 3600 * 24 },
        async (err, token) => {
          if (err) {
            console.log("error: ", err.message);
            res.status(500).json("internal server error");
          }
          user.otp = "";
          await user.save();
          res.json({
            success: true,
            token: "Bearer " + token,
          });
        }
      );
    } else {
      res.json({ success: false });
    }
  } else {
    res.status(500).json("unexpected error");
  }
});

module.exports = router;
