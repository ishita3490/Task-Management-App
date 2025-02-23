import { useState } from 'react';
import {
  Button,
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
  useTheme
} from '@mui/material';
import { useTasks } from '../context/TaskContext';
import { Add } from '@mui/icons-material';

function TaskForm() {
  const theme = useTheme();
  const { addTask } = useTasks();
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    completed: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(task);
    setTask({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium',
      completed: false
    });
    setOpen(false);
  };

  return (
    <>
      <Button 
        variant="contained" 
        onClick={() => setOpen(true)}
        startIcon={<Add />}
        sx={{
          px: 4,
          py: 1,
          borderRadius: 2,
          textTransform: 'none',
          fontSize: '1.1rem'
        }}
      >
        Add New Task
      </Button>

      <Dialog 
        open={open} 
        onClose={() => setOpen(false)} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
          }
        }}
      >
        <DialogTitle sx={{ 
          backgroundColor: theme.palette.primary.main,
          color: 'white',
          textAlign: 'center'
        }}>
          Add New Task
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                required
                label="Title"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
              />
              <TextField
                label="Description"
                multiline
                rows={4}
                value={task.description}
                onChange={(e) => setTask({ ...task, description: e.target.value })}
              />
              <TextField
                required
                type="date"
                label="Due Date"
                InputLabelProps={{ shrink: true }}
                value={task.dueDate}
                onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
              />
              <FormControl>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={task.priority}
                  label="Priority"
                  onChange={(e) => setTask({ ...task, priority: e.target.value })}
                >
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button 
              onClick={() => setOpen(false)}
              sx={{ textTransform: 'none' }}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained"
              sx={{ textTransform: 'none' }}
            >
              Add Task
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default TaskForm; 