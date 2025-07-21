const { Schema, model, Types } = require('mongoose');

const historySchema = new Schema({
  status:    { type: String, enum: ['to-do','in-progress','done'] },
  updatedAt: { type: Date, default: Date.now },
  updatedBy: { type: Types.ObjectId, ref: 'User' }
});

const taskSchema = new Schema({
  title:       { type: String, required: true },
  description: String,
  projectId:   { type: Types.ObjectId, ref: 'Project' },
  assignedTo: [{ type: Types.ObjectId, ref: 'User' }],
  
  createdBy:   { type: Types.ObjectId, ref: 'User' },
  priority:    { type: String, enum: ['low','medium','high'], default: 'medium' },
  deadline:    Date,
  status:      { type: String, enum: ['to-do','in-progress','done'], default: 'to-do' },
  history:     [historySchema]
}, { timestamps: true });

module.exports = model('Task', taskSchema);
