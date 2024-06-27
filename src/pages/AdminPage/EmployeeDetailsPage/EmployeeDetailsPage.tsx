import { useState, useEffect, ReactElement } from 'react';
import { Box, Button, Card, CardContent, CardActions, Typography, Avatar, Grid, Snackbar, Alert, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import EmployeesService from '../../../api/EmployeesService/EmployeesService';
import { formatDate } from '../../../utils/dateFormatter';
import { Employee, GetEmployeeResponse } from '../../../api/EmployeesService';

function EmployeeDetailsPage(): ReactElement {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string | null>(null);
  const [severity, setSeverity] = useState<'success' | 'error'>('success');
  const [open, setOpen] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      EmployeesService.getOneEmployee(id)
        .then(({ data }: GetEmployeeResponse) => {
          setEmployee(data);
          setLoading(false);
        })
        .catch((err: unknown) => {
          if (err instanceof Error) {
            console.error('Error fetching employee:', err.message);
          } else {
            console.error('Unexpected error:', err);
          }
          setLoading(false);
        });
    }
  }, [id]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const confirmDelete = () => {
    if (id) {
      EmployeesService.deleteEmployee(id)
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
            setMessage((err as { response?: { data?: { error?: string } } }).response?.data?.error || 'An error occurred');
          } else {
            setMessage('An unexpected error occurred');
          }
          setSeverity('error');
          setOpen(true);
        });
      handleCloseDialog();
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Employee Details</Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      ) : employee ? (
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
                <Typography variant="body1">Phone: {employee.phone}</Typography>
                <Typography variant="body1">Salary: {employee.salary}</Typography>
                <Typography variant="body2" color="text.secondary">Created: {formatDate(employee.createdAt)}</Typography>
                <Typography variant="body2" color="text.secondary">Updated: {formatDate(employee.updatedAt)}</Typography>
                <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold', color: employee.status ? 'green' : 'red' }}>
                  {employee.status ? 'EMPLOYEE IS ONLINE' : 'EMPLOYEE IS OFFLINE'}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Link to="/admin" style={{ textDecoration: 'none' }}>
              <Button variant="outlined" size="large" sx={{ margin: '2vw' }}>Back</Button>
            </Link>
            <Link to={`/admin/employee/${id}/edit`} style={{ textDecoration: 'none' }}>
              <Button variant="outlined" size="large" sx={{ margin: '2vw' }}>Edit</Button>
            </Link>
            <Button variant="outlined" size="large" sx={{ margin: '2vw' }} onClick={handleOpenDialog}>
              Delete
            </Button>
          </CardActions>
        </Card>
      ) : (
        <Typography variant="h6" color="text.secondary">No employee data available.</Typography>
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={() => setOpen(false)} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
<DialogTitle id="alert-dialog-title" sx={{ fontSize: '0.5rem', color: 'darkred', padding: '8px 24px' }}>
  Confirm Deletion
</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this employee?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default EmployeeDetailsPage;