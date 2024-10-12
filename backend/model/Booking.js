const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    username: { type: String, required: true },  // Use this for the user's email
    bookingid: { type: String, required: true },  // Unique booking identifier
    eventid: { type: mongoose.Schema.Types.ObjectId, ref: 'events', required: true }, // Reference to the events collection
    no_of_tickets: { type: Number, required: true, min: 1 }, // Number of tickets, ensure it's at least 1
});

// Create a model for the Booking schema
const Booking = mongoose.model('Bookings', bookingSchema);
module.exports = Booking;
