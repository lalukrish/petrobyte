import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

export default function CreditTable({}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "skyblue" }}>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Address</TableCell>
            <TableCell align="center">Contact</TableCell>
            <TableCell align="center">Credit</TableCell>
            <TableCell align="center">Return</TableCell>
            <TableCell align="center">Balance</TableCell>
            <TableCell align="center">Action</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              Rohit
            </TableCell>
            <TableCell align="center">Mvtpzha</TableCell>
            <TableCell align="center">8848388401</TableCell>
            <TableCell align="center">54000</TableCell>
            <TableCell align="center">12000</TableCell>
            <TableCell align="center">42000</TableCell>

            <TableCell align="center">
              <Button>
                <EditIcon />
              </Button>
              <Button>
                <DeleteIcon />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
