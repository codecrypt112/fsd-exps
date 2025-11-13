const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const LeaveApplication = require('../models/LeaveApplication');
const LeaveType = require('../models/LeaveType');

// Apply for leave
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;
    const leaveApplication = new LeaveApplication({
      employee: req.employee.id,
      leaveType,
      startDate,
      endDate,
      reason
    });
    await leaveApplication.save();
    res.status(201).json(leaveApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all leave applications (admin)
router.get('/', authMiddleware, async (req, res) => {
  try {
    if (!req.employee.isAdmin) return res.status(403).json({ message: 'Access denied' });
    const leaveApplications = await LeaveApplication.find().populate('employee leaveType');
    res.json(leaveApplications);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get my leave applications
router.get('/my-leaves', authMiddleware, async (req, res) => {
  try {
    const leaveApplications = await LeaveApplication.find({ employee: req.employee.id }).populate('leaveType');
    res.json(leaveApplications);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Approve/reject leave (admin)
router.put('/:id/status', authMiddleware, async (req, res) => {
  try {
    if (!req.employee.isAdmin) return res.status(403).json({ message: 'Access denied' });
    const { status } = req.body;
    const leaveApplication = await LeaveApplication.findByIdAndUpdate(
      req.params.id,
      { status, approvedBy: req.employee.id },
      { new: true }
    );
    res.json(leaveApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
