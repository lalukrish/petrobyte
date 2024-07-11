import React, { useEffect, useState } from "react";
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";
require('dotenv').config()

export default function FuelUpdate({ clse, data }) {
    useEffect(() => {
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
      sub_dispencer: subdispencer,
      fuel_start_reading: startpetrol,
      fuel_end_reading: endpetrol,
      qty: qty,
      amount: totalpetrol,
    };

    axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/fuelAccounts/PUTFuelAccount`, add)
      .then((response) => {
        alert(response.data.message);
      });
  };

 
  const dispencerOptions = ["D1", "D2", "D3", "D4"];
  const subdispencerOptions = ["SD1", "SD2", "SD3"];
  

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Add Fuel Details</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ width: "100%", padding: "5px" }}>
          <FormControl fullWidth>
            <InputLabel id="dispenser-label">Dispenser</InputLabel>
            <Select
              labelId="dispenser-label"
              id="dispenser-select"
              value={data.dispencer}
              label="Dispenser"
              onChange={(e) => setDispenser(e.target.value)}
            >
              {dispencerOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="sub-dispenser-label">Sub-Dispenser</InputLabel>
            <Select
              labelId="sub-dispenser-label"
              id="sub-dispenser-select"
              value={data.sub_dispencer}
              label="Sub-Dispenser"
              onChange={(e) => setSubDispenser(e.target.value)}
            >
              {subdispencerOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            value={data.fuel_start_reading}
            id="start-metering"
            label="Start Metering"
            fullWidth
            variant="outlined"
            onChange={(e) => setStartReading(e.target.value)}
          />
          <TextField
            value={data.fuel_end_reading}
            id="end-metering"
            label="End Metering"
            fullWidth
            variant="outlined"
            onChange={(e) => setEndReading(e.target.value)}
          />
          <TextField
            value={data.fuel_end_reading-data.fuel_start_reading}
            id="qty"
            label="Quantity"
            fullWidth
            variant="outlined"
            onChange={(e) => setQty(e.target.value)}
            disabled
          />
          <TextField
            value={data.amount}
            id="sale-amount"
            label="Sale Amount"
            fullWidth
            variant="outlined"
            onChange={(e) => setAmount(e.target.value)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose}>Cancel</Button>
        <Button color="success" onClick={handleUpdate}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}
