const { selectFields } = require('express-validator/lib/field-selection');
const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captain',
    },
    pickup:{
        type: String,
        required: true,
    },
    destination:{
        type: String,
        required: true,
    },
    fare: {
        type: Number,
        required: true,
    },
    duration: { // in seconds
        type: Number,
    },
    distance: { // in meters
        type: Number,
    },
    status:{
        type: String,
        enum: ['pending', 'accepted','ongoing', 'completed', 'cancelled'],
        default: 'pending'
    },
    paymentID: {
        type: String,     
    },
    orderId: {
        type: String,
    },
    signature: {
        type: String,
    },
    otp: {
        type: String,
        select: false, // Do not return OTP in responses
    }
});

const Ride = mongoose.model('Ride', rideSchema);

module.exports = Ride;
