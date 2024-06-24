import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Grid,
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Autocomplete
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
  const [fromtime, setfromtime] = useState("");
  const [totime, settotime] = useState("");
  const [dispencer, setdispencer] = useState("");
  const [fueltype, setfueltype] = useState("");
  const [fuelpetrol, setfuelpetrol] = useState("Petrol");
  const [startpetrol, setstartpetrol] = useState(""); 
  const [endpetrol, setendpetrol] = useState(""); 
  const [fuelqtypetrol, setfuelqtypetrol] = useState(""); 
  const [totalpetrol, settotalpetrol] = useState("");
  const [fueldiesel, setfueldiesel] = useState("Diesel");
  const [startdiesel, setstartdiesel] = useState(""); 
  const [enddiesel, setenddiesel] = useState(""); 
  const [fuelqtydiesel, setfuelqtydiesel] = useState(""); 
  const [totaldiesel, settotaldiesel] = useState(""); 

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
          "fuel_qty": fuelqtypetrol,
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
          "fuel_qty": fuelqtydiesel,
          "amount": totaldiesel
      }
    ]
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/fuelAccounts/POSTFuelAccount`, add).then((response) => {
      alert(response.data.message)
    });
  };

  const employees = ["John Doe", "Jane Smith", "Alice Johnson"];
  const dispencers = ["A", "B", "C","D"];
  const fuelTypes = ["P1", "P2","D1","D2"];
  const todayStartOfTheDay = dayjs().startOf("day"); 

  return (
    <Dialog
      maxWidth="md"
      fullWidth
      open={true}
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
            <Grid container spacing={2} sx={{ display: "flex" }}>
              <Grid item xs={6}>
                <TimePicker
                  label="From"
                  defaultValue={todayStartOfTheDay}
                  renderInput={(params) => (
                    <TextField {...params} onChange={(event) => setfromtime(event.target.value)} fullWidth />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <TimePicker
                  label="To"
                  defaultValue={todayStartOfTheDay}
                  renderInput={(params) => (
                    <TextField {...params} onChange={(event) => settotime(event.target.value)} fullWidth />
                  )}
                />
              </Grid>
            </Grid>
          </LocalizationProvider>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="dispencer-label">Dispencer</InputLabel>
                  <Select
                    labelId="dispencer-label"
                    id="dispencer-select"
                    value={dispencer}
                    label="Dispencer"
                    onChange={(event) => setdispencer(event.target.value)}
                  >
                    {dispencers.map((disp) => (
                      <MenuItem key={disp} value={disp}>{disp}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="fuel-type-label">Sub Name</InputLabel>
                  <Select
                    labelId="fuel-type-label"
                    id="fuel-type-select"
                    value={fueltype}
                    label="Sub Name"
                    onChange={(event) => setfueltype(event.target.value)}
                  >
                    {fuelTypes.map((type) => (
                      <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography>{fueltype}</Typography>
            <TextField
              onChange={(event) => setstartpetrol(event.target.value)}
              id="start-metering"
              label="Start Metering"
              fullWidth
              variant="outlined"
            />
            <TextField
              onChange={(event) => setendpetrol(event.target.value)}
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
