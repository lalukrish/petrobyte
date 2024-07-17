import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";

const DashboardPriceModal = ({ open, onClose, currentRate }) => {
  console.log("c--rate", currentRate);
  const [fuelPrice, setFuelPrice] = useState(
    currentRate ? currentRate.fuel_price : ""
  );

  const handleUpdate = () => {
    axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/fuelPrice/PUTFuel`, {
        _id: currentRate._id,
        fuel_name: currentRate.fuel_name,
        fuelPrice: fuelPrice,
      })
      .then((responce) => {
        onClose();
        alert(responce.data.message);
      })
      .catch(() => alert("Something went wrong"));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Typography variant="h6" component="span">
            Update
          </Typography>
          <Typography
            variant="h6"
            component="span"
            sx={{ fontWeight: 600, fontSize: 20, ml: 1 }}
          >
            {currentRate?.fuel_name}
          </Typography>
          <Typography variant="h6" component="span" sx={{ ml: 1 }}>
            Price
          </Typography>
        </Box>
      </DialogTitle>
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
        <Button onClick={() => onClose()} color="primary">
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
