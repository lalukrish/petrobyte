import * as React from "react";
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
import axios from "axios";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import PrintIcon from '@mui/icons-material/Print';
import CreditNew from "./dialogcredit";

export default function CreditTable({}) {

  const [open, setOpen] = React.useState(false);
  
  



  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
    <Button variant="outlined" 
        sx={{ marginBottom:"20px",color: "#0d47a1", border: "1px solid #0d47a1" }}
        onClick={handleClickOpen}
      >
        New Credit
      </Button>
      {open ? <CreditNew  close={handleClose} /> : null}
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ background:"#e3f2fd"}}>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Address</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Contact</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Credit</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Return</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Balance</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Action</TableCell>

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
                <EditIcon sx={{ color: "#0d47a1" }} />
              </Button>
              <Button>
                <DoneAllIcon sx={{ color: "#0d47a1" }}/>
              </Button>
              <Button>
                <PrintIcon sx={{ color: "#0d47a1" }}/>
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}
