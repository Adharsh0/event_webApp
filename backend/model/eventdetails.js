const mongoose = require('mongoose');
const { eventDB } = require('./connection'); // Ensure this path is correct

const eventSchema = new mongoose.Schema({
  title: String,
  date: String,
  time: String,
  location: String,
  description: String,
  organizer: String,
  pic: String, // Ensure 'pic' is the correct field name for the image URL
});

const EventData = eventDB.model('events', eventSchema);
module.exports = EventData;
