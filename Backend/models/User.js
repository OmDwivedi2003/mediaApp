const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  profilePic: { type: String },
  dob: { type: Date, required: true },
  age: { type: Number },
  email: { type: String, required: true, unique: true },
  contact: { type: String },
  city: { type: String },
  password: { type: String, required: true, minlength: 6 },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
}]

}, { timestamps: true });

// Calculate age before saving
userSchema.pre('save', function (next) {
  const today = new Date();
  const birthDate = new Date(this.dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  this.age = age;
  next();
});

// Password hash before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


module.exports = mongoose.model('User', userSchema);
