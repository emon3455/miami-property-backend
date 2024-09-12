const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  physicalAddress: {
    type: String,
  },
  ownerName: {
    type: String,
  },
  parcelID: {
    type: String,
  },
});

module.exports = mongoose.model('Address', addressSchema);