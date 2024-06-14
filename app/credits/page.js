"use client";

import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Tab } from "@mui/material";
import React, { useState } from "react";
import CreditNew from "@/components/credits/dialogcredit";
import CreditorsDetailsNew from "@/components/credits/dialogcreditorsdetails";
import EditIcon from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import MediumDialog from "@/components/credits/dialogcredithistory";

export default function Page() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [openMediumDialog, setOpenMediumDialog] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenCreditors = () => {
    setOpen(true);
  };
  const handleCloseCreditors = () => {
    setOpen(false);
  };

  const handleOpenMediumDialog = () => {
    setOpenMediumDialog(true);
  };

  const handleCloseMediumDialog = () => {
    setOpenMediumDialog(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs value={value} onChange={handleChange} sx={{ marginBottom: "20px" }}>
        <Tab label="Creditor's List" />
        <Tab label="Credit History" />
      </Tabs>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        {value === 0 && (
          <>
            <Button
              variant="outlined"
              sx={{ color: "#0d47a1", border: "1px solid #0d47a1", marginRight: "10px" }}
              onClick={handleClickOpen}
            >
              Add Creditor
            </Button>
            {open && <CreditNew close={handleClose} />}
          </>
        )}

        {value === 1 && (
          <>
            <Button
              variant="outlined"
              sx={{ color: "#0d47a1", border: "1px solid #0d47a1", marginRight: "10px" }}
              onClick={handleClickOpenCreditors}
            >
              Add Credit
            </Button>
            {open && <CreditorsDetailsNew close={handleCloseCreditors} />}
          </>
        )}
      </Box>

      {value === 0 && (
        <>
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
                  <TableCell align="center">54000</TableCell>
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
        </>
      )}

      {value === 1 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ background: "#e3f2fd" }}>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Date</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Contact</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Vehicle No</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Fuel Type</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Fuel Quantity</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Credi Amount</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell align="center">13-06-2024</TableCell>
                <TableCell align="center">Aslam</TableCell>
                <TableCell align="center">7347247622</TableCell>
                <TableCell align="center">KL44B5179</TableCell>
                <TableCell align="center">Deisel</TableCell>
                <TableCell align="center">100</TableCell>
                <TableCell align="center">10000</TableCell>

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
      )}
    </Box>
  );
}
