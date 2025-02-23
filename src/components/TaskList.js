import { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Button,
  Checkbox,
  Chip,
  Typography,
  useTheme
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useTasks } from '../context/TaskContext';
import { format } from 'date-fns';

function TaskList({ tasks }) {
  const { updateTask, deleteTask } = useTasks();
  const [editingTask, setEditingTask] = useState(null);
  const theme = useTheme();

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateTask(editingTask);
    setEditingTask(null);
  };

  const handleToggleComplete = (task) => {
    updateTask({ ...task, completed: !task.completed });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return theme.palette.error.main;
      case 'medium':
        return theme.palette.warning.main;
      case 'low':
        return theme.palette.success.main;
      default:
        return theme.palette.primary.main;
    }
  };

  return (
    <>
      <List sx={{ 
        maxHeight: 400, 
        overflow: 'auto',
        '& .MuiListItem-root': {
          mb: 1,
          borderRadius: 1,
          backgroundColor: 'white',
          boxShadow: 1,
          '&:hover': {
            backgroundColor: theme.palette.grey[100],
          }
        }
      }}>
        {tasks.length === 0 ? (
          <Typography 
            variant="body1" 
            sx={{ textAlign: 'center', color: theme.palette.text.secondary }}
          >
            No tasks found
          </Typography>
        ) : (
          tasks.map(task => (
            <ListItem
              key={task.id}
              secondaryAction={
                <Box>
                  <IconButton 
                    onClick={() => handleEdit(task)}
                    sx={{ color: theme.palette.primary.main }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton 
                    onClick={() => deleteTask(task.id)}
                    sx={{ color: theme.palette.error.main }}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              }
            >
              <Checkbox
                checked={task.completed}
                onChange={() => handleToggleComplete(task)}
                sx={{
                  color: theme.palette.primary.main,
                  '&.Mui-checked': {
                    color: theme.palette.primary.main,
                  },
                }}
              />
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography
                      sx={{
                        textDecoration: task.completed ? 'line-through' : 'none',
                        color: task.completed ? theme.palette.text.secondary : 'inherit'
                      }}
                    >
                      {task.title}
                    </Typography>
                    <Chip 
                      label={task.priority}
                      size="small"
                      sx={{
                        backgroundColor: getPriorityColor(task.priority),
                        color: 'white',
                      }}
                    />
                  </Box>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    Due: {format(new Date(task.dueDate), 'PP')}
                  </Typography>
                }
              />
            </ListItem>
          ))
        )}
      </List>

      <Dialog open={!!editingTask} onClose={() => setEditingTask(null)} maxWidth="sm" fullWidth>
        {editingTask && (
          <>
            <DialogTitle>Edit Task</DialogTitle>
            <form onSubmit={handleUpdate}>
              <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    required
                    label="Title"
                    value={editingTask.title}
                    onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                  />
                  <TextField
                    label="Description"
                    multiline
                    rows={4}
                    value={editingTask.description}
                    onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                  />
                  <TextField
                    required
                    type="date"
                    label="Due Date"
                    InputLabelProps={{ shrink: true }}
                    value={editingTask.dueDate}
                    onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
                  />
                  <FormControl>
                    <InputLabel>Priority</InputLabel>
                    <Select
                      value={editingTask.priority}
                      label="Priority"
                      onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value })}
                    >
                      <MenuItem value="high">High</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="low">Low</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setEditingTask(null)}>Cancel</Button>
                <Button type="submit" variant="contained">
                  Update Task
                </Button>
              </DialogActions>
            </form>
          </>
        )}
      </Dialog>
    </>
  );
}

export default TaskList; 