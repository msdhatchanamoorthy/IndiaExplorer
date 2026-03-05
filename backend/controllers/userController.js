import User from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { sendResponse } from "../utils/apiResponse.js";

const signToken = (id) => {
  return jwt.sign({ _id: id }, process.env.KEY, {
    expiresIn: '30d',
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // Remove password from output
  user.password = undefined;

  sendResponse(res, statusCode, "Success", {
    token,
    user
  });
};

export const getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  sendResponse(res, 200, "Users fetched successfully", { users });
});

export const signup = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError("User account already exists, Login instead.", 400));
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    password: hashedPassword,
    email,
    role: role || 'user'
  });

  createSendToken(newUser, 201, res);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  createSendToken(user, 200, res);
});

export const updateUser = catchAsync(async (req, res, next) => {
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  // Prevent role updates through this route unless admin
  if (req.body.role && req.user.role !== 'admin') {
    delete req.body.role;
  }

  const user = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }

  sendResponse(res, 200, "User updated successfully", { user });
});
