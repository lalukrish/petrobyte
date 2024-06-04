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

export default function FuelNew({ close }) {
  const handleClose = () => close();

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
        <Button>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
