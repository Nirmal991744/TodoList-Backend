// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // Required only for manual auth
  picture: String,  // Optional - used for Google sign-in
  provider: {
    type: String,
    enum: ['manual', 'google'],
    default: 'manual'
  }
});

module.exports = mongoose.model('User', userSchema);
