import Stripe from 'stripe';
import Booking from "../Models/bookingModel.js";
import Room from "../Models/roomModel.js";
import Package from "../Models/packageModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { sendResponse } from "../utils/apiResponse.js";
import sendEmail from "../utils/email.js";

// Stripe is initialized lazily inside getCheckoutSession to avoid startup crash
// when STRIPE_SECRET_KEY is not yet configured.
const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.startsWith('sk_test_51P...')) {
    throw new Error('Stripe secret key is not configured. Please set STRIPE_SECRET_KEY in your .env file.');
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY);
};

export const getAllBookings = catchAsync(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate('package')
    .populate('hotel')
    .populate('room');
  sendResponse(res, 200, "Bookings fetched successfully", { bookings });
});

export const calculatePrice = catchAsync(async (req, res) => {
  const { pricePerAdult, noOfPeople } = req.body;

  const discountTiers = [
    { items: 15, discount: 0.3 },
    { items: 10, discount: 0.2 },
    { items: 5, discount: 0.1 },
  ];

  const discountTier = discountTiers.find((tier) => noOfPeople >= tier.items);
  const discount = discountTier ? discountTier.discount : 0;

  const totalPrice = noOfPeople * pricePerAdult * (1 - discount);

  sendResponse(res, 200, "Price calculated", { totalPrice, discount });
});

export const addBooking = catchAsync(async (req, res, next) => {
  const {
    roomId,
    hotelId,
    package: packageId, // Changed to destructure as packageId
    numberOfPeople,
    price,
    depDate,
    phone,
    whatsapp,
    cityOfResidence,
    vacationType,
    guestNotes,
    name // Custom name if provided
  } = req.body;

  // 1) Create booking
  const booking = await Booking.create({
    user: req.user._id,
    package: packageId,
    hotel: hotelId || null,
    room: roomId || null,
    name: name || req.user.name,
    numberOfPeople,
    price: price || 0,
    depDate,
    phone,
    whatsapp,
    cityOfResidence,
    vacationType,
    guestNotes,
    status: 'pending'
  });

  // 2) Mark room as taken if selected
  if (roomId) {
    await Room.findByIdAndUpdate(roomId, { taken: true });
  }

  // 3) Send emails
  const populatedBooking = await Booking.findById(booking._id).populate('user package hotel room');

  // To Customer
  sendEmail({
    email: populatedBooking.user.email,
    subject: `Tour Inquiry Received - ${populatedBooking.bookingId}`,
    message: `Dear ${populatedBooking.name},\n\nWe have received your inquiry for ${populatedBooking.package.name}. Our team will contact you shortly.\n\nBooking ID: ${populatedBooking.bookingId}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #e8a020;">Tour Inquiry Received!</h2>
        <p>Dear <strong>${populatedBooking.name}</strong>,</p>
        <p>Thank you for choosing Dhatchana Tour. We have received your booking request for <strong>${populatedBooking.package.name}</strong>.</p>
        <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Inquiry ID:</strong> ${populatedBooking.bookingId}</p>
          <p><strong>Destination:</strong> ${populatedBooking.package.name}</p>
          <p><strong>Travel Date:</strong> ${populatedBooking.depDate.toDateString()}</p>
          <p><strong>Group Size:</strong> ${populatedBooking.numberOfPeople} People</p>
        </div>
        <p>Our travel expert will call you soon on <strong>${populatedBooking.phone}</strong>.</p>
        <p>Best regards,<br/><strong>Dhatchana Tour Team</strong></p>
      </div>
    `
  }).catch(err => console.error('Email Error (Customer):', err));

  // To Admin
  sendEmail({
    email: process.env.EMAIL_USERNAME,
    subject: `New Tour Booking Request - ${populatedBooking.package.name}`,
    message: `New booking request from ${populatedBooking.name}. Phone: ${populatedBooking.phone}, Email: ${populatedBooking.user.email}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; background: #fff;">
        <h2 style="color: #0d1b3e; border-bottom: 2px solid #e8a020; padding-bottom: 10px;">New Tour Booking Request</h2>
        <div style="margin-top: 20px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background: #f8f8f8;"><td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Customer Name</td> <td style="padding: 10px; border: 1px solid #ddd;">${populatedBooking.name}</td></tr>
            <tr><td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email</td> <td style="padding: 10px; border: 1px solid #ddd;">${populatedBooking.user.email}</td></tr>
            <tr style="background: #f8f8f8;"><td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Phone Number</td> <td style="padding: 10px; border: 1px solid #ddd;">${populatedBooking.phone}</td></tr>
            <tr><td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">WhatsApp</td> <td style="padding: 10px; border: 1px solid #ddd;">${populatedBooking.whatsapp || 'N/A'}</td></tr>
            <tr style="background: #f8f8f8;"><td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">City of Residence</td> <td style="padding: 10px; border: 1px solid #ddd;">${populatedBooking.cityOfResidence || 'N/A'}</td></tr>
            <tr><td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Destination</td> <td style="padding: 10px; border: 1px solid #ddd;">${populatedBooking.package.name}</td></tr>
            <tr style="background: #f8f8f8;"><td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Date of Travel</td> <td style="padding: 10px; border: 1px solid #ddd;">${populatedBooking.depDate.toDateString()}</td></tr>
            <tr><td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">No. of People</td> <td style="padding: 10px; border: 1px solid #ddd;">${populatedBooking.numberOfPeople}</td></tr>
            <tr style="background: #f8f8f8;"><td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Vacation Type</td> <td style="padding: 10px; border: 1px solid #ddd;">${populatedBooking.vacationType || 'N/A'}</td></tr>
            <tr><td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Special Notes</td> <td style="padding: 10px; border: 1px solid #ddd;">${populatedBooking.guestNotes || 'None'}</td></tr>
          </table>
        </div>
      </div>
    `
  }).catch(err => console.error('Email Error (Admin):', err));

  sendResponse(res, 201, "Booking request received", { booking });
});

