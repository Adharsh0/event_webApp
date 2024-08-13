// const mongoose=require('mongoose');
// mongoose.connect('mongodb+srv://gagangkurup10:omen16@clusterinternship.zup2cqv.mongodb.net/logindetaildb?retryWrites=true&w=majority&appName=Clusterinternship')
// .then((res)=>{
//     console.log(' user DB is connected')
// }).catch((res)=>{
//     console.log(' user DB is not connected ')
// })

const mongoose = require('mongoose');

// User Database Connection
const userDB = mongoose.createConnection('mongodb+srv://gagangkurup10:omen16@clusterinternship.zup2cqv.mongodb.net/logindetaildb?retryWrites=true&w=majority&appName=Clusterinternship', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

userDB.on('connected', () => {
  console.log('User DB is connected');
});

userDB.on('error', (err) => {
  console.log('User DB connection error:', err);
});

// Admin Database Connection
const adminDB = mongoose.createConnection('mongodb+srv://gagangkurup10:omen16@clusterinternship.zup2cqv.mongodb.net/admindetaildb?retryWrites=true&w=majority&appName=Clusterinternship', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

adminDB.on('connected', () => {
  console.log('Admin DB is connected');
});

adminDB.on('error', (err) => {
  console.log('Admin DB connection error:', err);
});

// Event Database Connection
const eventDB = mongoose.createConnection('mongodb+srv://gagangkurup10:omen16@clusterinternship.zup2cqv.mongodb.net/eventdb?retryWrites=true&w=majority&appName=Clusterinternship', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

eventDB.on('connected', () => {
  console.log('Event DB is connected');
});

eventDB.on('error', (err) => {
  console.log('Event DB connection error:', err);
});

module.exports = { userDB, adminDB, eventDB };
