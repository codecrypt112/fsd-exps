import Task from '../models/Task.js';

export const createTask = async (req, res) => {
  try {
    console.log('Creating task with data:', req.body);
    console.log('User ID from token:', req.user._id);
    
    const { title, description, priority, dueDate } = req.body;
    const userId = req.user._id; // Assuming user is attached to request after authentication

    // Validation
    if (!title) {
      return res.status(400).json({ message: 'Title is required.' });
    }

    // Process dueDate if provided
    let processedDueDate = null;
    if (dueDate) {
      processedDueDate = new Date(dueDate);
      if (isNaN(processedDueDate.getTime())) {
        return res.status(400).json({ message: 'Invalid due date format.' });
      }
    }

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate: processedDueDate,
      user: userId,
    });

    console.log('Task created successfully:', task._id);
    return res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error.message, error.stack);
    return res.status(500).json({ message: 'Failed to create task.', error: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const userId = req.user._id;
    const tasks = await Task.find({ user: userId }).sort({ createdAt: -1 });

    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch tasks.', error: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const task = await Task.findOne({ _id: id, user: userId });

    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch task.', error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, dueDate, completed } = req.body;
    const userId = req.user._id;

    const task = await Task.findOneAndUpdate(
      { _id: id, user: userId },
      { title, description, priority, dueDate, completed },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update task.', error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const task = await Task.findOneAndDelete({ _id: id, user: userId });

    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    return res.status(200).json({ message: 'Task deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete task.', error: error.message });
  }
};