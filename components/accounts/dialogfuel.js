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
import moment from "moment";
require('dotenv').config()


export default function FuelNew({ close }) {
  const handleClose = () => close();
  const date = moment().format("DD-MM-YYYY");
  const [fromtime, setfromtime] = React.useState("");
  const [totime, settotime] = React.useState("");
  const [dispencer, setdispencer] = React.useState("");
  const [fuelpetrol, setfuelpetrol] = React.useState("Petrol");
  const [startpetrol, setstartpetrol] = React.useState(""); 
  const [endpetrol, setendpetrol] = React.useState(""); 
  const [fuelqtypetrol, setfuelqtypetrol] = React.useState(""); 
  const [totalpetrol, settotalpetrol] = React.useState("");
  const [fueldiesel, setfueldiesel] = React.useState("Diesel");
  const [startdiesel, setstartdiesel] = React.useState(""); 
  const [enddiesel, setenddiesel] = React.useState(""); 
  const [fuelqtydiesel, setfuelqtydiesel] = React.useState(""); 
  const [totaldiesel, settotaldiesel] = React.useState(""); 


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
          "fuel_qty":fuelqtypetrol,
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
          "fuel_qty":fuelqtydiesel,
          "amount": totaldiesel
      }
  
    
    ]
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/fuelAccounts/POSTFuelAccount`,add).then((response)=>{alert(response.data.message)})
    // close()
    // setRefreshEmployee(!refreshEmployee)
  };
  

  const employees = ["John Doe", "Jane Smith", "Alice Johnson"];
  // const dispencer = ["D1", "D2", "D3", "D4"];
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
                  renderInput={(params) => <TextField onChange={(event)=>setfromtime(event.target.value)} {...params} fullWidth />}
                />
              </Grid>
              <Grid item xl={6}>
                <TimePicker
                  label="To"
                  defaultValue={todayStartOfTheDay}
                  renderInput={(params) => <TextField onChange={(event)=>settotime(event.target.value)} {...params} fullWidth />}
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
              <TextField {...params} onChange={(event)=>setdispencer(event.target.value)} label="Dispencer" fullWidth />
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
            <TextField onChange={(event)=>setstartpetrol(event.target.value)}
              id="start-metering"
              
              label="Start Metering"
              
              fullWidth
              variant="outlined"
            />
            <TextField onChange={(event)=>setendpetrol(event.target.value)}
              id="end-metering"
              
              label="End Metering"
              fullWidth
              variant="outlined"
              
            />
            <TextField 
              id=""
              disabled
              
              label="Sale Amount"
              fullWidth
              variant="outlined"
            />
          </Box>
          <Box sx={{ display: "flex",alignItems:"center", gap: 2 }}>
            <Typography>Diesel</Typography>
            <TextField onChange={(event)=>setstartdiesel(event.target.value)}
              id="start-metering"
              
              label="Start Metering"
              
              fullWidth
              variant="outlined"
            />
            <TextField onChange={(event)=>setenddiesel(event.target.value)}
              id="end-metering"
              
              label="End Metering"
              fullWidth
              variant="outlined"
              
            />
            <TextField 
              id=""
              disabled
              
              label="Sale Amount"
              fullWidth
              variant="outlined"
            />
          </Box>
          <TextField 
              id=""
              disabled
              
              label="Total Sale Amount"
              fullWidth
              variant="outlined"
            />
          
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose}>Cancel</Button>
        <Button color="success" onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
