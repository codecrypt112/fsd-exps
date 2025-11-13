const mongoose = require('mongoose');

const leaveTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  maxDays: { type: Number, required: true },
  requiresApproval: { type: Boolean, default: true }
});

module.exports = mongoose.model('LeaveType', leaveTypeSchema);
