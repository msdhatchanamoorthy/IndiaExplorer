import express from "express";
import {
  signup,
  login,
  updateUser,
  getAllUsers,
} from "../controllers/userController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";
import { validateSignup, validateLogin } from "../middleware/validatorMiddleware.js";

const userRouter = express.Router();

userRouter.post("/signup", validateSignup, signup);
userRouter.post("/login", validateLogin, login);

// All routes below this middleware are protected
userRouter.use(protect);

userRouter.patch("/updateMe", updateUser);
userRouter.get("/", restrictTo('admin'), getAllUsers);

export default userRouter;
