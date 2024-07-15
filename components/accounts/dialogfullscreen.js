import React, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FuelNew from "./dialogfuel";
import EditIcon from "@mui/icons-material/Edit";
import FuelUpdate from "./dialogeditfuel";
import CashDetailsUpdate from "./dialogcashdetailsupdate"; // Import the new component
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
require("dotenv").config();

export default function FullScreenDialog({ open, handleClose, content }) {
  const [fuel, setFuel] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [cashdetails, setCashDetails] = React.useState([]);
  const [editdetails, setEditdetails] = React.useState(false);
  const [fuelAccounts, setfuelAccounts] = React.useState([]);
  const [cashEdit, setCashEdit] = React.useState(false); // State to manage Cash Edit Dialog
  const [cashEditDetails, setCashEditDetails] = React.useState({}); // State to manage Cash Edit Details

  
  
  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/fuelAccounts/GETFUelAccountbydate?date=${content.date}&dispencer=${content.dispencer}`
      )
      .then((response) => {
        setfuelAccounts(response.data.message.fuelDetails);
      });
  }, [content.date, content.dispencer]);

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/cashManagement/GETCashDetails?date=${content.date}`
      )
      .then((response) => {
        setCashDetails(response.data.message);
      })
      .catch((response) => {
        console.log("error", response.data);
      });
  });

  const handlefullClose = () => {
    handleClose();
  };

  const handledialogeditopen = (data) => {
    setEditdetails(data);
    setEdit(true);
  };

  const handledialogeditclose = () => {
    setEdit(false);
  };

  const handleCashEditOpen = (data) => {
    setCashEditDetails(data);
    setCashEdit(true);
  };

  const handleCashEditClose = () => {
    setCashEdit(false);
  };

  const handleCashEditSave = (updatedData) => {
    console.log("Updated Cash Details:", updatedData);
    // Add logic to save updatedData
  };

  return (
    <Dialog open={open} onClose={handlefullClose} maxWidth="lg" fullWidth>
      {edit && <FuelUpdate clse={handledialogeditclose} data={editdetails} />}
      {cashEdit && (
        <CashDetailsUpdate
          open={cashEdit}
          onClose={handleCashEditClose}
          data={cashEditDetails}
          onSave={handleCashEditSave}
        />
      )}
      <DialogTitle sx={{ fontWeight: "bold", color: "#0d47a1" }}>
        Fuel Details
        <IconButton
          edge="end"
          color="inherit"
          onClick={handlefullClose}
          aria-label="close"
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ maxHeight: 400, overflow: "auto" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ fontStyle: "normal", background: "#e3f2fd" }}>
                <TableRow>
                  <TableCell
                    align="center"
                    colSpan={7} // Adjusted to match the number of Fuel Details columns
                    sx={{ fontWeight: "bold" }}
                  >
                    Fuel Details
                  </TableCell>
                  <TableCell
                    align="center"
                    colSpan={1}
                    sx={{ fontWeight: "bold" }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
                <TableRow sx={{ background: "#e3f2fd" }}>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Date
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Dispenser
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Sub
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    SM
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    EM
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Qty in Lts
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Sale Amount
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {fuelAccounts &&
                  fuelAccounts?.map((fuelAccount) => {
                    console.log("fuelAccount", fuelAccount);
                    return (
                      <TableRow key={fuelAccount._id}>
                        <TableCell align="center">{fuelAccount.date}</TableCell>
                        <TableCell align="center">
                          {fuelAccount.dispencer_name}
                        </TableCell>
                        <TableCell align="center">
                          {fuelAccount.sub_dispencer_id?.sub_dispencer}
                        </TableCell>
                        <TableCell align="center">
                          {fuelAccount.fuel_start_reading}
                        </TableCell>
                        <TableCell align="center">
                          {fuelAccount.fuel_end_reading}
                        </TableCell>
                        <TableCell align="center">
                          {fuelAccount.fuel_qty}
                        </TableCell>
                        <TableCell align="center">{fuelAccount.amount}</TableCell>
                        <TableCell align="center">
                          <EditIcon
                            onClick={() => handledialogeditopen(fuelAccount)}
                            sx={{
                              color: "#0d47a1",
                              "&:hover:not(.Mui-disabled)": {
                                cursor: "pointer",
                              },
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <br />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ background: "#b2dfdb" }}>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Date
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Cash
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Bank
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  HP Card
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Total Sale Amount
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
              {cashdetails?.map((item)=>(

              
              <TableRow>
                <TableCell align="center">{item?.date}</TableCell>
                <TableCell align="center">{item?.cash_inhand}</TableCell>
                <TableCell align="center">{item?.cash_bank}</TableCell>
                <TableCell align="center">{item?.cash_other}</TableCell>
                <TableCell align="center">{item?.total_amount}</TableCell>
                <TableCell align="center" className="action-buttons">
                  <Button onClick={() => handleCashEditOpen(item)}>
                    <EditIcon sx={{ color: "#0d47a1" }} />
                  </Button>
                </TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>{/* Optional footer actions */}</DialogActions>
    </Dialog>
  );
}
