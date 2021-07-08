const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo. yeah baby!!");
});

mongoose.connection.on("error", (err) => {
  console.log("err connecting", err);
});

app.get("/api/members", (req, res) => {
  res.send("Hello");
});

// static foulder
app.use(express.static("client/public"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on ${PORT}`));
