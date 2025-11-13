import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
  Alert,
  Stack,
} from '@mui/material';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { DragDropContext } from '@hello-pangea/dnd';
import TaskForm from './components/TaskForm/TaskForm.jsx';
import TaskList from './components/TaskList/TaskList.jsx';
import { LoginModal, RegisterModal } from './components/Auth/AuthModals.jsx';
import { useAuth } from './contexts/AuthContext.jsx';
import { api } from './utils/api.js';
import './App.css';

const STATUSES = ['Todo', 'In Progress', 'Completed'];

const buildStatusMap = (tasks) =>
  STATUSES.reduce((acc, status) => {
    acc[status] = tasks.filter((task) => task.status === status);
    return acc;
  }, {});

const useTasksTheme = () =>
  useMemo(() => {
    let theme = createTheme({
      palette: {
        primary: {
          main: '#2563eb',
        },
        secondary: {
          main: '#6366f1',
        },
        background: {
          default: '#f4f6f8',
        },
      },
      shape: {
        borderRadius: 12,
      },
      typography: {
        fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        h3: {
          fontWeight: 700,
        },
      },
    });

    theme = responsiveFontSizes(theme);

    theme = {
      ...theme,
      components: {
        ...theme.components,
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 999,
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              borderRadius: 16,
            },
          },
        },
      },
    };

    return theme;
  }, []);

function App() {
  const theme = useTasksTheme();
  const { user, token, loading: authLoading } = useAuth();
  const [tasksByStatus, setTasksByStatus] = useState(buildStatusMap([]));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const fetchTasks = async () => {
    if (!token) return; // Don't fetch if not authenticated
    
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/api/tasks');
      setTasksByStatus(buildStatusMap(response.data));
    } catch (err) {
      if (err?.response?.status === 401) {
        // Token might be invalid, log out user
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload(); // This will redirect to login
      } else {
        setError(err?.response?.data?.message || 'Unable to fetch tasks.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  const handleLogin = (userData, authToken) => {
    // This is handled by AuthContext
  };

  const handleRegister = (userData, authToken) => {
    // This is handled by AuthContext
  };

  const moveTask = (sourceStatus, destinationStatus, sourceIndex, destinationIndex) => {
    setTasksByStatus((prev) => {
      const next = structuredClone(prev);
      const [movedTask] = next[sourceStatus].splice(sourceIndex, 1);
      movedTask.status = destinationStatus;
      next[destinationStatus].splice(destinationIndex, 0, movedTask);
      return next;
    });
  };

  const handleDragEnd = async ({ destination, source, draggableId }) => {
    if (!destination || !token) return;

    const isSamePosition =
      destination.droppableId === source.droppableId && destination.index === source.index;

    if (isSamePosition) return;

    moveTask(source.droppableId, destination.droppableId, source.index, destination.index);

    try {
      await api.put(`/api/tasks/${draggableId}`, {
        status: destination.droppableId,
      });
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to update task status.');
      fetchTasks();
    }
  };

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  // If user is not authenticated, show login prompt
  if (!token) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', py: 6 }}>
          <Container maxWidth="sm">
            <Stack spacing={4} alignItems="center" justifyContent="center" sx={{ minHeight: '100vh' }}>
              <Typography variant="h3" component="h1" textAlign="center">
                Project Management Board
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" textAlign="center">
                Please log in to access your tasks
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button 
                  variant="outlined" 
                  onClick={() => setShowRegisterModal(true)}
                  sx={{ borderRadius: 999 }}
                >
                  Register
                </Button>
                <Button 
                  variant="contained" 
                  onClick={() => setShowLoginModal(true)}
                  sx={{ borderRadius: 999 }}
                >
                  Login
                </Button>
              </Stack>
            </Stack>
          </Container>
        </Box>
        <LoginModal 
          open={showLoginModal} 
          onClose={() => setShowLoginModal(false)} 
          onLogin={handleLogin}
        />
        <RegisterModal 
          open={showRegisterModal} 
          onClose={() => setShowRegisterModal(false)} 
          onRegister={handleRegister}
        />
      </ThemeProvider>
    );
  }

  // If user is authenticated, show the main app
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', py: 6 }}>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Box textAlign="center">
              <Typography variant="h3" component="h1" gutterBottom>
                Project Management Board
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Welcome, {user?.name || 'User'}! Organise your workflow by dragging tasks across the board.
              </Typography>
            </Box>

            <TaskForm onTaskAdded={fetchTasks} />

            {error && (
              <Alert severity="error" onClose={() => setError('')}>
                {error}
              </Alert>
            )}

            {loading ? (
              <Box display="flex" justifyContent="center" py={6}>
                <CircularProgress />
              </Box>
            ) : (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 3,
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                    animation: 'fade-in-up 0.6s ease',
                  }}
                >
                  {STATUSES.map((status) => (
                    <TaskList
                      key={status}
                      status={status}
                      tasks={tasksByStatus[status] ?? []}
                      onTaskUpdated={fetchTasks}
                    />
                  ))}
                </Box>
              </DragDropContext>
            )}
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
