
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    package: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package',
        required: true
    },
    photo: {
        type: String,

    },
    name: {
        type: String,
    },
    numberOfPeople: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
    },
    payment: {
        type: String,

    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    bookingId: {
        type: String,
        unique: true
    },
    depDate: {
        type: Date
    },
    phone: {
        type: String,
        required: [true, 'Please provide a contact phone number']
    },
    whatsapp: {
        type: String
    },
    cityOfResidence: {
        type: String
    },
    vacationType: {
        type: String
    },
    guestNotes: {
        type: String
    }
}, {
    timestamps: true
});

bookingSchema.pre('save', function (next) {
    if (!this.bookingId) {
        this.bookingId = 'TET' + Date.now() + Math.floor(Math.random() * 1000);
    }
    next();
});


export default mongoose.model('Booking', bookingSchema);
