const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const dbURI =
  "mongodb+srv://ahmad:edu1234@eduportal.pt2ytbm.mongodb.net/eduportal?retryWrites=true&w=majority&appName=EduPortal";
const router = express.Router();

router.use(express.json());
mongoose
  .connect(dbURI)
  .then((result) => {
    console.log("connected to users");
  })
  .catch((err) => {
    console.log(err);
  });

// Middleware for JWT validation
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

// Register a new user
router.post("/Register", async (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);

  try {
    // Check if user already exists
    const existingUsername = await User.findOne({
      username: req.body.username,
    });

    const existingId = await User.findOne({
      id: req.body.id,
    });

    if (existingUsername || existingId) {
      return res.status(400).json({ error: "username or id already exists" });
    }

    // Create new user
    const newUser = new User({
      id: req.body.id,
      age: req.body.age,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      role: req.body.role,
      username: req.body.username,
      specialisation: req.body.specialisation,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to authenticate and log in a user
router.post("/login", async (req, res) => {
  try {
    // Check if the email exists
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ username: user.username }, "secret");
    res.status(200).json({ token: token, role: user.role, id: user.id });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all users
router.get("/", verifyToken, (req, res) => {
  User.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Get a user by ID
router.get("/:id", verifyToken, (req, res) => {
  const id = req.params.id;
  User.findOne({ id: id })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Update a user by ID
router.put("/:id", verifyToken, (req, res) => {
  let id = req.params.id;
  User.findOne({ id: id })
    .then((result) => {
      id = result._id.toString();
      User.findByIdAndUpdate(id, req.body)
        .then((result) => {
          res.send(result);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Delete a user by ID
router.delete("/:id", verifyToken, (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
