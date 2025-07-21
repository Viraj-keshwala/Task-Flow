const { Schema, model, Types } = require('mongoose');
const notificationSchema = new Schema({
  userId:  { type: Types.ObjectId, ref: 'User' },
  message: String,
  isRead:  { type: Boolean, default: false }
}, { timestamps: true });

module.exports = model('Notification', notificationSchema);
