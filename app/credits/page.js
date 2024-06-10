"use client";

import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import CreditTable from "@/components/credits/table";

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
        textAlign: "center",
        padding: "10px",
      }}
    >
      <Button variant="outlined" 
        sx={{ border: 1, display: "flex", justifyContent: "flex-end",marginBottom:"20px" }}
        onClick={handleClickOpen}
      >
        New Credit
      </Button>
      {open ? <StaffNew  close={handleClose} /> : null}

      <CreditTable/>
    </Box>
  );
}
