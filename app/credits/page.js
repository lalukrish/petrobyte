"use client";

import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import CreditTable from "@/components/credits/table";
import CreditNew from "@/components/credits/dialogcredit";

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
      <Button variant="outlined" 
        sx={{ marginBottom:"20px",color: "#0d47a1", border: "1px solid #0d47a1" }}
        onClick={handleClickOpen}
      >
        New Credit
      </Button>
      {open ? <CreditNew  close={handleClose} /> : null}

      <CreditTable/>
    </Box>
  );
}
