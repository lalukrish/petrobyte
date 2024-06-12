"use client";

import StaffNew from "@/components/employee/dialog";
import BasicTable from "@/components/employee/table";
import { PetrobyteContext } from "@/context/context";
import { Box, Button } from "@mui/material";
import axios from "axios";
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
      {/* <Button variant="outlined" 
        sx={{ border: 1,marginBottom:"20px",color: "#0d47a1", border: "1px solid #0d47a1" }}
        onClick={handleClickOpen}
      >
         New EMPLOYEE
      </Button>
      {open ? <StaffNew  close={handleClose} /> : null} */}

      <BasicTable />
    </Box>
  );
}
