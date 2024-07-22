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
import ExpenseNew from "../accounts/dialogexpense";
const ExpenseTable = () => {
  const [search, setSearch] = useState("");
  const [expenceaccount, setExpenceAccount] = React.useState([]);
  const [refreshExpence, setRefreshExpence] = React.useState(false);
  const [expense, setExpense] = useState(false);
  const [editExpence, setEditExpence] = useState({});
  const handleClickOpenexpense = () => {
    setExpense(true);
  };
  useEffect(() => {
    axios
      .get(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/expenceaccount/GETAllExpenceAccount?&date=${search || ""}`
      )
      .then((response) =>
        setExpenceAccount(response.data.message.expenceDetails)
      );
  }, [refreshExpence, search]);

  const handleClearSearch = () => {
    setSearch("");
  };

  const handleSearch = (value) => {
    // Handle the search functionality here
    console.log("Search clicked", value);
    setSearch(value);
  };

  const handleCloseexpense = () => {
    setExpense(false);
    setEditExpence({});
  };

  const handleRefeshExpence = () => {
    setEditExpence({});
    setRefreshExpence(!refreshExpence);
  };

  const handleEditExpence = (editData) => {
    setEditExpence(editData);
    setExpense(true);
  };

  const handleExpenseDelete = (id) => {
    axios
      .delete(
        `${process.env.NEXT_PUBLIC_API_URL}/expenceaccount/DELETEExpenceAccount?id=${id}`
      )
      .then((response) => {
        handleRefeshExpence();
        alert(response.data.message);
      });
  };
  return (
    <>
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
        <IconButton onClick={handleClearSearch} sx={{ marginRight: "660px" }}>
          <ClearIcon />
        </IconButton>
        <Button
          variant="outlined"
          onClick={handleClickOpenexpense}
          style={{
            color: "#0d47a1",
            border: "1px solid #0d47a1",
          }}
        >
          Add Expense Details
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
                Expense Type
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Amount
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Staff (applicable to salary)
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Comments
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenceaccount?.map((expAcc) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {expAcc.date}
                </TableCell>
                <TableCell align="center">{expAcc.expence_type}</TableCell>
                <TableCell align="center">{expAcc.expence_amount}</TableCell>
                <TableCell align="center">
                  {expAcc.emp_id ? expAcc.emp_id.emp_name : "N/A"}
                </TableCell>
                <TableCell align="center">{expAcc.expence_comment}</TableCell>

                <TableCell align="center">
                  <Button onClick={() => handleEditExpence(expAcc)}>
                    <EditIcon sx={{ color: "#0d47a1" }} />
                  </Button>
                  <Button onClick={() => handleExpenseDelete(expAcc._id)}>
                    <DeleteIcon sx={{ color: "#ef5350" }} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {expense ? (
        <ExpenseNew
          close={handleCloseexpense}
          refresh={handleRefeshExpence}
          edit={editExpence}
        />
      ) : null}
    </>
  );
};

export default ExpenseTable;
