const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      city,
      age,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters.",
      });
    }

    const normalizedEmail = email
      .trim()
      .toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email is already registered.",
      });
    }

    const passwordHash = await bcrypt.hash(
      password,
      10
    );

    const user = await User.create({
      name,
      email: normalizedEmail,
      passwordHash,
      phone: phone || "",
      city: city || "",
      age,
    });

    return res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        city: user.city,
        age: user.age,
        rating: user.rating,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      message: "Failed to register user.",
    });
  }
});

module.exports = router;