const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required!'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    required: [true, 'confirmation required'],
    // works on create or Save
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords dont match',
    },
  },
});

userSchema.pre('save', async function (next) {
  // hash only when password is modified
  if (!this.isModified('password')) return next();

  // hash with the cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // delete confirm password
  this.confirmPassword = undefined;
  next();
});

const User = mongoose.model('user', userSchema);
module.exports = User;
