import express from "express";
import {
    getAllHotels,
    getHotel,
    addHotel,
    updateHotel,
    deleteHotel,
    getHotelRoom
} from "../controllers/hotelController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";

const hotelRouter = express.Router();

hotelRouter.get("/", getAllHotels);
hotelRouter.get("/:id", getHotel);
hotelRouter.get("/:id/room", getHotelRoom);

// Protected routes
hotelRouter.use(protect);

// Admin and Agent can add/update
hotelRouter.post("/", restrictTo('admin', 'agent'), addHotel);
hotelRouter.patch("/:id", restrictTo('admin', 'agent'), updateHotel);

// Only Admin can delete
hotelRouter.delete("/:id", restrictTo('admin'), deleteHotel);

export default hotelRouter;
