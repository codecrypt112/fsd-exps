const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');

module.exports = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const employee = await Employee.findById(decoded.id);
    
    if (!employee) throw new Error();
    
    req.employee = employee;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};
