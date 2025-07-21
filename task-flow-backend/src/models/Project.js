const { Schema, model, Types } = require('mongoose');

const projectSchema = new Schema({
  name:        { type: String, required: true },
  description: { type: String },
  createdBy:   { type: Types.ObjectId, ref: 'User' },
  members: [{ type: Types.ObjectId, ref: 'User' }],
  status:      { type: String, enum: ['active','completed','archived'], default: 'active' },
  startDate:   Date,
  endDate:     Date
}, { timestamps: true });

module.exports = model('Project', projectSchema);
