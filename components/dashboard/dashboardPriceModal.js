import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";

const DashboardPriceModal = ({ open, onClose, currentRate }) => {
  console.log("c--rate",currentRate);
  const [fuelPrice, setFuelPrice] = useState(currentRate?currentRate:"");

  const handleUpdate = () => {
    axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/fuelPrice/PUTFuel`, {
        _id: currentRate._id,
        fuel_name: currentRate.fuel_name,
        fuelPrice: fuelPrice,
      })
      .then((responce) => {
        onClose();
        alert(responce.data.message)
      })
      .catch(() => alert("Something went wrong"));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update {currentRate?.fuel_name} Price</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Fuel Price"
          type="number"
          fullWidth
          value={fuelPrice}
          onChange={(e) => setFuelPrice(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>onClose()} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdate} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DashboardPriceModal;
