// components/credits/MediumDialog.js
import React, { useEffect } from "react";
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
  Divider,
  IconButton,
} from "@mui/material";
import { Delete, PictureAsPdf, TableBar } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
require("dotenv").config();

const MediumDialog = ({ open, handleClose, data }) => {
  const [creditHistory, setCreditHistory] = React.useState([]);

  useEffect(() => {
    if (data._id) {
      let idQuery = data._id.replace(/['"]/g, "");
      console.log(idQuery);
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/creditHistory/GETAllCreditHistory?id=${idQuery}`
        )
        .then((responce) =>
          setCreditHistory(responce.data.message.CreditHistorys)
        )
        .catch(() => alert(`Something Went Wrong at individual`));
    }
    console.log(creditHistory);
  }, [data._id, creditHistory]);

  const exportPDF = () => {
    const actionElements = document.getElementsByClassName("action-buttons");
    for (let element of actionElements) {
      element.style.display = "none";
    }
    const input = document.getElementById("pdfContent");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save("creditHistory.pdf");
      for (let element of actionElements) {
        element.style.display = "block";
      }
    });
  };
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold" }}>Credit Details</DialogTitle>
      <DialogContent id="pdfContent">
        {/* Add your content here */}
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
                <TableCell align="center">{data.cc_address} </TableCell>
                <TableCell align="center" className="action-buttons">
                  <Button>
                    <EditIcon sx={{ color: "#0d47a1" }} />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* <Divider sx={{ margin: "10px 0" }} /> */}
        <Typography
          sx={{ fontWeight: "bold", marginTop: "20px", marginBottom: "10px" }}
        >
          Credit Information
        </Typography>

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
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{history.date}</TableCell>
                  <TableCell align="center">{history.cc_id.cc_name}</TableCell>
                  <TableCell align="center">{history.vehicle_no}</TableCell>
                  <TableCell align="center">
                    {history.fuel_type.fuel_name}
                  </TableCell>
                  <TableCell align="center">{history.fuel_quantity}</TableCell>
                  <TableCell align="center">{history.amount}</TableCell>
                  <TableCell align="center">{history.amount_type}</TableCell>
                  <TableCell align="center">
                    {history.emp_id.emp_name}
                  </TableCell>

                  <TableCell align="center" className="action-buttons">
                    <Button>
                      <EditIcon sx={{ color: "#0d47a1" }} />
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
        <IconButton onClick={exportPDF} color="primary">
          <PictureAsPdf />
        </IconButton>
        <Button onClick={() => handleClose()} color="error">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MediumDialog;
