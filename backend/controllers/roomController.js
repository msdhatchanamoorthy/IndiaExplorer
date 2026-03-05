import Room from "../Models/roomModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { sendResponse } from "../utils/apiResponse.js";

export const getAllRooms = catchAsync(async (req, res) => {
  const rooms = await Room.find({});
  sendResponse(res, 200, "Rooms fetched successfully", { rooms });
});

export const getRoom = catchAsync(async (req, res, next) => {
  const room = await Room.findById(req.params.id);
  if (!room) {
    return next(new AppError("No room found with that ID", 404));
  }
  sendResponse(res, 200, "Room fetched successfully", { room });
});

export const addRoom = catchAsync(async (req, res) => {
  const room = await Room.create(req.body);
  sendResponse(res, 201, "Room created successfully", { room });
});

export const updateRoom = catchAsync(async (req, res, next) => {
  const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!room) {
    return next(new AppError("No room found with that ID", 404));
  }

  sendResponse(res, 200, "Room updated successfully", { room });
});

export const deleteRoom = catchAsync(async (req, res, next) => {
  const room = await Room.findByIdAndDelete(req.params.id);
  if (!room) {
    return next(new AppError("No room found with that ID", 404));
  }
  sendResponse(res, 204, "Room deleted successfully", null);
});
