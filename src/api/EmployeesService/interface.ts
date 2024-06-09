export interface Employee {
  _id: string;
  name: string;
  position: string;
  email: string;
  salary: number;
  createdAt: string;
  updatedAt: string;
}
export interface NewEmployee {
  name: string;
  position: string;
  email: string;
  salary: string;
}
export interface GetAllEmployeesResponse {
  data: Employee[];
}

export interface GetEmployeeResponse {
  data: Employee;
}
