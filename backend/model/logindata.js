
const { userDB } = require('./connection');
const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  username: String,
  phoneNo: String,
  password: String,
  name: String,
  city: String,
  dp: String
});

const LoginData = userDB.model('logindetails', loginSchema);
module.exports = LoginData;
