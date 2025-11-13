import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { api } from '../../utils/api.js';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const initialFormState = {
  title: '',
  description: '',
  status: 'Todo',
  priority: 'Medium',
  dueDate: null,
};

const TaskForm = ({ onTaskAdded }) => {
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState(initialFormState);
  const [submitting, setSubmitting] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormState(initialFormState);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (value) => {
    setFormState((prev) => ({ ...prev, dueDate: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      ...formState,
      dueDate: formState.dueDate ? formState.dueDate.toISOString() : null,
    };

    setSubmitting(true);
    try {
      await api.post('/api/tasks', payload);
      onTaskAdded();
      handleClose();
    } catch (error) {
      console.error('Failed to create task:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Tooltip title="Create a new task">
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={handleOpen}
            sx={{ borderRadius: 999 }}
          >
            Add Task
          </Button>
        </Tooltip>
      </Box>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Create Task</DialogTitle>
          <DialogContent sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  name="title"
                  value={formState.title}
                  onChange={handleChange}
                  required
                  fullWidth
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  value={formState.description}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Status"
                  name="status"
                  select
                  value={formState.status}
                  onChange={handleChange}
                  fullWidth
                >
                  <MenuItem value="Todo">Todo</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Priority"
                  name="priority"
                  select
                  value={formState.priority}
                  onChange={handleChange}
                  fullWidth
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Due date"
                    value={formState.dueDate}
                    onChange={handleDateChange}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Stack direction="row" spacing={1}>
              <Button onClick={handleClose} color="inherit">
                Cancel
              </Button>
              <Button type="submit" variant="contained" disabled={submitting || !formState.title.trim()}>
                {submitting ? 'Saving...' : 'Create Task'}
              </Button>
            </Stack>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

TaskForm.propTypes = {
  onTaskAdded: PropTypes.func.isRequired,
};

export default TaskForm;
