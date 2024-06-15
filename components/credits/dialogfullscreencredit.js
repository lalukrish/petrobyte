// components/credits/MediumDialog.js
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TableRow, TableContainer, Paper, Table, TableHead, TableCell, TableBody, Typography, Divider } from "@mui/material";
import { Delete, TableBar } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';

const MediumDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle sx={{fontWeight:"bold"}}>Credit Details</DialogTitle>
      <DialogContent>
        {/* Add your content here */}
        <Typography sx={{fontWeight:"bold",marginBottom:"10px"}}>Personal Information</Typography>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ background: "#b2dfdb" }}>
        <TableRow>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Contact</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Address </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Vehicle No. </TableCell>

              </TableRow>
              
        </TableHead>
        <TableBody>
        <TableRow>
                <TableCell align="center" >Aslam</TableCell>
                <TableCell align="center" >9048706798</TableCell>
                <TableCell align="center" >aslam@gmail.com</TableCell>
                <TableCell align="center" >Neriyamangalam </TableCell>
                <TableCell align="center" >KL44B5179  </TableCell>

              </TableRow>
        </TableBody>

        </Table>
        </TableContainer>

        {/* <Divider sx={{ margin: "10px 0" }} /> */}
        <Typography sx={{fontWeight:"bold",marginTop:"20px",marginBottom:"10px"}}>Credit Information</Typography>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ background: "#e3f2fd" }}>
            
              
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Date</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Credit </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Return</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Balance</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell align="center">13-06-2024</TableCell>
                <TableCell align="center">Aslam</TableCell>
                <TableCell align="center">45000</TableCell>
                <TableCell align="center">10000</TableCell>
                <TableCell align="center">35000</TableCell>

                

                <TableCell align="center">
                  <Button>
                    <EditIcon sx={{ color: "#0d47a1" }} />
                  </Button>
                  <Button>
                    <Delete sx={{ color: "#ef5350" }} />
                  </Button>
                </TableCell>
              </TableRow>
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
