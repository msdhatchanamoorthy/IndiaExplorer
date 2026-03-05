import Comment from "../Models/commentModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { sendResponse } from "../utils/apiResponse.js";

export const getComment = catchAsync(async (req, res) => {
  const comments = await Comment.find({});
  sendResponse(res, 200, "Comments fetched successfully", { comments });
});

export const addComment = catchAsync(async (req, res) => {
  const { pkg, text } = req.body;

  const comment = await Comment.create({
    user: req.user.name,
    pkg,
    text,
  });

  sendResponse(res, 201, "Comment added successfully", { comment });
});

export const updateComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!comment) {
    return next(new AppError("No comment found with that ID", 404));
  }

  sendResponse(res, 200, "Comment updated successfully", { comment });
});
