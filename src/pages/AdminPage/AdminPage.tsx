import { useState, useEffect, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Avatar, Button, CircularProgress } from '@mui/material';
import { formatDate } from '../../utils/dateFormatter';
import { Employee, EmployeesService, GetAllEmployeesResponse } from '../../api/EmployeesService';

function AdminPage(): ReactElement {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true); // Start loading
    EmployeesService.getAllEmployees()
      .then(({ data }: GetAllEmployeesResponse) => {
        setEmployees(data);
        setLoading(false); // Stop loading after data is received
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          console.error('Error fetching employees:', err.message);
        } else {
          console.error('Unexpected error:', err);
        }
        setLoading(false); // Stop loading even if there is an error
      });
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Current Employees</Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          {employees.map(employee => (
            <Link to={`/admin/employee/${employee._id}`} key={employee._id} style={{ display: 'block' }}>
              <Card sx={{ display: 'flex', marginBottom: 2, boxShadow: 3, width: '100%', padding: 1, transition: '0.3s', '&:hover': { boxShadow: 6, backgroundColor: 'primary.light', cursor: 'pointer' } }}>
                <Avatar sx={{ width: 50, height: 50, margin: 2 }} src="/static/images/avatar/1.jpg" alt={employee.name} />
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <CardContent>
                    <Typography variant="h6" component="div" color="text.primary">
                      {employee.name.toUpperCase()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">Position: {employee.position}</Typography>
                    <Typography variant="body2" color="text.secondary">Email: {employee.email}</Typography>
                    <Typography variant="body2" color="text.secondary">Salary: {employee.salary}</Typography>
                    <Typography variant="body2" color="text.secondary">Created: {formatDate(employee.createdAt)}</Typography>
                    <Typography variant="body2" color="text.secondary">Updated: {formatDate(employee.updatedAt)}</Typography>
                  </CardContent>
                </Box>
              </Card>
            </Link>
          ))}
        </Box>
      )}
      <Link to="employee/new">
        <Button variant="outlined" size="large" sx={{ margin: '2vw' }}>Add Employee</Button>
      </Link>
      <Link to="/">
        <Button variant="outlined" size="large" sx={{ margin: '2vw' }}>Go Back</Button>
      </Link>
    </Box>
  );
}

export default AdminPage;