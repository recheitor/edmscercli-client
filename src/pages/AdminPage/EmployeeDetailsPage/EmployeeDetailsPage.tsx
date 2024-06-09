import React, { useState, useEffect, ReactElement } from 'react';
import { Box, Button, Card, CardContent, CardActions, Typography, Avatar, Grid, Snackbar, Alert } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import EmployeesService from '../../../api/EmployeesService/EmployeesService';
import { formatDate } from '../../../utils/dateFormatter';
import { Employee, GetEmployeeResponse } from '../../../api/EmployeesService';

function EmployeeDetailsPage(): ReactElement {
  const [employee, setEmployee] = useState<Employee | null>(null);
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

  const handleDeleteRequest = (employeeId: string) => {
    EmployeesService.deleteEmployee(employeeId)
      .then(() => {
        setMessage('Employee deleted successfully');
        setSeverity('success');
        setOpen(true);
        setTimeout(() => {
          navigate(`/admin/`);
        }, 2000);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          setMessage(err.response?.data?.error || 'An error occurred');
        } else {
          setMessage('An unexpected error occurred');
        }
        setSeverity('error');
        setOpen(true);
      });
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>Employee Details</Typography>
      {employee && (
        <Card sx={{ boxShadow: 3, padding: 2 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={2}>
                <Avatar sx={{ width: 56, height: 56 }} src="/static/images/avatar/1.jpg" alt={employee.name} />
              </Grid>
              <Grid item xs={12} md={10}>
                <Typography variant="h5" component="div">{employee.name.toUpperCase()}</Typography>
                <Typography variant="body1">Position: {employee.position}</Typography>
                <Typography variant="body1">Email: {employee.email}</Typography>
                <Typography variant="body1">Salary: {employee.salary}</Typography>
                <Typography variant="body2" color="text.secondary">Created: {formatDate(employee.createdAt)}</Typography>
                <Typography variant="body2" color="text.secondary">Updated: {formatDate(employee.updatedAt)}</Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Link to="/admin" style={{ textDecoration: 'none' }}>
              <Button variant="outlined" size="large" sx={{ margin: '2vw' }}>Back</Button>
            </Link>
            <Link to="edit" style={{ textDecoration: 'none' }}>
              <Button variant="outlined" size="large" sx={{ margin: '2vw' }}>Edit</Button>
            </Link>
            <Button variant="outlined" size="large" sx={{ margin: '2vw' }} onClick={() => handleDeleteRequest(id!)}>
              Delete
            </Button>
          </CardActions>
        </Card>
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={() => setOpen(false)} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default EmployeeDetailsPage;