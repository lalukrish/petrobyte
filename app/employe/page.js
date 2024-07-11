"use client";

import StaffNew from "@/components/employee/dialog";
import BasicTable from "@/components/employee/table";
import { PetrobyteContext } from "@/context/context";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
require('dotenv').config()

import React, { useEffect } from "react";

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
    <Typography sx={{ fontWeight: "bold" }}>Staffs & Details</Typography>
    <Box
      sx={{
        height: "100vh",
        backgroundRepeat: "no-repeat",
        width: "100%",
        color: "white",
        textAlign: "right",
        padding: "10px",
      }}
    >
      

      <BasicTable />
    </Box>
    </>
  );
}
