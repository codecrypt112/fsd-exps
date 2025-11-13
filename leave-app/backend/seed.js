const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Employee = require('./models/Employee');
const LeaveType = require('./models/LeaveType');
require('dotenv').config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = new Employee({
      name: 'Admin',
      email: 'admin@company.com',
      password: hashedPassword,
      department: 'Management',
      position: 'Administrator',
      isAdmin: true
    });
    await admin.save();
    
    // Create leave types
    const leaveTypes = [
      { name: 'Annual Leave', maxDays: 21, requiresApproval: true },
      { name: 'Sick Leave', maxDays: 10, requiresApproval: false },
      { name: 'Maternity Leave', maxDays: 90, requiresApproval: true },
      { name: 'Paternity Leave', maxDays: 14, requiresApproval: true },
      { name: 'Unpaid Leave', maxDays: 30, requiresApproval: true }
    ];
    
    await LeaveType.insertMany(leaveTypes);
    
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seed();
