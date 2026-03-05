import express from "express";
import {
  getAllRooms,
  getRoom,
  addRoom,
  updateRoom,
  deleteRoom,
} from "../controllers/roomController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";

const roomRouter = express.Router();

roomRouter.get("/", getAllRooms);
roomRouter.get("/:id", getRoom);

// Protected routes
roomRouter.use(protect);
roomRouter.use(restrictTo('admin', 'agent'));

roomRouter.post("/", addRoom);
roomRouter.patch("/:id", updateRoom);
roomRouter.delete("/:id", restrictTo('admin'), deleteRoom);

export default roomRouter;
