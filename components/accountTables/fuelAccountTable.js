import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Tabs,
  Tab,
  InputAdornment,
  IconButton,
  TextField,
  Alert,
  AlertTitle,
  Snackbar,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EditIcon from "@mui/icons-material/Edit";
import {
  ClearIcon,
  DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FuelNew from "../accounts/dialogfuel";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import dayjs from "dayjs";

import axios from "axios";
import FullScreenDialog from "../accounts/dialogfullscreen";
import FuelNewEmployeeClose from "../accounts/dialogfuelemployeeclose";
const FuelAccountTable = () => {
  const [search, setSearch] = useState("");
  const [fuel, setFuel] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState({});
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [refreshExpence, setRefreshExpence] = React.useState(false);

  const [accountoverview, setAccountoverview] = useState([]);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertSeverity, setAlertSeverity] = React.useState("success");
  //const handleShowAlert = (severity, message) => {
  //   setAlertSeverity(severity);
  //   setAlertMessage(message);
  //   setAlertOpen(true);
  // };
  const handleRefeshExpence = () => {
    // setEditExpence({});
    setRefreshExpence(!refreshExpence);
  };

  const handleClickOpenfuel = () => {
    setFuel(true);
  };

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const handleClosefuel = () => {
    setFuel(false);
  };
  useEffect(() => {
    axios
      .get(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/fuelAccounts/GETFuelAccountOverview?date=${search || ""}`
      )
      .then((response) => {
        setAccountoverview(response.data.message);
        handleRefeshExpence();
      });
  }, [refreshExpence, search]);

  const handleClearSearch = () => {
    setSearch("");
  };

  const handleSearch = (value) => {
    // Handle the search functionality here
    console.log("Search clicked", value);
    setSearch(value);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    // setDialogContent(null);
  };

  const handleDialogOpen = (date, dispencer) => {
    setDialogContent({
      date: date,
      dispencer: dispencer,
    });
    setDialogOpen(true);
  };
  const handleAlertClose = () => {
    setAlertOpen(false);
  };
  return (
    <>
      {/* {alert.open && (
        <Alert
          severity={alert.severity}
          onClose={() => setAlert({ open: false, message: "", severity: "" })}
        >
          <AlertTitle>
            {alert.severity === "success" ? "Success" : "Error"}
          </AlertTitle>
          {alert.message}
        </Alert>
      )} */}
      {dialogOpen ? (
        <FullScreenDialog
          content={dialogContent}
          open={dialogOpen}
          handleClose={handleDialogClose}
        />
      ) : null}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: "20px",
          marginBottom: "20px",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Search by date..."
              value={search ? dayjs(search, "DD/MM/YYYY") : null}
              sx={{
                marginRight: "10px",
                ".MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#0d47a1",
                  },
                  "&:hover fieldset": {
                    borderColor: "#0d47a1",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#0d47a1",
                  },
                },
                ".MuiInputAdornment-root .MuiSvgIcon-root": {
                  color: "#0d47a1",
                },
              }}
              format="DD/MM/YYYY"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CalendarTodayIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(date) => {
                handleSearch(dayjs(date).format("DD/MM/YYYY"));
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <IconButton onClick={handleClearSearch} sx={{ marginRight: "700px" }}>
          <ClearIcon />
        </IconButton>
        <Button
          variant="outlined"
          onClick={handleClickOpenfuel}
          sx={{
            color: "#0d47a1",
            border: "1px solid #0d47a1",
            marginBottom: "0px",
          }}
        >
          Add Fuel Details
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ fontStyle: "normal", background: "#e3f2fd" }}>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Date
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Dispencer
              </TableCell>

              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Net Amount
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accountoverview?.map((accnt) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {accnt.date}
                </TableCell>
                <TableCell align="center">{accnt.dispencer_name}</TableCell>

                <TableCell align="center">{accnt.total_amount}</TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() =>
                      handleDialogOpen(accnt.date, accnt.dispencer_name)
                    }
                  >
                    <OpenInFullIcon sx={{ color: "#0d47a1" }} />
                  </Button>
                  {/* <Button>
                    <CheckBoxIcon sx={{ color: "#0d47a1" }} />
                  </Button> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {fuel ? (
        <FuelNewEmployeeClose close={handleClosefuel} setAlert={setAlert} />
      ) : null}
    </>
  );
};

export default FuelAccountTable;
