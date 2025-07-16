const express = require("express");
const mongoose = require("mongoose");
const Course = require("../../models/course");
const jwt = require("jsonwebtoken");

const dbURI =
  "mongodb+srv://ahmad:edu1234@eduportal.pt2ytbm.mongodb.net/eduportal?retryWrites=true&w=majority&appName=EduPortal";
const router = express.Router();

router.use(express.json());
mongoose
  .connect(dbURI)
  .then((result) => {
    console.log("connected to courses");
  })
  .catch((err) => {
    console.log(err);
  });

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.user = decoded;
    next();
  });
};

// Get all courses
router.get("/", (req, res) => {
  Course.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Create a new course
router.post("/", verifyToken, (req, res) => {
  const course = new Course(req.body);
  course
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Get a specific course by ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Course.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Update a specific course by ID
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  Course.findByIdAndUpdate(id, updatedData, { new: true })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Delete a specific course by ID
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Course.findByIdAndDelete(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
