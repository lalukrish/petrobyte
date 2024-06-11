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
import DoneAllIcon from '@mui/icons-material/DoneAll';
import PrintIcon from '@mui/icons-material/Print';

export default function ProductsTable({}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ background:"#e3f2fd",fontStyle:"bold"}}>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Product</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Price(Rs)</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Qty(Grms,Lts)</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Action</TableCell>

            

          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              Grease
            </TableCell>
            <TableCell align="center">700</TableCell>
            <TableCell align="center">500</TableCell>
            

            <TableCell align="center">
              <Button>
                <EditIcon sx={{ color: "#0d47a1" }}/>
              </Button>
              <Button>
                <DeleteIcon sx={{ color: "#ef5350" }}/>
              </Button>
              
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
