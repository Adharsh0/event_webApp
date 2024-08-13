// const mongoose=require('mongoose');
// const adminschema=mongoose.Schema({
// username:String,
// password:String,
// name:String,
// })
// const admindata=mongoose.model('admindetails',adminschema);
// module.exports=admindata
// const mongoose = require('mongoose');
// const { adminDB } = require('./connection');

// const adminSchema = new mongoose.Schema({
//     username: String,
//     password: String,
//     name: String
// });

// // Update the collection name here
// const Admin = adminDB.model('Admin', adminSchema, 'adminDetails');

// module.exports = Admin;
// const mongoose=require('mongoose');
// const adminschema=mongoose.Schema({
// username:String,

// password:String,
// name:String,


// })
// const admindata=mongoose.model('admindetails',adminschema);
// module.exports=admindata

const { adminDB } = require('./connection');
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
});

const AdminData = adminDB.model('admindetails', adminSchema);
module.exports = AdminData;
