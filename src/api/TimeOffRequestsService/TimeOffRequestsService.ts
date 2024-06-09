
import axios from 'axios'

class TimeOffRequestsService {

    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_API_HOST_URL}/api/timeOffRequests`
        })


    }

    getAllTimeOffRequests() {
        return this.api.get('/')
    }

    getEmployeeTimeOffRequests(employeeId) {
        return this.api.get(`/${employeeId}`)
    }

    newTimeOffRequest(timeOffData) {
    return this.api.post('/new', timeOffData)
    }

     deleteTimeOffRequest(timeOffRequestId) {
    return this.api.delete(`/${timeOffRequestId}`)
    }


}

const timeOffRequestsService = new TimeOffRequestsService()

export default timeOffRequestsService


