const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const userController = {
  //! Register
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    //! Validate
    if (!username || !email || !password) {
      throw new Error("All fields are required");
    }

    //! Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("User already exists");
    }

    //! Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //! Create user
    const userCreated = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    //! Send response
    res.json({
      username: userCreated.username,
      email: userCreated.email,
      id: userCreated._id,
    });
  }),

  //! Login
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    //! Validate
    if (!email || !password) {
      throw new Error("Email and password required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    //! Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid password");
    }

    //! Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "JWT_SECRET_KEY",
      { expiresIn: "30d" }
    );

    //! Response
    res.json({
      message: "Login successful",
      token,
      username: user.username,
      email: user.email,
      id: user._id,
    });
  }),

  //! Profile
  profile: asyncHandler(async (req, res) => {
    const user = await User.findById(req.user);

    if (!user) {
      throw new Error("User not found");
    }

    res.json({
      username: user.username,
      email: user.email,
    });
  }),

  //! Change Password
  changeUserPassword: asyncHandler(async (req, res) => {
    const { newPassword } = req.body;

    if (!newPassword) {
      throw new Error("New password is required");
    }

    const user = await User.findById(req.user);
    if (!user) {
      throw new Error("User not found");
    }

    //! Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;

    await user.save({ validateBeforeSave: false });

    res.json({ message: "Password changed successfully" });
  }),

  //! Update Profile
  updateUserProfile: asyncHandler(async (req, res) => {
    const { email, username } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user,
      { username, email },
      { new: true }
    );

    res.json({
      message: "User profile updated successfully",
      updatedUser,
    });
  }),
};

module.exports = userController;