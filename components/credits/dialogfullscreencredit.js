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
} from "@mui/material";
import { Delete, TableBar } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
require("dotenv").config();

const MediumDialog = ({ open, handleClose, data }) => {
  const [creditHistory, setCreditHistory] = React.useState([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/creditHistory/GETAllCreditHistory?id=${data._id}`
      )
      .then((responce) =>
        setCreditHistory(responce.data.message.CreditHistorys)
      )
      .catch(() => alert(`Something Went Wrong`));
  }, []);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold" }}>Credit Details</DialogTitle>
      <DialogContent>
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
                  Address{" "}
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
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
                <TableCell align="center">
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
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {creditHistory.map((history)=>(

              
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{history.date}</TableCell>
                <TableCell align="center">{history.cc_id.cc_name}</TableCell>
                <TableCell align="center">{history.vehicle_no}</TableCell>
                <TableCell align="center">{history.fuel_type}</TableCell>
                <TableCell align="center">{history.fuel_quantity}</TableCell>
                <TableCell align="center">{history.amount}</TableCell>
                <TableCell align="center">{history.amount_type}</TableCell>

                <TableCell align="center">
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
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MediumDialog;
