import express from "express";
import { getWishlist, deleteWishlist, createWishlist } from "../controllers/wishlistController.js";
import { protect } from "../middleware/authMiddleware.js";

const wishlistRouter = express.Router();

// All wishlist routes require authentication
wishlistRouter.use(protect);

wishlistRouter.get("/", getWishlist);
wishlistRouter.post("/", createWishlist);
wishlistRouter.delete("/:id", deleteWishlist);

export default wishlistRouter;