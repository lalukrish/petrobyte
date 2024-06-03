"use client";

import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FuelNew from "@/components/accounts/dialogfuel.js";

export default function page() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
    };
  
  return (
    <>
      <Box sx={{ display: "flex", gap: 2, paddingBottom: "20px" }}>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Fuel Details
        </Button>
        {open ? <FuelNew close={handleClose} /> : null}
        <Button variant="outlined">Add Product</Button>
        <Button variant="outlined">Add Expense</Button>
        <Button variant="outlined">Add Test</Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>

              <TableCell align="center">Cash in hand</TableCell>
              <TableCell align="center">Bank</TableCell>
              <TableCell align="center">Hp Card</TableCell>
              <TableCell align="center">Credit</TableCell>
              <TableCell align="center">Net Amount</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {data.map((row) => ( */}
            <TableRow
              // key={row.emp_name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                18/07/2001
              </TableCell>
              <TableCell align="center">10001</TableCell>
              <TableCell align="center">1200</TableCell>
              <TableCell align="center">6000</TableCell>
              <TableCell align="center">5500</TableCell>
              <TableCell align="center">8000</TableCell>

              <TableCell align="center">
                <Button>
                  <EditIcon />
                </Button>
                <Button>
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
            {/* ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
