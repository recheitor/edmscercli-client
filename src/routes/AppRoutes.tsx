import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import AdminPage from "../pages/AdminPage/AdminPage";
import EmployeePage from "../pages/EmployeePage/EmployeePage";
import EmployeeDetailsPage from "../pages/AdminPage/EmployeeDetailsPage/EmployeeDetailsPage";
import EditEmployeeDetailsPage from "../pages/AdminPage/EditEmployeeDetailsPage/EditEmployeeDetailsPage";
import CreateEmployeePage from "../pages/AdminPage/CreateEmployeePage/CreateEmployeePage";
import EmployeeMainPage from "../pages/EmployeePage/EmployeeMainPage/EmployeeMainPage";
import TimeOffRequestPage from "../pages/EmployeePage/TimeOffRequestPage/TimeOffRequestPage";

const AppRoutes = () => {

    return (
        <Routes>
          <Route path="/admin"  element={<AdminPage />} />
          <Route path="/admin/employee/new" element={<CreateEmployeePage />} />
          <Route path="/admin/employee/:id" element={<EmployeeDetailsPage />} />
          <Route path="/admin/employee/:id/edit" element={<EditEmployeeDetailsPage />} />
          <Route path="/employee" element={<EmployeePage />} />
          <Route path="/employee/:id" element={<EmployeeMainPage />} />
          <Route path="/employee/:id/timeOffRequest" element={<TimeOffRequestPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path={'*'} element={<HomePage />} />
        </Routes>
    )
}

export default AppRoutes