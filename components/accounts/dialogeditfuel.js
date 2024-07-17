import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import axios from "axios";
require("dotenv").config();

export default function FuelUpdate({ clse, data, onUpdate }) {
  const [endReading, setEndReading] = useState(data.fuel_end_reading);
  const [qty, setQty] = useState(
    parseFloat(data.fuel_end_reading) - parseFloat(data.fuel_start_reading)
  );
  const [amount, setAmount] = useState(data.amount);
  const fuelPrice = parseFloat(data.fuel_price_selected);

  useEffect(() => {
    const startReading = parseFloat(data.fuel_start_reading);
    const endReadingParsed = parseFloat(endReading);

    if (!isNaN(startReading) && !isNaN(endReadingParsed)) {
      const quantity = endReadingParsed - startReading;
      setQty(quantity);
      setAmount(quantity * fuelPrice);
    }
  }, [endReading, data.fuel_start_reading, fuelPrice]);

  const handleClose = () => clse();

  const handleUpdate = () => {
    let updatedData = {
      _id: data._id,
      date: data.date,
      dispencer_name: data.dispencer_name,
      sub_dispencer_id: data.sub_dispencer_id._id,
      fuel_start_reading: data.fuel_start_reading,
      fuel_end_reading: endReading,
      fuel_qty: qty,
      amount: amount,
    };

    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/fuelAccounts/PUTFuelAccount`,
        updatedData
      )
      .then((response) => {
        alert(response.data.message);
        onUpdate(updatedData);

        handleClose();
      })
      .catch((error) => {
        console.error("Error updating fuel account:", error);
      });
  };

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={true}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Edit Fuel Details</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ width: "100%", padding: "5px" }}>
          <TextField
            value={data.dispencer_name}
            id="disp"
            label="Dispenser"
            fullWidth
            variant="outlined"
            disabled
          />
          <TextField
            value={data.sub_dispencer_id.sub_dispencer}
            id="subdisp"
            label="Sub Dispenser"
            fullWidth
            variant="outlined"
            disabled
          />
          <TextField
            value={data.fuel_start_reading}
            id="start-metering"
            label="Start Metering"
            fullWidth
            variant="outlined"
            disabled
          />
          <TextField
            value={endReading}
            id="end-metering"
            label="End Metering"
            fullWidth
            variant="outlined"
            onChange={(e) => setEndReading(parseFloat(e.target.value) || 0)}
          />
          <TextField
            value={qty}
            id="qty"
            label="Quantity"
            fullWidth
            variant="outlined"
            disabled
          />
          <TextField
            value={amount}
            id="sale-amount"
            label="Sale Amount"
            fullWidth
            variant="outlined"
            disabled
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose}>
          Cancel
        </Button>
        <Button color="success" onClick={handleUpdate}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
