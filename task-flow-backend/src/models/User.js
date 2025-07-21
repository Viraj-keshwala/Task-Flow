const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username:   { type: String, required: true, unique: true },
  password:   { type: String, required: true },
  role:       { type: String, enum: ['admin','manager','team'], default: 'team' },
  createdAt:  { type: Date, default: Date.now }
});

// hash password before save
userSchema.pre('save', async function(next){
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// match password
userSchema.methods.matchPassword = function(pw){
  return bcrypt.compare(pw, this.password);
};

module.exports = model('User', userSchema);
