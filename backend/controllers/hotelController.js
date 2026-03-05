import Hotel from "../Models/hotelModel.js";
import Room from "../Models/roomModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { sendResponse } from "../utils/apiResponse.js";

export const getAllHotels = catchAsync(async (req, res) => {
  const hotels = await Hotel.find({});
  sendResponse(res, 200, "Hotels fetched successfully", { hotels });
});

export const getHotelRoom = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  let rooms;
  if (!req.query.taken) {
    rooms = await Room.find({ hotel: id });
  } else {
    rooms = await Room.find({ hotel: id, taken: false });
  }

  if (!rooms) {
    return next(new AppError("No rooms found for this hotel", 404));
  }
  sendResponse(res, 200, "Rooms fetched successfully", { rooms });
});

export const getHotel = catchAsync(async (req, res, next) => {
  const hotel = await Hotel.findById(req.params.id);
  if (!hotel) {
    return next(new AppError("No hotel found with that ID", 404));
  }
  sendResponse(res, 200, "Hotel fetched successfully", { hotel });
});

export const addHotel = catchAsync(async (req, res) => {
  const hotel = await Hotel.create(req.body);
  sendResponse(res, 201, "Hotel created successfully", { hotel });
});

export const updateHotel = catchAsync(async (req, res, next) => {
  const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!hotel) {
    return next(new AppError("No hotel found with that ID", 404));
  }

  sendResponse(res, 200, "Hotel updated successfully", { hotel });
});

export const deleteHotel = catchAsync(async (req, res, next) => {
  const hotel = await Hotel.findByIdAndDelete(req.params.id);
  if (!hotel) {
    return next(new AppError("No hotel found with that ID", 404));
  }
  sendResponse(res, 204, "Hotel deleted successfully", null);
});
