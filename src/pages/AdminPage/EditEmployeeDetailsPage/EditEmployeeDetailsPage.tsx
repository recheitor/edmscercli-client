import { useState, useEffect, ReactElement, ChangeEvent, FormEvent } from 'react';
import { Box, Button, TextField, Snackbar, Alert, Typography } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './EditEmployeeDetailsPage.module.css';
import EmployeesService from '../../../api/EmployeesService/EmployeesService';
import { Employee, GetEmployeeResponse } from '../../../api/EmployeesService';

function EditEmployeeDetailsPage(): ReactElement {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [editedEmployee, setEditedEmployee] = useState<Employee | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [severity, setSeverity] = useState<'success' | 'error'>('success');
  const [open, setOpen] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      EmployeesService.getOneEmployee(id)
        .then(({ data }: GetEmployeeResponse) => {
          setEmployee(data);
          setEditedEmployee(data);
        })
        .catch((err: unknown) => {
          if (err instanceof Error) {
            console.error('Error fetching employee:', err.message);
          } else {
            console.error('Unexpected error:', err);
          }
        });
    }
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (editedEmployee) {
      setEditedEmployee({
        ...editedEmployee,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (id && editedEmployee) {
      EmployeesService.updateEmployee(id, editedEmployee)
        .then(() => {
          setMessage('Employee details updated successfully');
          setSeverity('success');
          setOpen(true);
          setTimeout(() => {
            navigate(`/admin/employee/${id}`);
          }, 2000);
        })
        .catch((err: unknown) => {
          if (err) {
            setMessage((err as { response?: { data?: { error?: string } } }).response?.data?.error || 'An error occurred');
          } else {
            setMessage('An unexpected error occurred');
          }
          setSeverity('error');
          setOpen(true);
        });
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>Edit Employee Details</Typography>
      
      {employee && editedEmployee && (
        <form onSubmit={handleSubmit}>
          <div className={styles.editDetailsForm}>
            <TextField
              name="name"
              label="Name"
              value={editedEmployee.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="position"
              label="Position"
              value={editedEmployee.position}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="email"
              label="Email"
              value={editedEmployee.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
            name="phone"
            label="Phone"
            type="string"
            value={editedEmployee.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
            <TextField
              name="salary"
              label="Salary"
              type="number"
              value={editedEmployee.salary}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '2vw' }}>Submit</Button>
          </div>
        </form>
      )}
      <Link to={`/admin/employee/${id}`}>
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

export default EditEmployeeDetailsPage;