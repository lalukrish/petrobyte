"use client";

import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CreditNew from "@/components/credits/dialogcredit";
import EditIcon from "@mui/icons-material/Edit";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import MediumDialog from "@/components/credits/dialogfullscreencredit";
import CreditorsDetailsNew from "@/components/credits/dialogcreditorsdetails";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

import axios from "axios";
require("dotenv").config();

export default function Page() {
  const [open, setOpen] = useState(false);
  const [opencreditors, setOpenCreditors] = useState(false);
  const [openMediumDialog, setOpenMediumDialog] = useState(false);
  const [creditUsers, setCreditUsers] = useState([]);
  const [creditUserData, setCreditUsersData] = useState({});
  const [refreshCreditors, setRefreshCreditors] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/creditcustomer/GETAllCC`)

      .then((responce) => setCreditUsers(responce.data.message.CCs))
      .catch(() => alert(`Something went wrong, please try after some time`));
  }, [refreshCreditors]);

  const handelRefresh = () => {
    setRefreshCreditors(!refreshCreditors);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
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

  const handleOpenMediumDialog = (creditUser) => {
    setCreditUsersData(creditUser);
    setOpenMediumDialog(true);
  };

  const handleCloseMediumDialog = () => {
    setOpenMediumDialog(false);
  };

  return (
    <Box>
      <Typography sx={{ fontWeight: "bold" }}>Credits & Details</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <>
          <TextField
            variant="outlined"
            placeholder="Search..."
            sx={{
              "& .MuiOutlinedInput-root": {
                height: "36.5px",
                padding: 0,
                "& fieldset": {
                  borderColor: "#0d47a1",
                },
                "&:hover fieldset": {
                  borderColor: "#0d47a1",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#0d47a1",
                },
                "& input": {
                  padding: "0 14px",
                },
                "& .MuiInputAdornment-root": {
                  display: "flex",
                  alignItems: "center",
                  "& .MuiSvgIcon-root": {
                    color: "#0d47a1",
                  },
                },
              },
              marginBottom: "20px",
              marginLeft: "10px",
              marginRight: "10px",
              width: "250px", // Increase the width of the search field
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <PersonSearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={() => {
              handleSearch(event.target.value);
            }}
          />
        </>
        <>
          {/* credit */}
          <Button
            variant="outlined"
            sx={{
              color: "#0d47a1",
              border: "1px solid #0d47a1",
              marginRight: "10px",
              height: "36.5px",
            }}
            onClick={handleClickOpen}
          >
            Credit / Debit
          </Button>
          {open && <CreditNew close={handleClose} refresh={handelRefresh} />}
        </>

        {/* creditors details */}
        <>
          <Button
            variant="outlined"
            sx={{
              color: "#0d47a1",
              border: "1px solid #0d47a1",
              marginRight: "10px",
              height: "36.5px",
            }}
            onClick={handleClickOpenCreditors}
          >
            Add Creditor
          </Button>
          {opencreditors && (
            <CreditorsDetailsNew
              close={handleCloseCreditors}
              refresh={handelRefresh}
            />
          )}
        </>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ background: "#e3f2fd" }}>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Sl.No
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Contact
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Credit Amount
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {creditUsers.map((creditUser, index) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{creditUser.cc_name}</TableCell>
                <TableCell align="center">{creditUser.cc_contact_no}</TableCell>
                <TableCell align="center">{creditUser.credit_amount}</TableCell>
                <TableCell align="center">
                  <Button onClick={() => handleOpenMediumDialog(creditUser)}>
                    <OpenInFullIcon sx={{ color: "#0d47a1" }} />
                  </Button>
                  {/* <Button>
                  <EditIcon sx={{ color: "#0d47a1" }} />
                </Button> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {openMediumDialog && (
        <MediumDialog
          open={openMediumDialog}
          handleClose={handleCloseMediumDialog}
          data={creditUserData}
          refresh={handelRefresh}
        />
      )}
    </Box>
  );
}
