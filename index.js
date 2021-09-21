const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
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

app.use(cors());

require("./models/project");
require("./models/user");
require("./models/submission");

app.use(passport.initialize());
require("./middlewares/jsonwtStrategy")(passport);

app.use(require("./routes/auth"));
app.use(require("./routes/profile"));
// app.use(require("./routes/admin"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on ${PORT}`));
