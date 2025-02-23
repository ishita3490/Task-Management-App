import { useState } from 'react';
import { 
  Container, 
  Grid, 
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardHeader,
  CardContent,
  useTheme
} from '@mui/material';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import { useTasks } from '../context/TaskContext';

function Dashboard() {
  const theme = useTheme();
  const { tasks } = useTasks();
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'completed' ? task.completed : !task.completed);
    
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const upcomingTasks = filteredTasks.filter(task => 
    !task.completed && new Date(task.dueDate) >= new Date()
  );

  const overdueTasks = filteredTasks.filter(task => 
    !task.completed && new Date(task.dueDate) < new Date()
  );

  const completedTasks = filteredTasks.filter(task => task.completed);

  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: theme.palette.grey[100],
      py: 4
    }}>
      <Container maxWidth="lg">
        <Card sx={{ mb: 4, p: 2 }}>
          <Typography variant="h4" gutterBottom sx={{ 
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 3
          }}>
            Task Manager
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <TaskForm />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Search tasks"
                  variant="outlined"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ backgroundColor: 'white' }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Priority Filter</InputLabel>
                  <Select
                    value={priorityFilter}
                    label="Priority Filter"
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    sx={{ backgroundColor: 'white' }}
                  >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="low">Low</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Status Filter</InputLabel>
                  <Select
                    value={statusFilter}
                    label="Status Filter"
                    onChange={(e) => setStatusFilter(e.target.value)}
                    sx={{ backgroundColor: 'white' }}
                  >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Card>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader 
                title="Upcoming Tasks" 
                sx={{ 
                  backgroundColor: theme.palette.primary.main,
                  color: 'white',
                  textAlign: 'center'
                }}
              />
              <CardContent>
                <TaskList tasks={upcomingTasks} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader 
                title="Overdue Tasks" 
                sx={{ 
                  backgroundColor: theme.palette.error.main,
                  color: 'white',
                  textAlign: 'center'
                }}
              />
              <CardContent>
                <TaskList tasks={overdueTasks} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader 
                title="Completed Tasks" 
                sx={{ 
                  backgroundColor: theme.palette.success.main,
                  color: 'white',
                  textAlign: 'center'
                }}
              />
              <CardContent>
                <TaskList tasks={completedTasks} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Dashboard; 