import { ReactElement ,useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { EmployeesService, Employee, GetAllEmployeesResponse } from '../../api/EmployeesService';

function EmployeePage(): ReactElement {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    EmployeesService
      .getAllEmployees()
      .then(({data}: GetAllEmployeesResponse) => {
        setEmployees(data);
      })
      .catch((err:string) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Choose One Employee to Login as
        </Typography>
        {employees.map(employee => (
          <Link to={`/employee/${employee._id}`} key={employee._id} style={{ textDecoration: 'none' }}>
            <Card
              sx={{
                marginTop: 2,
                boxShadow: 3,
                transition: '0.3s',
                '&:hover': {
                  boxShadow: 6,
                  backgroundColor: 'primary.light',
                  cursor: 'pointer',
                },
              }}
            >
              <CardContent>
                <Typography variant="h6">{employee.name.toUpperCase()}</Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
        <Link to="/">
          <Button variant="outlined" size="large" sx={{ margin: '2vw' }}>Go Back</Button>
        </Link>
      </Box>
    </>
  );
}

export default EmployeePage;