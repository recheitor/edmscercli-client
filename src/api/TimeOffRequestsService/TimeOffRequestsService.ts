import axios, { AxiosInstance }  from "axios";
import {NewTimeOffRequestData} from './interface'

class TimeOffRequestsService {
  api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: `${import.meta.env.VITE_API_HOST_URL}/api/timeOffRequests`,
    });
  }

  getAllTimeOffRequests() {
    return this.api.get("/");
  }

  getEmployeeTimeOffRequests(employeeId:string) {
    return this.api.get(`/${employeeId}`);
  }

  newTimeOffRequest(timeOffData: NewTimeOffRequestData) {
    return this.api.post("/new", timeOffData);
  }

  deleteTimeOffRequest(timeOffRequestId:string) {
    return this.api.delete(`/${timeOffRequestId}`);
  }
}

const timeOffRequestsService = new TimeOffRequestsService();

export default timeOffRequestsService;
