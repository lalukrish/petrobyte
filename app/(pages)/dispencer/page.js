"use client";

import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import DispencerTable from "@/components/dispencer/tabledispencer";
export default function page() {
  return (
    <>
      <Typography sx={{ fontWeight: "bold" }}>Dispenser & Details</Typography>
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
        <DispencerTable />
      </Box>
    </>
  );
}
