import WishList from "../Models/wishListModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { sendResponse } from "../utils/apiResponse.js";

export const getWishlist = catchAsync(async (req, res) => {
  const items = await WishList.find({ user: req.user._id });
  sendResponse(res, 200, "Wishlist fetched successfully", { wishlist: items });
});

export const createWishlist = catchAsync(async (req, res) => {
  const item = await WishList.create({ ...req.body, user: req.user._id });
  sendResponse(res, 201, "Added to wishlist", { item });
});

export const deleteWishlist = catchAsync(async (req, res, next) => {
  const item = await WishList.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!item) {
    return next(new AppError("No wishlist item found with that ID", 404));
  }

  sendResponse(res, 200, "Removed from wishlist", null);
});
