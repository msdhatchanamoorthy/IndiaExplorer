import express from "express";
import {
    getAllPackages,
    getPackage,
    ratePackage,
    updatePackage,
    deletePackage,
    addPackage,
    getPkgComment,
    getPkgHotel
} from "../controllers/packageController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";

const packageRouter = express.Router();

packageRouter.get("/", getAllPackages);
packageRouter.get("/:id", getPackage);
packageRouter.get("/:id/comment", getPkgComment);
packageRouter.get("/:id/hotel", getPkgHotel);

// Protected routes
packageRouter.use(protect);

// Users can rate packages
packageRouter.patch("/:id/rate", ratePackage);

// Admin only routes
packageRouter.use(restrictTo('admin'));
packageRouter.post("/", addPackage);
packageRouter.patch("/:id", updatePackage);
packageRouter.delete("/:id", deletePackage);

export default packageRouter;
