import express from "express";
import { getComment, addComment, updateComment } from "../controllers/commentController.js";
import { protect } from "../middleware/authMiddleware.js";

const commentRouter = express.Router();

commentRouter.get("/", getComment);

// Protected routes
commentRouter.use(protect);
commentRouter.post("/", addComment);
commentRouter.patch("/:id", updateComment);

export default commentRouter;
