const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
  console.log("👉 SIGNUP HIT");
  console.log("👉 BODY:", req.body);

  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
    });

    console.log("User created:", user.email);

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    console.log(" Signup error:", err.message);
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  console.log(" LOGIN HIT");
  console.log(" BODY:", req.body);

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(" Password mismatch");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, "secret123", {
      expiresIn: "1d",
    });

    console.log("Login successful:", user.email);

    res.json({ token, user });
  } catch (err) {
    console.log(" Login error:", err.message);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

module.exports = router;
