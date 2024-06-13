"use client";

import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import TestTable from "@/components/test/table";

export default function page() {

  const [open, setOpen] = React.useState(false);
  
  



  
  
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
      <TestTable/>

      
    </Box>
  );
}
