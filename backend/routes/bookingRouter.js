import express from "express";
import {
    getAllBookings,
    addBooking,
    updateBooking,
    deleteBooking,
    calculatePrice,
    checkAndDeleteBooking,
    getCheckoutSession,
    confirmPayment
} from "../controllers/bookingController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";
import { validateBooking } from "../middleware/validatorMiddleware.js";

const bookingRouter = express.Router();

bookingRouter.use(protect);

bookingRouter.get("/", getAllBookings);
bookingRouter.post("/", validateBooking, addBooking);
bookingRouter.post("/price", calculatePrice);
bookingRouter.get("/checkout-session/:bookingId", getCheckoutSession);
bookingRouter.post("/confirm-payment", confirmPayment);

bookingRouter.use(restrictTo('admin', 'agent')); // Only admin/agent can manage bookings directly
bookingRouter.patch("/:id", updateBooking);
bookingRouter.delete("/:id", checkAndDeleteBooking)
bookingRouter.delete("/:id/force", restrictTo('admin'), deleteBooking);


export default bookingRouter;
