import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "strict",
      secure: false,
    });

    return res.status(201).json({ success: true, user, token });
  } catch (error) {
    console.error("SignUp Error:", error.message);
    return res.status(500).json({ message: "SignUp failed" });
  }
};

export const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email not found" });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "strict",
      secure: false,
    });

    return res.status(200).json({ success: true, user, token });
  } catch (error) {
    console.error("SignIn Error:", error.message);
    return res.status(500).json({ message: "Login failed" });
  }
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error("Logout Error:", error.message);
    return res.status(500).json({ message: "Logout error" });
  }
};


/**
 * 
 * const User = require("../models/User");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser };

 * 
 */