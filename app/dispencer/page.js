"use client";

import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import DispencerTable from "@/components/dispencer/tabledispencer";
export default function page() {

  
  
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
      

      <DispencerTable/>
    </Box>
  );
}