export const getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the booking
  const booking = await Booking.findById(req.params.bookingId).populate('package');

  if (!booking) {
    return next(new AppError('No booking found with that ID', 404));
  }

  const stripe = getStripe();

  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/payment-success?bookingId=${booking._id}`,
    cancel_url: `${req.protocol}://${req.get('host')}/payment-fail?bookingId=${booking._id}`,
    customer_email: req.user.email,
    client_reference_id: req.params.bookingId,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: booking.price * 100, // cents
          product_data: {
            name: `${booking.package.title} Tour`,
            description: `Booking for ${booking.numberOfPeople} people`,
          },
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
  });

  // 3) Send session to client
  sendResponse(res, 200, "Checkout session created", { session });
});

export const confirmPayment = catchAsync(async (req, res, next) => {
  const { bookingId } = req.body;

  const booking = await Booking.findByIdAndUpdate(bookingId, {
    status: 'confirmed',
    payment: 'paid'
  }, { new: true });

  if (booking) {
    const full = await booking.populate('user package').execPopulate();
    sendEmail({
      email: full.user.email,
      subject: `Payment Successful - ${full.bookingId}`,
      message: `Payment successful for your booking ${full.bookingId}.`,
      html: `<p>Your payment of <strong>₹${full.price.toLocaleString()}</strong> for <strong>${full.package.name}</strong> was successful. Pack your bags!</p>`
    }).catch(err => console.error('Payment Email Error:', err));
  }

  sendResponse(res, 200, "Payment confirmed and booking updated", { booking });
});

export const updateBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!booking) {
    return next(new AppError("No booking found with that ID", 404));
  }

  sendResponse(res, 200, "Booking updated", { booking });
});

export const deleteBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(new AppError("No booking found with that ID", 404));
  }

  // If room was booked, free it
  if (booking.room) {
    await Room.findByIdAndUpdate(booking.room, { taken: false });
  }

  await Booking.findByIdAndDelete(req.params.id);

  sendResponse(res, 204, "Booking deleted", null);
});

export const checkAndDeleteBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(new AppError("No booking found with that ID", 404));
  }

  // Check if departure date is more than 48 hours away
  const isValid = booking.depDate.getTime() - new Date().getTime() > 172800000; // 48 hours in ms

  if (!isValid) {
    return next(new AppError("Cannot cancel booking within 48 hours of departure", 400));
  }

  // Free room
  if (booking.room) {
    await Room.findByIdAndUpdate(booking.room, { taken: false });
  }

  await Booking.findByIdAndDelete(req.params.id);

  sendResponse(res, 200, "Booking cancelled successfully", null);
});
