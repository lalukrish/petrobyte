import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Autocomplete,
  Stack,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import axios from "axios";

export default function FuelUpdate({ clse,data }) {
    useEffect(() => {
      console.log(data)
    
      
    }, [])
    
  const handleClose = () => clse();

  const handleUpdate = () => {
    let add = {
      _id: "id123",
      date: date,
      emp_id: "66580f1603b55eb1929232ca",
      emp_from_time: fromtime,
      emp_to_time: totime,
      dispencer: dispencer,
      fueltype: fuelpetrol,
      fuel_start_reading: startpetrol,
      fuel_end_reading: endpetrol,
      amount: totalpetrol,
    };

    axios
      .put("https://petro.adaptable.app/fuelAccounts", add)
      .then((response) => {
        alert(response.data.message);
      });
    // close()
    // setRefreshEmployee(!refreshEmployee)
  };

  const employees = ["John Doe", "Jane Smith", "Alice Johnson"];
  const dispencer = ["D1", "D2", "D3", "D4"];
  const fuel = ["Petrol", "Diesel"];
  const start = [];
  const end = [];

  const todayStartOfTheDay = dayjs().startOf("day"); // Example date

  return (
    <Dialog
      //   sx={{ justifyContent: "center", alignItems: "center" }}
      maxWidth="md"
      fullWidth
      // fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Add Fuel Details</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ width: "100%", padding: "5px" }}>
          
          <Autocomplete
          value={data.emp_id.emp_name}
            disablePortal
            id="combo-box-demo"
            options={employees}
            sx={{ width: "100%" }}
            renderInput={(params) => (
              <TextField {...params} label="Name" fullWidth />
            )}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container spacing={2} sx={{ display: "flex" }}>
              <Grid item xl={6}>
                <TimePicker
                  label="From"
                  
                  renderInput={(params) => <TextField value={data.emp_from_time} {...params} fullWidth />}
                />
              </Grid>
              <Grid item xl={6}>
                <TimePicker
                  label="To"
                  
                  renderInput={(params) => <TextField value={data.emp_to_time} {...params} fullWidth />}
                />
              </Grid>
            </Grid>
          </LocalizationProvider>
          <Autocomplete
            disablePortal
            value={data.dispencer}
            id="combo-box-demo"
            options={dispencer}
            sx={{ width: "100%" }}
            renderInput={(params) => (
              <TextField {...params} label="Dispencer" fullWidth />
            )}
          />
          {/* <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={fuel}
            sx={{ width: "100%" }}
            renderInput={(params) => (
              <TextField {...params} label="Fuel" fullWidth />
            )}
          /> */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography>{data.fueltype}</Typography>
            <TextField
            value={data.fuel_start_reading}
              id="start-metering"
              label="Start Metering"
              fullWidth
              variant="outlined"
            />
            <TextField
            value={data.fuel_end_reading}
              id="end-metering"
              label="End Metering"
              fullWidth
              variant="outlined"
            />
            <TextField id="" label="Sale Amount" value={data.amount} fullWidth variant="outlined" />
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleUpdate}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}
