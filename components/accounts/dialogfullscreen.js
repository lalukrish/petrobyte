// components/accounts/dialogfullscreen.js
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
require('dotenv').config()


export default function FullScreenDialog({ open, handleClose, content }) {
  const [fuel, setFuel] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [editdetails, setEditdetails] = React.useState(false);

  
  const [fuelAccounts, setfuelAccounts] = React.useState([]);
  useEffect(() => {
    // alert(content);
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/fuelAccounts/GETFUelAccountbydate?date=${content.date}&dispencer=${content.dispencer}`)
      .then((response) => setfuelAccounts(response.data.message));
  }, []);

  const handlefullClose = () => {
    handleClose();
  };

  const handledialogeditopen = (data) => {
    setEditdetails(data)
    setEdit(true);
  };
  const handledialogeditclose = () => {
    setEdit(false);
  };

console.log("content",content)
  return (

    <Dialog fullScreen open={open} onClose={handlefullClose}>
                    {edit ? <FuelUpdate clse={handledialogeditclose} data={editdetails} /> : null}

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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" >
            <TableHead sx={{ fontStyle: "normal", background: "#e3f2fd" }}>
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={5}
                  sx={{ fontWeight: "bold" }}
                >
                  Staff
                </TableCell>

                <TableCell
                  align="center"
                  colSpan={5}
                  sx={{ fontWeight: "bold" }}
                >
                  Fuel Details
                </TableCell>

                <TableCell
                  align="center"
                  colSpan={1}
                  sx={{ fontWeight: "bold" }}
                ></TableCell>
              </TableRow>

              <TableRow>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Date
                </TableCell>

                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Name
                </TableCell>

                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  From
                </TableCell>

                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  To
                </TableCell>

                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Dispencer
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
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fuelAccounts?.map((fuelAccount) => (
                

                  <TableRow>


                    <TableCell align="center">{fuelAccount?.date}</TableCell>

                    <TableCell component="th" scope="row">
                      {fuelAccount?.emp_id?.emp_name}
                    </TableCell>
                    <TableCell align="center">
                      {fuelAccount?.emp_from_time}
                    </TableCell>
                    <TableCell align="center">
                      {fuelAccount?.emp_to_time}
                    </TableCell>
                    <TableCell align="center">
                      {fuelAccount?.dispencer}
                    </TableCell>
                    <TableCell align="center">{fuelAccount?.fueltype}</TableCell>
                    <TableCell align="center">
                      {fuelAccount?.fuel_start_reading}
                    </TableCell>
                    <TableCell align="center">
                      {fuelAccount?.fuel_end_reading}
                    </TableCell>
                    <TableCell align="center">
                      {fuelAccount?.fuel_qty}
                    </TableCell>
                    <TableCell align="center">{fuelAccount?.amount}</TableCell>

                    <TableCell align="center">
                      <EditIcon
                        onClick={()=>handledialogeditopen(fuelAccount)}
                        sx={{
                          color: "#0d47a1",
                          "&:hover:not(.Mui-disabled)": {
                            cursor: "pointer",
                          },
                        }}
                      />
                    </TableCell>
                  </TableRow>
                
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={handleClose} color="primary">
          Close
        </Button> */}
      </DialogActions>
    </Dialog>
  );
}
