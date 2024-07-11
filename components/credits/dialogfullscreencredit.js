import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TableRow,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableBody,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Box,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PrintIcon from "@mui/icons-material/Print";
import { Delete, PictureAsPdf } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import jsPDF from "jspdf";
import SearchIcon from "@mui/icons-material/Search";
import CreditorsDetailsNew from "./dialogcreditorsdetails"; // Adjust the import path as necessary
import CreditNew from "./dialogcredit";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

require("dotenv").config();

const MediumDialog = ({ open, handleClose, data, refresh }) => {
  const [creditHistory, setCreditHistory] = useState([]);
  const [creditData, setCreditData] = useState({});
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editCreditHistory, setEditCreditHistory] = useState(false);
  const [search, setSearch] = React.useState("");

  useEffect(() => {
    if (data?._id) {
      let idQuery = data._id.replace(/['"]/g, "");
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/creditHistory/GETAllCreditHistory?id=${idQuery}&date=${search}`
        )
        .then((response) => {
          setCreditHistory(response.data.message.CreditHistorys);
        })
        .catch(() => alert(`Something Went Wrong at individual`));
    }
  }, [refresh, search]);

  const handleSearch = (value) => {
    // Handle the search functionality here
    console.log("Search clicked", value);
    setSearch(value);
  };

  const exportPDF = () => {
    const personalInfo = {
      name: data.cc_name,
      contact: data.cc_contact_no,
      email: data.cc_email,
      address: data.cc_address,
    };

    const creditHistories = creditHistory.map((history) => ({
      date: history.date,
      name: history.cc_id?.cc_name,
      vehicleNo: history.vehicle_no,
      fuel: history.fuel_type?.fuel_name,
      fuelQuantity: history.fuel_quantity,
      amount: history.amount,
      amountType: history.amount_type,
      staffName: history.emp_id?.emp_name,
    }));

    const pdf = new jsPDF("p", "mm", "a4");

    // Add header
    pdf.setFontSize(18);
    pdf.text("Credit History Report", 105, 15, { align: "center" });
    pdf.setFontSize(12);
    pdf.text("Generated on: " + new Date().toLocaleDateString(), 15, 25);

    // Personal Information
    pdf.setFontSize(14);
    pdf.text("Personal Information", 15, 35);
    pdf.setFontSize(12);
    pdf.text(`Name: ${personalInfo.name}`, 15, 45);
    pdf.text(`Contact: ${personalInfo.contact}`, 15, 55);
    pdf.text(`Email: ${personalInfo.email}`, 15, 65);
    pdf.text(`Address: ${personalInfo.address}`, 15, 75);

    // Credit History
    pdf.setFontSize(14);
    pdf.text("Credit Information", 15, 85);

    const tableHeaders = [
      "Date",
      "Name",
      "Vehicle No.",
      "Fuel",
      "Fuel Quantity",
      "Amount",
      "Amount Type",
      "Staff Name",
    ];

    const startY = 95;
    const rowHeight = 10;
    let currentY = startY;

    // Draw table headers
    pdf.setFontSize(12);
    tableHeaders.forEach((header, i) => {
      pdf.text(header, 15 + i * 25, currentY);
    });

    // Draw table rows
    creditHistories.forEach((history, rowIndex) => {
      currentY += rowHeight;
      if (currentY > 285) {
        // Add new page if it exceeds page height
        pdf.addPage();
        currentY = 10;
      }
      pdf.text(history.date, 15, currentY);
      pdf.text(history.name, 40, currentY);
      pdf.text(history.vehicleNo, 65, currentY);
      pdf.text(history.fuel, 90, currentY);
      pdf.text(history.fuelQuantity.toString(), 115, currentY);
      pdf.text(history.amount.toString(), 140, currentY);
      pdf.text(history.amountType, 165, currentY);
      pdf.text(history.staffName, 190, currentY);
    });

    pdf.save("creditHistory.pdf");
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
  };

  const handleEditCreditHistoryOpen = (history) => {
    setCreditData(history);
    setEditCreditHistory(true);
  };
  const handleEditCreditHistoryClose = () => {
    setEditCreditHistory(false);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold" }}>Credit Details</DialogTitle>
        <DialogContent id="pdfContent">
          <Typography sx={{ fontWeight: "bold", marginBottom: "10px" }}>
            Personal Information
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ background: "#b2dfdb" }}>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Name
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Contact
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Email
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Address
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold" }}
                    className="action-buttons"
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">{data.cc_name}</TableCell>
                  <TableCell align="center">{data.cc_contact_no}</TableCell>
                  <TableCell align="center">{data.cc_email}</TableCell>
                  <TableCell align="center">{data.cc_address}</TableCell>
                  <TableCell align="center" className="action-buttons">
                    <Button onClick={() => setIsEditOpen(true)}>
                      <EditIcon sx={{ color: "#0d47a1" }} />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ marginTop: "20px", marginBottom: "10px" }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              Credit Information
            </Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom="20px"
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Search by date..."
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
            </Box>
          </Box>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ background: "#e3f2fd" }}>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Date
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Name
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Vehicle No.
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Fuel
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Fuel Quantity
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Amount
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Amount Type
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Staff Name
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold" }}
                    className="action-buttons"
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {creditHistory.map((history) => (
                  <TableRow
                    key={history._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{history.date}</TableCell>
                    <TableCell align="center">
                      {history.cc_id?.cc_name}
                    </TableCell>
                    <TableCell align="center">{history.vehicle_no}</TableCell>
                    <TableCell align="center">
                      {history.fuel_type?.fuel_name}
                    </TableCell>
                    <TableCell align="center">
                      {history.fuel_quantity}
                    </TableCell>
                    <TableCell align="center">{history.amount}</TableCell>
                    <TableCell align="center">{history.amount_type}</TableCell>
                    <TableCell align="center">
                      {history.emp_id?.emp_name}
                    </TableCell>
                    <TableCell align="center" className="action-buttons">
                      <Button
                        onClick={() => handleEditCreditHistoryOpen(history)}
                      >
                        <EditIcon sx={{ color: "#0d47a1" }} />
                      </Button>
                      <Button>
                        <PrintIcon sx={{ color: "#039be5" }} />
                      </Button>
                      <Button>
                        <Delete sx={{ color: "#ef5350" }} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Typography sx={{ fontWeight: "bold", marginLeft: "20px" }}>
              Credit to be Paid:{}
            </Typography>
            <Box>
              <IconButton onClick={exportPDF} color="primary">
                <PictureAsPdf />
              </IconButton>
              <Button onClick={handleClose} color="error">
                Close
              </Button>
            </Box>
          </Box>
        </DialogActions>
      </Dialog>

      {isEditOpen && (
        <CreditorsDetailsNew
          close={handleEditClose}
          refresh={refresh} // You might want to adjust this based on your refresh logic
          data={data}
        />
      )}

      {editCreditHistory && (
        <CreditNew
          close={handleEditCreditHistoryClose}
          refresh={refresh} // You might want to adjust this based on your refresh logic
          data={creditData}
          currentAmount={data?.credit_amount}
        />
      )}
    </>
  );
};

export default MediumDialog;
