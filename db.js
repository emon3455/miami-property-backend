const mongoose = require('mongoose');

// Updated connection string with database name 'miami-property-tax'
const uri = 'mongodb+srv://octopidigitalltd:6vRP9WclYsjUOlBn@cluster0.wvgg4.mongodb.net/miami-property-tax?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {});
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;