"use client";

import BasicCard from "@/components/dashboard/card";
import Liverate from "@/components/dashboard/liverate";
import SalesCharts from "@/components/dashboard/card";
import { Box, Typography, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [array, setArray] = useState([]);

  useEffect(() => {
    setArray([
      {
        name: "D1",
        fuel: "Petrol",
        Emp: "Staff1",
        EMtr: "00",
        LMtr: "00",
      },
      {
        name: "D2",
        fuel: "Petrol",
        Emp: "Staff2",
        EMtr: "00",
        LMtr: "00",
      },
      {
        name: "D3",
        fuel: "Diesel",
        Emp: "Staff3",
        EMtr: "00",
        LMtr: "00",
      },
      {
        name: "D4",
        fuel: "Diesel",
        Emp: "Staff4",
        EMtr: "00",
        LMtr: "00",
      },
    ]);
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "start" }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", fontSize: "30px" }}
          >
            Today Price
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Liverate />
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", fontSize: "30px", mb: 4 }}
        >
          {/* Sales Reports */}
        </Typography>
        <SalesCharts />
      </Box>

      {/* <Box>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", fontSize: "40px", mb: 4 }}
        >
          Dispensers
        </Typography>
        <Grid container spacing={6}></Grid>
      </Box> */}
    </Box>
  );
};

export default Page;
