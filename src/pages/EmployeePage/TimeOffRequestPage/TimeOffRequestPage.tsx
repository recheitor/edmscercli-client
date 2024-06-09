import { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RequestCategoriesService, RequestCategory } from "../../../api/RequestCategoriesService";
import { TimeOffRequestsService } from "../../../api/TimeOffRequestsService";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Laptop from "@mui/icons-material/Laptop";
import styles from "./TimeOffRequestPage.module.css";

function TimeOffRequestPage() {
  const { id } = useParams<{ id: string }>();
  const [requestCategoryId, setRequestCategoryId] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [requestCategories, setRequestCategories] = useState<RequestCategory[] | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [severity, setSeverity] = useState<"success" | "error">("error");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const endDateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    RequestCategoriesService.getAllRequestCategories()
      .then(({ data }) => {
        setRequestCategories(data);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          console.error("Error fetching request categories:", err.message);
        } else {
          console.error("Unexpected error:", err);
        }
      });
  }, []);

  const handleCategoryChange = (newCategory: string) => {
    setRequestCategoryId(newCategory);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!requestCategoryId || !startDate || !endDate) {
      setMessage("All fields are required.");
      setSeverity("error");
      setOpen(true);
      return;
    }

    const formData = {
      employee_id: id,
      request_category_id: requestCategoryId,
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
    };

    TimeOffRequestsService.newTimeOffRequest(formData)
      .then(() => {
        setMessage("Time off request submitted successfully");
        setSeverity("success");
        setOpen(true);
        setTimeout(() => {
          navigate(`/employee/${id}`);
        }, 2000);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          setMessage((err as { response?: { data?: { error?: string } } }).response?.data?.error || "An error occurred");
          setSeverity("error");
        } else {
          setMessage("An unexpected error occurred");
          setSeverity("error");
        }
        setOpen(true);
      });
  };

  const disablePastDates = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const disableEndDate = (date: Date) => {
    return startDate ? date < startDate : false;
  };

  const handleStartDateChange = (newDate: Date | null) => {
    setStartDate(newDate);
    if (newDate) {
      setTimeout(() => {
        endDateRef.current?.querySelector('input')?.focus();
      }, 100); // Delay to ensure the end date picker is opened
    }
  };

  return (
    <Box className={styles.container}>
      <Typography variant="h6" className={styles.header}>
        Time Off Request
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" justifyContent="center" marginTop="2vh">
          {requestCategories?.length
            ? requestCategories.map((category) => (
                <Button
                  key={category._id}
                  variant={
                    requestCategoryId === category._id
                      ? "contained"
                      : "outlined"
                  }
                  size="large"
                  onClick={() => handleCategoryChange(category._id)}
                  className={styles.categoryButton}
                >
                  <Box>
                    <IconButton>
                      {category.name === "Annual Leave" && (
                        <FlightTakeoffIcon style={{ color: "green" }} />
                      )}
                      {category.name === "Sick Leave" && (
                        <FavoriteIcon style={{ color: "blue" }} />
                      )}
                      {category.name === "Remote Work" && (
                        <Laptop style={{ color: "purple" }} />
                      )}
                    </IconButton>
                  </Box>
                  <Typography variant="h6" style={{ marginTop: "10px" }}>
                    {category.name}
                  </Typography>
                </Button>
              ))
            : ""}
        </Box>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box className={styles.datePickerContainer}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={handleStartDateChange}
              shouldDisableDate={disablePastDates}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newDate) => setEndDate(newDate)}
              shouldDisableDate={disableEndDate}
              ref={endDateRef}
            />
          </Box>
        </LocalizationProvider>
        <Box className={styles.submitButton}>
          <Button type="submit" variant="contained" size="large">
            Submit
          </Button>
        </Box>
      </form>
      <Box className={styles.goBackButton}>
        <Link to={`/employee/${id}`}>
          <Button variant="outlined" size="large">
            Go Back
          </Button>
        </Link>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpen(false)}
          sx={{ width: "100%" }}
          severity={severity}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default TimeOffRequestPage;