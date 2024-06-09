import { useState, useEffect, ReactElement } from 'react';
import { Box, Button, Card, CardContent, CardActions, Typography, Snackbar, Alert } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import EmployeesService from '../../../api/EmployeesService/EmployeesService';
import { Employee } from '../../../api/EmployeesService/interface';
import { TimeOffRequestsService, TimeOffRequest } from '../../../api/TimeOffRequestsService';
import { formatDate } from '../../../utils/dateFormatter';

function EmployeeMainPage(): ReactElement {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [severity, setSeverity] = useState<'success' | 'error'>('success');
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      Promise.all([
        EmployeesService.getOneEmployee(id),
        TimeOffRequestsService.getEmployeeTimeOffRequests(id)
      ])
      .then(([employeeResponse, timeOffRequestsResponse]) => {
        const timeOffRequests = timeOffRequestsResponse.data as TimeOffRequest[];
        setEmployee({ ...employeeResponse.data, timeOffRequests });
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          console.error('Error fetching data:', err.message);
        } else {
          console.error('Unexpected error:', err);
        }
      });
    }
  }, [id]);

  const handleDeleteRequest = (requestId: string) => {
    TimeOffRequestsService.deleteTimeOffRequest(requestId)
      .then(() => {
        setEmployee(prevEmployee => {
          if (!prevEmployee) return null;
          return {
            ...prevEmployee,
            timeOffRequests: prevEmployee.timeOffRequests.filter(request => request._id !== requestId)
          };
        });
        setMessage('Time off request deleted successfully');
        setSeverity('success');
        setOpen(true);
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
      <Typography variant="h4" gutterBottom>My Employee Details</Typography>
      {employee && (
        <Box>
          <Typography variant="h6">Name: {employee.name}</Typography>
          <Typography variant="h6">Position: {employee.position}</Typography>
          <Typography variant="h6">Email: {employee.email}</Typography>
          <Typography variant="h6">Salary: {employee.salary}</Typography>
          <hr />
          <Typography variant="h6" gutterBottom>Time Off Requests</Typography>
          {employee.timeOffRequests.length ? employee.timeOffRequests.map(timeOff => (
            <Card key={timeOff._id} sx={{ marginTop: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="body1">Starts: {formatDate(timeOff.start_date)}</Typography>
                <Typography variant="body1">Ends: {formatDate(timeOff.end_date)}</Typography>
                <Typography variant="body1">Type: {timeOff.request_category_id.name}</Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="secondary" sx={{ margin: '0 auto' }} onClick={() => handleDeleteRequest(timeOff._id)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          )) : <Typography variant="body1">No time off requests</Typography>}
        </Box>
      )}
      <Link to={`/employee/${id}/timeOffRequest`}>
        <Button variant="contained" size="large" sx={{ margin: 2 }}>Request Time Off</Button>
      </Link>
      <Link to="/employee">
        <Button variant="outlined" size="large" sx={{ margin: 2 }}>Go Back</Button>
      </Link>
      <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={() => setOpen(false)} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default EmployeeMainPage;