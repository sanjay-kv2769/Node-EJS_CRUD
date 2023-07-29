const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  position: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  bio: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    require: true,
    default: Date.now,
  },
});

module.exports = mongoose.model('Employee', employeeSchema);
