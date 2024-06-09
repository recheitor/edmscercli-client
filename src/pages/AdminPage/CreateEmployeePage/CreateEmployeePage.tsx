import { useState, ReactElement, ChangeEvent, FormEvent } from 'react';
import { Box, Button, TextField, Snackbar, Alert, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import styles from './CreateEmployeePage.module.css';
import EmployeesService from '../../../api/EmployeesService/EmployeesService';
import { NewEmployee } from '../../../api/EmployeesService';

function CreateEmployeePage(): ReactElement {
  const [newEmployee, setNewEmployee] = useState<NewEmployee>({
    name: '',
    position: '',
    email: '',
    salary: ''
  });
  const [emailError, setEmailError] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [severity, setSeverity] = useState<'success' | 'error'>('success');
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEmployee({
      ...newEmployee,
      [name]: value
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmployee.email);
    setEmailError(!isValidEmail);

    if (isValidEmail) {
      EmployeesService.createEmployee(newEmployee)
        .then(() => {
          setMessage('Employee created successfully');
          setSeverity('success');
          setOpen(true);
          setTimeout(() => {
            navigate('/admin');
          }, 2000);
        })
        .catch((err: unknown) => {
          if (err instanceof Error) {
            setMessage((err as { response?: { data?: { error?: string } } }).response?.data?.error || 'An error occurred');
          } else {
            setMessage('An unexpected error occurred');
          }
          setSeverity('error');
          setOpen(true);
        });
    }

    setSubmitted(true);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Create Employee</Typography>
      <form onSubmit={handleSubmit}>
        <div className={styles.createEmployeeForm}>
          <TextField
            name="name"
            label="Name"
            value={newEmployee.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="position"
            label="Position"
            value={newEmployee.position}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="email"
            label="Email"
            value={newEmployee.email}
            error={submitted && emailError}
            helperText={submitted && emailError ? 'Invalid email format' : ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="salary"
            label="Salary"
            type="number"
            value={newEmployee.salary}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '2vw' }}>Submit</Button>
        </div>
      </form>
      <Link to="/admin">
        <Button variant="outlined" size="large" sx={{ marginTop: '2vw' }}>Cancel</Button>
      </Link>
      <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={() => setOpen(false)} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default CreateEmployeePage;