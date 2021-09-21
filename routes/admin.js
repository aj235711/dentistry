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

const router = express.Router();