"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PrintIcon from "@mui/icons-material/Print";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import axios from "axios";

export default function ReportsTable() {
  const [showTable, setShowTable] = React.useState(false);
  const [report, setReport] = React.useState([]);
  const [fromdate, setFromdate] = React.useState("");
  const [todate, setTodate] = React.useState("");



  const handleGetData = () => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/accountReport/GETAccountPrint?fromDate=${fromdate}&toDate=${todate}`
      )

      .then((responce) => {
        setShowTable(true);
        setReport(responce.data.message);
      })
      .catch(() => alert(`Something went wrong, please try after some time`));
  };

  const handleClear = () => {
    setShowTable(false);
    setFromdate(null);
    setTodate(null);
  };

  return (
    <Box>
      <Typography sx={{ fontWeight: "bold", marginBottom: "15px" }}>
        Reports Summary
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginBottom="20px"
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box display="flex" alignItems="center" gap="25px">
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="From Date"
                value={fromdate ? dayjs(fromdate, "DD/MM/YYYY") : null}
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
                  setFromdate(dayjs(date).format("DD/MM/YYYY"));
                }}
              />
            </DemoContainer>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="To Date"
                value={todate ? dayjs(todate, "DD/MM/YYYY") : null}
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
                  setTodate(dayjs(date).format("DD/MM/YYYY"));
                }}
              />
            </DemoContainer>
            <Button color="error"
              variant="contained"
              
              onClick={handleClear}
            >
              Clear
            </Button>
            <Button
              variant="contained"
              color="success"
              
              onClick={handleGetData}
            >
              Get Data
            </Button>
          </Box>
        </LocalizationProvider>
      </Box>

      {showTable && (
        <Box>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            marginBottom="20px"
            marginRight="20px "
          >
            <IconButton>
              <PrintIcon sx={{ color: "#0d47a1" }} />
            </IconButton>
          </Box>

          <TableContainer component={Paper} sx={{ marginBottom: "20px" }}>
            <Table
              sx={{ minWidth: 650, background: "#e0f2f1" }}
              aria-label="summary table"
            >
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>From Date:</TableCell>
                  <TableCell>{fromdate}</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>To Date:</TableCell>
                  <TableCell>{todate}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Total Fuel Amount:
                  </TableCell>
                  <TableCell>{report?.fuelAmountToReport}</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Total Product Amount:
                  </TableCell>
                  <TableCell>{report?.productAmountToReport}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Total Expenditure:
                  </TableCell>
                  <TableCell>{report?.expenceAmountToReport}</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Total Net Amount:
                  </TableCell>
                  <TableCell sx={{color:"#4fc3f7"}} >{(report?.fuelAmountToReport+report?.productAmountToReport)-report?.expenceAmountToReport}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ background: "#e3f2fd", fontStyle: "bold" }}>
                <TableRow>
                  <TableCell
                    sx={{ fontWeight: "bold", borderBottom: "2px solid #ddd" }}
                  >
                    Date
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", borderBottom: "2px solid #ddd" }}
                  >
                    Fuel Sale Amount
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", borderBottom: "2px solid #ddd" }}
                  >
                    Product Sale Amount
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", borderBottom: "2px solid #ddd" }}
                  >
                    Expense Amount
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", borderBottom: "2px solid #ddd" }}
                  >
                    Net Amount
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {report?.account.map((item)=>(

                
                <TableRow
                  key={""}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:not(:last-child) td": { borderBottom: "1px solid #ddd" },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {item.date}
                  </TableCell>
                  <TableCell align="center">{item.total_fuel_amount}</TableCell>
                  <TableCell align="center">{item.total_product_amount}</TableCell>
                  <TableCell align="center">{item.total_expence_amount}</TableCell>
                  <TableCell align="center" sx={{color:"#4fc3f7"}}>{(item.total_fuel_amount+item.total_product_amount)-item.total_expence_amount}</TableCell>
                </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
}
