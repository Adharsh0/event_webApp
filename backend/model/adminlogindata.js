

const { adminDB } = require('./connection');
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
});

const AdminData = adminDB.model('admindetails', adminSchema);
module.exports = AdminData;
