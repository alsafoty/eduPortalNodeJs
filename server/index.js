const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const User = require("../models/user");
const Course = require("../models/course");
const dbURI =
  "mongodb+srv://ahmad:edu1234@eduportal.pt2ytbm.mongodb.net/eduportal?retryWrites=true&w=majority&appName=EduPortal";

const PORT = process.env.PORT || 3000;
mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(PORT);
    console.log("connected to index");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const users = require("../routes/api/users");
const courses = require("../routes/api/courses");

app.use("/api/users", users);
app.use("/api/courses", courses);
