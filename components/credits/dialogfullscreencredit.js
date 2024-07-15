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
import ClearIcon from "@mui/icons-material/Clear";
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
  const [search, setSearch] = useState(null);

  useEffect(() => {
    if (data?._id) {
      let idQuery = data._id.replace(/['"]/g, "");
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/creditHistory/GETAllCreditHistory?id=${idQuery}&date=${search || ''}`
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

  // const handleSearch = (date) => {
  //   const formattedDate = date ? dayjs(date).format("DD/MM/YYYY") : null;
  //   setSearch(formattedDate);
  // };

  const handleClearSearch = () => {
    setSearch(null);
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
    //pdfcredit_history starts here....
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
  //pdf credit history end here....

  //abhi extended pdf
  const generateBillPDF = (history) => {
    const pdf = new jsPDF("p", "mm", "a4");

    // Logo
    const logoBase64 = "data:image/jpeg;base64, ..."; // Add your base64 logo data here
    pdf.addImage(logoBase64, "JPEG", 15, 10, 30, 30);

    // Header Background
    pdf.setFillColor(0, 0, 0); // Black background
    pdf.rect(0, 0, 210, 40, "F"); // Full width, height enough to cover the header area

    // Header
    pdf.setFontSize(23);
    pdf.setTextColor(255, 255, 255); // White text
    pdf.setFont("helvetica", "bold");
    pdf.text("Indian Oil", 105, 25, { align: "center" });

    // Reset text color for sub-header and other sections
    pdf.setTextColor(0, 0, 0);

    // Divider between header and sub-header
    pdf.setDrawColor(180, 180, 180); // Light gray color
    pdf.setLineWidth(0.3);
    // pdf.line(15, 40, 195, 40); // Horizontal line

    // Free row space before sub-header
    pdf.text(" ", 15, 45);

    // Sub-Header
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "normal");
    pdf.text("Thanks for fueling up with us!", 105, 50, { align: "center" });

    // Divider between sub-header and fields
    pdf.line(15, 60, 195, 60); // Horizontal line

    // Free row space before fields
    pdf.text(" ", 15, 65);

    // Fields
    pdf.setFontSize(12);
    pdf.setTextColor(180, 180, 180); // Set color to off-white (light gray)
    pdf.text("Date", 15, 70);
    pdf.text("Name", 75, 70);
    pdf.text("Address", 135, 70);

    // Field Values
    pdf.setTextColor(0, 0, 0); // Reset color to black for field values
    pdf.setFontSize(10);
    pdf.text(String(history.date), 15, 75); // Ensure values are converted to strings
    pdf.text(String(history.cc_id?.cc_name), 75, 75);
    pdf.text(String(history.cc_id?.cc_address), 135, 75);

    // Divider between fields and body
    pdf.line(15, 85, 195, 85); // Horizontal line

    // Free row space before body
    pdf.text(" ", 15, 90);

    // Body Field Names
    pdf.setFontSize(12);
    pdf.setTextColor(180, 180, 180); // Set color to off-white (light gray)
    pdf.text("Bill No.", 15, 95);
    pdf.text("Vehicle No.", 75, 95);
    pdf.text("Fuel", 135, 95);
    pdf.text("Fuel Quantity", 15, 115);
    pdf.text("Amount", 75, 115);
    pdf.text("Amount Type", 135, 115);

    // Body Field Values
    pdf.setTextColor(0, 0, 0); // Reset color to black for field values
    pdf.setFontSize(10);
    pdf.text("7288273783181", 15, 100); // Ensure values are converted to strings
    pdf.text(String(history.vehicle_no), 75, 100);
    pdf.text(String(history.fuel_type?.fuel_name), 135, 100);
    pdf.text(String(history.fuel_quantity), 15, 120);
    pdf.text(String(history.amount), 75, 120);
    pdf.text(String(history.amount_type), 135, 120);

    // Staff name at the right bottom of the body section
    pdf.text(`Staff Name: ${String(history.emp_id?.emp_name)}`, 135, 140);

    // Divider between body and footer
    pdf.line(15, 150, 195, 150); // Horizontal line

    // Free row space before footer
    pdf.text(" ", 15, 155);

    // Footer Fields
    pdf.setFontSize(12);
    pdf.setTextColor(180, 180, 180); // Set color to off-white (light gray)
    pdf.text("Fuel Station:", 15, 165);
    pdf.text("Tel:", 75, 165);
    pdf.text("Mail:", 135, 165);

    // Footer Values
    pdf.setTextColor(0, 0, 0); // Reset color to black for field values
    pdf.setFontSize(12);
    pdf.text("Swami's Oils", 40, 165);
    pdf.text("0485 2777809", 83, 165);
    pdf.text("info@swamisoils.com", 145, 165);

    // Divider after first footer with a gap
    pdf.line(15, 175, 195, 175); // Horizontal line

    // Free row space before second footer
    pdf.text(" ", 15, 180);

    // Second Footer
    pdf.setFontSize(14);
    pdf.text("Footer 1", 15, 190);
    pdf.text("Footer 2", 15, 200);

    pdf.save("bill.pdf");
  };

  //extended pdf ends here

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
              <IconButton
                sx={{ marginLeft: "15px" }}
                onClick={handleClearSearch}
              >
                <ClearIcon />
              </IconButton>
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
                        <PrintIcon
                          onClick={() => generateBillPDF(history)}
                          sx={{ color: "#039be5" }}
                        />
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
            <Typography
              sx={{
                fontWeight: "inherit",
                marginLeft: "20px",
                color: "#0d47a1",
              }}
            >
              Credit to be Paid:<b> {data.credit_amount}</b>
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
