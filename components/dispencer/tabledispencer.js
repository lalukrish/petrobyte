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

export default function DispencerTable({}) {

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
        Add Dispencer 
      </Button>
      {/* {open ? <TestNew  close={handleClose} /> : null} */}
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ background:"#e3f2fd"}}>
          <TableRow>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Dispencer</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Fuel</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Live Metering</TableCell>
            
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Action</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            
            <TableCell align="center">D1</TableCell>
            <TableCell align="center">Petrol</TableCell>
            <TableCell align="center">4000</TableCell>

            

            <TableCell align="center">
              <Button>
                <EditIcon sx={{ color: "#0d47a1" }} />
              </Button>
              
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}
