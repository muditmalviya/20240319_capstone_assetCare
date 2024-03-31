const mongoose = require('mongoose');

const PasswordResetTokenSchema = new mongoose.Schema({
  email: String,
  token: String,
  createdAt: { type: Date, default: Date.now, expires: 3600 } // this token will be removed after 1 hour
});

module.exports = mongoose.model('PasswordResetToken', PasswordResetTokenSchema);