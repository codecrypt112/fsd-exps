const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new employee
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, department, position } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const employee = new Employee({ name, email, password: hashedPassword, department, position });
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ email });
    if (!employee) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: employee._id, isAdmin: employee.isAdmin }, process.env.JWT_SECRET);
    res.json({ token, employee });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
