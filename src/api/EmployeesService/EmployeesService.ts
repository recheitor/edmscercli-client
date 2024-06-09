
import axios from 'axios'

class EmployeesService {

    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_API_HOST_URL}/api/employees`
        })


    }

    getAllEmployees() {
        return this.api.get('/')
    }

    getOneEmployee(employeeId) {
        return this.api.get(`/${employeeId}`)
    }

    updateEmployee(employeeId,employeeData) {
    return this.api.put(`/${employeeId}`, employeeData)
    }

    createEmployee(employeeData) {
    return this.api.post('/create', employeeData)
    }

    deleteEmployee(employeeId) {
    return this.api.delete(`/${employeeId}`)
    }



}

const employeesService = new EmployeesService()

export default employeesService


