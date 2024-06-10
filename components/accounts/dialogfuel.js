import React, { useState } from "react";

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
import moment from "moment";

export default function FuelNew({ close }) {
  const handleClose = () => close();
  const date = moment().format("DD-MM-YYYY");

  const handleSave = () => {
    let add =  [
      {
          "date": date,
          "emp_id": "66580f1603b55eb1929232ca",
          "emp_from_time": fromtime,
          "emp_to_time": totime,
          "dispencer": dispencer,
          "fueltype": fuelpetrol,
          "fuel_start_reading": startpetrol,
          "fuel_end_reading": endpetrol,
          "amount": totalpetrol
      },
      {
          "date": date,
          "emp_id": "66580f1603b55eb1929232ca",
          "emp_from_time": fromtime,
          "emp_to_time": totime,
          "dispencer": dispencer,
          "fueltype": fueldiesel,
          "fuel_start_reading": startdiesel,
          "fuel_end_reading": enddiesel,
          "amount": totaldiesel
      }
  
    
    ]
    axios.post("https://petro.adaptable.app/fuelAccounts",add).then((response)=>{alert(response.data.message)})
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
      <DialogTitle id="responsive-dialog-title" >Add Fuel Details</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ width: "100%", padding: "5px" }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={employees}
            sx={{ width: "100%" }}
            renderInput={(params) => (
              <TextField {...params} label="Name" fullWidth />
            )}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container spacing={2} sx={{  display: "flex" }}>
              <Grid item xl={6}>
                <TimePicker
                  label="From"
                  defaultValue={todayStartOfTheDay}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
              <Grid item xl={6}>
                <TimePicker
                  label="To"
                  defaultValue={todayStartOfTheDay}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
            </Grid>
          </LocalizationProvider>
          <Autocomplete
            disablePortal
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
          <Box sx={{ display: "flex",alignItems:"center", gap: 2 }}>
            <Typography>Petrol</Typography>
            <TextField
              id="start-metering"
              
              label="Start Metering"
              
              fullWidth
              variant="outlined"
            />
            <TextField
              id="end-metering"
              
              label="End Metering"
              fullWidth
              variant="outlined"
              
            />
            <TextField 
              id=""
              
              label="Sale Amount"
              fullWidth
              variant="outlined"
            />
          </Box>
          <Box sx={{ display: "flex",alignItems:"center", gap: 2 }}>
            <Typography>Diesel</Typography>
            <TextField
              id="start-metering"
              
              label="Start Metering"
              
              fullWidth
              variant="outlined"
            />
            <TextField
              id="end-metering"
              
              label="End Metering"
              fullWidth
              variant="outlined"
              
            />
            <TextField 
              id=""
              
              label="Sale Amount"
              fullWidth
              variant="outlined"
            />
          </Box>
          <TextField 
              id=""
              
              label="Total Sale Amount"
              fullWidth
              variant="outlined"
            />
          
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
