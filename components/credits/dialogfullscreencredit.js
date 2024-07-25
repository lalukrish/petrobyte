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
          `${
            process.env.NEXT_PUBLIC_API_URL
          }/creditHistory/GETAllCreditHistory?id=${idQuery}&date=${
            search || ""
          }`
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

  const handleFullscreenDelete = (id) => {
    axios
      .delete(
        `${process.env.NEXT_PUBLIC_API_URL}/creditHistory/DELETECreditHistory?id=${id}`
      )
      .then((response) => {
        alert(response.data.message);
        refresh()
        handleClose()
      })
      .catch(() => alert(`Something Went Wrong at individual`));
  };

  //abhi extended pdf
  const generateBillPDF = async (history) => {
    const pdf = new jsPDF("p", "mm", "a4");

    // Load the image from the public folder
    const logoURL =
      "https://yt3.googleusercontent.com/wOiLIBWtEcFrN7PNo2msrcUrwPHzjMUd-HCq57Vjr8PngYJjMEr8twa6K79j0ern9dBLr9bS=s900-c-k-c0x00ffffff-no-rj";
    const logoBase64 = await getBase64FromURL(logoURL);

    // Increase header height to show the image correctly
    const headerHeight = 40;

    // Add logo and company information at the top
    const logoWidth = 50; // Adjust logo width if needed
    const logoHeight = headerHeight; // Increase logo height to match header height
    pdf.addImage(logoBase64, "JPEG", 10, 10, logoWidth, logoHeight - 7);
    pdf.setFont("helvetica", "bold"); // Set header text to bold
    pdf.setFontSize(12);
    pdf.text("Indian Oil Ltd.", 70, 15);
    pdf.text("Swami's Oils", 70, 20);
    pdf.text("Thoppumppady, Ernakulam", 70, 25);
    pdf.text("Tel: 0485 2777809", 70, 30);
    pdf.text("Email: info@swamisoils.com", 70, 35);

    // Add a horizontal line below the header
    pdf.setDrawColor(0, 0, 0);
    pdf.line(10, headerHeight + 10, 200, headerHeight + 10);

    // Add customer details
    pdf.setFont("helvetica", "bold"); // Set text to bold
    pdf.setFontSize(10);
    pdf.text("Invoice To:", 10, headerHeight + 20);
    pdf.setFont("helvetica", "normal"); // Set text back to normal
    pdf.text(`Name: ${history.cc_id?.cc_name}`, 10, headerHeight + 25);
    pdf.text(`Address: ${history.cc_id?.cc_address}`, 10, headerHeight + 30);
    pdf.text(`Contact: ${history.cc_id?.cc_contact_no}`, 10, headerHeight + 35);
    pdf.text(`Email: ${history.cc_id?.cc_email}`, 10, headerHeight + 40);

    // Add invoice details
    pdf.setFont("helvetica", "bold"); // Set text to bold
    pdf.text("Invoice Details:", 10, headerHeight + 50);
    pdf.setFont("helvetica", "normal"); // Set text back to normal
    pdf.text(`Date: ${history.date}`, 10, headerHeight + 55);
    pdf.text(`Vehicle No: ${history.vehicle_no}`, 10, headerHeight + 60);
    pdf.text(`Ref No: 7288273783181`, 10, headerHeight + 65);

    // Add a table for the transaction details
    pdf.setDrawColor(0, 0, 0);
    pdf.line(10, headerHeight + 70, 200, headerHeight + 70);

    pdf.setFont("helvetica", "bold"); // Set table headings to bold
    pdf.setFontSize(10);
    pdf.text("Fuel", 15, headerHeight + 75);
    pdf.text("Fuel Quantity", 65, headerHeight + 75);
    pdf.text("Amount", 115, headerHeight + 75);
    pdf.text("Amount Type", 165, headerHeight + 75);

    pdf.line(10, headerHeight + 77, 200, headerHeight + 77);

    pdf.setFont("helvetica", "normal"); // Set text back to normal
    pdf.text(history.fuel_type?.fuel_name, 15, headerHeight + 85);
    pdf.text(String(history.fuel_quantity), 65, headerHeight + 85);
    pdf.text(String(history.amount), 115, headerHeight + 85);
    pdf.text(String(history.amount_type), 165, headerHeight + 85);

    pdf.line(10, headerHeight + 90, 200, headerHeight + 90);

    // Add staff details
    pdf.setFont("helvetica", "bold"); // Set text to bold
    pdf.text("Staff Name:", 10, headerHeight + 100);
    pdf.setFont("helvetica", "normal"); // Set text back to normal
    pdf.text(String(history.emp_id?.emp_name), 45, headerHeight + 100);

    // Add a horizontal line below the details
    pdf.line(10, headerHeight + 105, 200, headerHeight + 105);

    // Add a footer
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "bold"); // Make footer text bold
    const footerText = "Thank you for fueling up with us!";
    const footerTextWidth = pdf.getTextWidth(footerText);
    const footerX = (pdf.internal.pageSize.getWidth() - footerTextWidth) / 2;
    pdf.text(footerText, footerX, headerHeight + 120); // Adjust vertical position for one row down

    // Add "Powered by" text and logo at the bottom
    const poweredByLogoURL = "/Petro.png"; // Add your powered by logo URL here
    const poweredByLogoBase64 = await getBase64FromURL(poweredByLogoURL);
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal"); // Reset font type to normal
    const poweredByText = "Powered by";
    const poweredByTextWidth = pdf.getTextWidth(poweredByText);
    const logoWidthBottom = 30; // Width of the logo
    const spaceWidth = pdf.getTextWidth(" "); // Width of a single space
    const totalWidth = poweredByTextWidth + logoWidthBottom + spaceWidth;
    const startX = (pdf.internal.pageSize.getWidth() - totalWidth) / 2;

    pdf.text(poweredByText, startX, 290); // Adjust vertical position if needed
    pdf.addImage(
      poweredByLogoBase64,
      "JPEG",
      startX + poweredByTextWidth + spaceWidth,
      284,
      logoWidthBottom,
      10
    ); // Adjust vertical position if needed

    pdf.save("invoice.pdf");
  };

  // Function to convert image URL to base64
  const getBase64FromURL = (url) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        const reader = new FileReader();
        reader.onloadend = function () {
          resolve(reader.result);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.onerror = reject; // Add error handling
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.send();
    });
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
                      <Button
                        onClick={() => handleFullscreenDelete(history._id)}
                      >
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
          refresh={()=>refresh()} // You might want to adjust this based on your refresh logic
          data={data}
        />
      )}

      {editCreditHistory && (
        <CreditNew
          fullscreenclose={()=>handleClose()}
          close={handleEditCreditHistoryClose}
          refresh={()=>refresh()} // You might want to adjust this based on your refresh logic
          data={creditData}
          currentAmount={data?.credit_amount}
        />
      )}
    </>
  );
};

export default MediumDialog;
