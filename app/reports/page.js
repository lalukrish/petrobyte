"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, IconButton, InputAdornment, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function ReportsTable() {
  const [showTable, setShowTable] = React.useState(false);

  const handleGetData = () => {
    setShowTable(true);
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
          <Box display="flex" alignItems="center">
            <DatePicker
              label="From Date"
              sx={{
                marginRight: "20px",
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CalendarTodayIcon />
                  </InputAdornment>
                ),
              }}
            />
            <DatePicker
              label="To Date"
              sx={{
                marginRight: "20px",
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CalendarTodayIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#0d47a1",
                "&:hover": {
                  backgroundColor: "#0d47a1",
                },
                color: "#fff",
              }}
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
          >
            <IconButton>
              <PrintIcon sx={{ color: "#0d47a1" }} />
            </IconButton>
            <IconButton>
              <ShareIcon sx={{ color: "#0d47a1" }} />
            </IconButton>
          </Box>

          <TableContainer component={Paper} sx={{ marginBottom: "20px" }}>
            <Table sx={{ minWidth: 650, background:"#e0f2f1"}} aria-label="summary table">
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>From Date:</TableCell>
                  <TableCell>--</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>To Date:</TableCell>
                  <TableCell>--</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Total Fuel Amount:</TableCell>
                  <TableCell>--</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Total Product Amount:</TableCell>
                  <TableCell>--</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Total Expenditure:</TableCell>
                  <TableCell>--</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Total Net Amount:</TableCell>
                  <TableCell>--</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ background: "#e3f2fd", fontStyle: "bold" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", borderBottom: "2px solid #ddd" }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: "bold", borderBottom: "2px solid #ddd" }}>Fuel Sale Amount</TableCell>
                  <TableCell sx={{ fontWeight: "bold", borderBottom: "2px solid #ddd" }}>Product Sale Amount</TableCell>
                  <TableCell sx={{ fontWeight: "bold", borderBottom: "2px solid #ddd" }}>Expense Amount</TableCell>
                  <TableCell sx={{ fontWeight: "bold", borderBottom: "2px solid #ddd" }}>Net Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  key={""}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:not(:last-child) td": { borderBottom: "1px solid #ddd" }
                  }}
                >
                  <TableCell component="th" scope="row">
                    18/07/2001
                  </TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
}
