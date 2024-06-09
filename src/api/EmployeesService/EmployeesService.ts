import axios, { AxiosInstance }  from "axios";
import { Employee, NewEmployee } from './interface';

class EmployeesService {
  api: AxiosInstance;
    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_API_HOST_URL}/api/employees`
        })


    }

    getAllEmployees() {
        return this.api.get('/')
    }

    getOneEmployee(employeeId:string) {
        return this.api.get(`/${employeeId}`)
    }

    updateEmployee(employeeId:string,employeeData:Employee) {
    return this.api.put(`/${employeeId}`, employeeData)
    }

    createEmployee(employeeData:NewEmployee) {
    return this.api.post('/create', employeeData)
    }

    deleteEmployee(employeeId:string) {
    return this.api.delete(`/${employeeId}`)
    }



}

const employeesService = new EmployeesService()

export default employeesService


