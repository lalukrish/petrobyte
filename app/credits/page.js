"use client";

import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useState } from "react";
import CreditNew from "@/components/credits/dialogcredit";
import EditIcon from "@mui/icons-material/Edit";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import MediumDialog from "@/components/credits/dialogfullscreencredit";
import CreditorsDetailsNew from "@/components/credits/dialogcreditorsdetails";

export default function Page() {
  const [open, setOpen] = useState(false);
  const [opencreditors, setOpenCreditors] = useState(false);
  const [openMediumDialog, setOpenMediumDialog] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  };
  //creditor details dialog
  const handleClickOpenCreditors = () => {
    setOpenCreditors(true);
  };
  const handleCloseCreditors = () => {
    setOpenCreditors(false);
  };

  const handleOpenMediumDialog = () => {
    setOpenMediumDialog(true);
  };

  const handleCloseMediumDialog = () => {
    setOpenMediumDialog(false);
  };

  return (
    <Box>
      <Typography sx={{fontWeight:"bold"}}>Credits & Details</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <>

        {/* credit */}
        <Button
          variant="outlined"
          sx={{ color: "#0d47a1", border: "1px solid #0d47a1", marginRight: "10px" }}
          onClick={handleClickOpen}
        >
          Add Credit
        </Button>
        {open && <CreditNew close={handleClose} />}
        </>

        {/* creditors details */}
        <>
        <Button
          variant="outlined"
          sx={{ color: "#0d47a1", border: "1px solid #0d47a1", marginRight: "10px" }}
          onClick={handleClickOpenCreditors}
        >
          Add Creditor
        </Button>
        {opencreditors && <CreditorsDetailsNew close={handleCloseCreditors} />}
        </>


        </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ background: "#e3f2fd" }}>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Sl.No</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Contact</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Credit Amount</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell align="center">1</TableCell>
              <TableCell align="center">Aslam</TableCell>
              <TableCell align="center">7070707070</TableCell>
              <TableCell align="center">35000</TableCell>
              <TableCell align="center">
                <Button onClick={handleOpenMediumDialog}>
                  <OpenInFullIcon sx={{ color: "#0d47a1" }} />
                </Button>
                <Button>
                  <EditIcon sx={{ color: "#0d47a1" }} />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <MediumDialog open={openMediumDialog} handleClose={handleCloseMediumDialog} />
    </Box>
  );
}
