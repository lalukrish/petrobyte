"use client";
import React from "react";
import { Grid, Box, Divider } from "@mui/material";
import CreditNew from "@/components/credits/dialogcredit";
import FuelNewEmployeeClose from "@/components/accounts/dialogfuelemployeeclose";

function Page() {
  return (
    <Grid container spacing={1} sx={{ height: "100vh" }}>
      {/* Left Side */}
      <Grid item xs={6}>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          <FuelNewEmployeeClose />
        </Box>
      </Grid>

      {/* Vertical Divider */}
      <Divider orientation="vertical" flexItem />

      {/* Right Side */}
      <Grid item xs={5}>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 4,
          }}
        >
          {" "}
          <CreditNew />
        </Box>
      </Grid>
    </Grid>
  );
}

export default Page;
