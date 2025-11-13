const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const LeaveType = require('../models/LeaveType');

// Create leave type (admin)
router.post('/', authMiddleware, async (req, res) => {
  try {
    if (!req.employee.isAdmin) return res.status(403).json({ message: 'Access denied' });
    const leaveType = new LeaveType(req.body);
    await leaveType.save();
    res.status(201).json(leaveType);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all leave types
router.get('/', authMiddleware, async (req, res) => {
  try {
    const leaveTypes = await LeaveType.find();
    res.json(leaveTypes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update leave type (admin)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    if (!req.employee.isAdmin) return res.status(403).json({ message: 'Access denied' });
    const leaveType = await LeaveType.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(leaveType);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
