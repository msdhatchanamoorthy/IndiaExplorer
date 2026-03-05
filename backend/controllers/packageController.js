import Package from "../Models/packageModel.js";
import Comment from "../Models/commentModel.js";
import Hotel from "../Models/hotelModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { sendResponse } from "../utils/apiResponse.js";

export const getAllPackages = catchAsync(async (req, res) => {
  let query = {};

  if (req.query.type) query.type = req.query.type;
  if (req.query.priceRange) query.priceRange = req.query.priceRange;
  if (req.query.location) {
    query.location = { $regex: req.query.location, $options: "i" };
  }
  if (req.query.rating) query.rating = req.query.rating;

  let packages;
  if (req.query.sort === "rating") {
    packages = await Package.find(query).sort({ rating: -1 });
  } else {
    packages = await Package.find(query);
  }

  sendResponse(res, 200, "Packages fetched successfully", { packages });
});

export const getPackage = catchAsync(async (req, res, next) => {
  const pkg = await Package.findById(req.params.id);
  if (!pkg) {
    return next(new AppError("No such package exists", 404));
  }
  sendResponse(res, 200, "Package fetched successfully", { pkg });
});

export const getPkgComment = catchAsync(async (req, res) => {
  const comments = await Comment.find({ pkg: req.params.id });
  sendResponse(res, 200, "Comments fetched successfully", { comments });
});

export const getPkgHotel = catchAsync(async (req, res, next) => {
  const selectedpkg = await Package.findById(req.params.id);
  if (!selectedpkg) {
    return next(new AppError("No such package exists", 404));
  }

  const hotels = await Hotel.find({ location: selectedpkg.location });
  sendResponse(res, 200, "Hotels for package fetched successfully", { hotels });
});

export const addPackage = catchAsync(async (req, res) => {
  const pkg = await Package.create(req.body);
  sendResponse(res, 201, "Package created successfully", { pkg });
});

export const updatePackage = catchAsync(async (req, res, next) => {
  const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!pkg) {
    return next(new AppError("No such package found", 404));
  }

  sendResponse(res, 200, "Package updated successfully", { pkg });
});

export const deletePackage = catchAsync(async (req, res, next) => {
  const pkg = await Package.findByIdAndDelete(req.params.id);
  if (!pkg) {
    return next(new AppError("No such package found", 404));
  }
  sendResponse(res, 204, "Package deleted successfully", null);
});

export const ratePackage = catchAsync(async (req, res, next) => {
  const pkg = await Package.findById(req.params.id);

  if (!pkg) {
    return next(new AppError("No such package exists", 404));
  }

  const new_rating =
    (req.body.user_rate + pkg.totalRatings * pkg.rating) /
    (pkg.totalRatings + 1);

  const updatedPkg = await Package.findByIdAndUpdate(
    req.params.id,
    {
      totalRatings: pkg.totalRatings + 1,
      rating: new_rating,
    },
    { new: true }
  );

  sendResponse(res, 200, "Package rated successfully", { package: updatedPkg });
});
