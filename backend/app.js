import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize"; // Optional but good
// import xss from "xss-clean"; // Optional but good

import AppError from "./utils/appError.js";
import globalErrorHandler from "./middleware/errorMiddleware.js";

import packageRouter from "./routes/packageRouter.js";
import hotelRouter from "./routes/hotelRouter.js";
import userRouter from "./routes/userRouter.js";
import commentRouter from "./routes/commentRouter.js";
import bookingRouter from "./routes/bookingRouter.js";
import roomRouter from "./routes/roomRouter.js";
import wishlistRouter from "./routes/wishlistRouter.js";
import contactRouter from "./routes/contactRouter.js";

dotenv.config();

const app = express();

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  console.log('Development mode...');
}

app.set('trust proxy', 1);

// Limit requests from same API
const limiter = rateLimit({
  max: 500, // relaxed limit for deployed site
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
// app.use(mongoSanitize());

// CORS
app.use(cors());

// 2) ROUTES
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Server is healthy' });
});

app.use("/api/package", packageRouter);
app.use("/api/comment", commentRouter);
app.use("/api/user", userRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/hotel", hotelRouter);
app.use("/api/room", roomRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/contact", contactRouter);

// Handle unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// GLOBAL ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

// 3) DATABASE CONNECTION
const DB = process.env.MONGODBURL;
mongoose.set("strictQuery", false);
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('DB connection successful!'))
  .catch(err => console.log('DB CONNECTION ERROR:', err));

// 4) START SERVER
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// HANDLE UNHANDLED REJECTIONS
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

// HANDLE UNCAUGHT EXCEPTIONS
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});
