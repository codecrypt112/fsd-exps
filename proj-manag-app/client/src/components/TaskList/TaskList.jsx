import PropTypes from 'prop-types';
import { api } from '../../utils/api.js';
import {
  Paper,
  Typography,
  Box,
  Chip,
  Stack,
  IconButton,
  Tooltip,
  Divider,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Droppable, Draggable } from '@hello-pangea/dnd';

const statusColorMap = {
  Todo: 'default',
  'In Progress': 'info',
  Completed: 'success',
};

const priorityColorMap = {
  Low: 'default',
  Medium: 'warning',
  High: 'error',
};

const TaskList = ({ status, tasks, onTaskUpdated }) => {
  const handleDelete = async (taskId) => {
    try {
      await api.delete(`/api/tasks/${taskId}`);
      onTaskUpdated();
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        flex: 1,
        minWidth: 320,
        maxWidth: 420,
        bgcolor: 'background.paper',
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        gap: 2,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">{status}</Typography>
        <Chip
          label={`${tasks.length} task${tasks.length === 1 ? '' : 's'}`}
          size="small"
          color={statusColorMap[status] ?? 'default'}
          variant="outlined"
        />
      </Box>

      <Divider sx={{ mb: 1 }} />

      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <Stack
            ref={provided.innerRef}
            {...provided.droppableProps}
            spacing={2}
            sx={{
              flex: 1,
              p: 1,
              borderRadius: 2,
              bgcolor: snapshot.isDraggingOver ? 'action.hover' : 'transparent',
              transition: 'background-color 0.2s ease',
              minHeight: 200,
            }}
          >
            {tasks.map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {(draggableProvided, draggableSnapshot) => (
                  <Box
                    component={Paper}
                    elevation={draggableSnapshot.isDragging ? 6 : 1}
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'background.default',
                      border: '1px solid',
                      borderColor: draggableSnapshot.isDragging ? 'primary.light' : 'divider',
                      boxShadow: draggableSnapshot.isDragging ? 6 : 1,
                      cursor: 'grab',
                      '&:active': {
                        cursor: 'grabbing',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box sx={{ pr: 1, flex: 1 }}>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                          {task.title}
                        </Typography>
                        {task.description && (
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                            {task.description}
                          </Typography>
                        )}
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {task.priority && (
                            <Chip
                              label={`Priority: ${task.priority}`}
                              size="small"
                              color={priorityColorMap[task.priority] ?? 'default'}
                            />
                          )}
                          {task.dueDate && (
                            <Chip
                              label={`Due: ${new Date(task.dueDate).toLocaleDateString()}`}
                              size="small"
                              variant="outlined"
                            />
                          )}
                        </Box>
                      </Box>
                      <Tooltip title="Delete task">
                        <IconButton
                          size="small"
                          edge="end"
                          onClick={() => handleDelete(task._id)}
                          sx={{ ml: 1 }}
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {tasks.length === 0 && (
              <Typography variant="body2" color="text.secondary" textAlign="center">
                No tasks yet
              </Typography>
            )}
          </Stack>
        )}
      </Droppable>
    </Paper>
  );
};

TaskList.propTypes = {
  status: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      status: PropTypes.string.isRequired,
      dueDate: PropTypes.string,
      priority: PropTypes.string,
    })
  ).isRequired,
  onTaskUpdated: PropTypes.func.isRequired,
};

export default TaskList;
