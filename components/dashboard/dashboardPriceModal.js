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
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const DashboardPriceModal = ({ open, onClose, currentRate }) => {
  const validationSchema = Yup.object({
    fuel_price: Yup.number()
      .required("Fuel price is required")
      .min(0, "Fuel price must be greater than or equal to 0"),
  });

  const formik = useFormik({
    initialValues: {
      id: currentRate ? currentRate._id : "",
      fuel_price: currentRate ? currentRate.fuel_price : "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleUpdate(values);
    },
  });

  const handleUpdate = (values) => {
    axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/fuelPrice/PUTFuel`, {
        _id: values.id,
        // fuel_name: currentRate.fuel_name,
        fuel_price: values.fuel_price,
        fuel_previous_price: currentRate.fuel_price,
      })
      .then((response) => {
        onClose();
        alert(response.data.message);
      })
      .catch(() => alert("Something went wrong"));
  };

  useEffect(() => {
    if (currentRate) {
      formik.setValues({
        id: currentRate._id,
        fuel_price: currentRate.fuel_price,
      });
    }
  }, [currentRate]);

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
        <form onSubmit={formik.handleSubmit}>
          {/* <TextField
            margin="dense"
            label="ID"
            fullWidth
            value={formik.values.id}
            disabled
          /> */}
          <TextField
            margin="dense"
            label="Fuel Price"
            type="number"
            fullWidth
            value={formik.values.fuel_price}
            onChange={formik.handleChange}
            name="fuel_price"
            error={
              formik.touched.fuel_price && Boolean(formik.errors.fuel_price)
            }
            helperText={formik.touched.fuel_price && formik.errors.fuel_price}
          />
          {/* <TextField
            margin="dense"
            label="Previous Fuel Price"
            type="number"
            fullWidth
            value={currentRate ? currentRate.fuel_price : ""}
            disabled
          /> */}
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Update
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DashboardPriceModal;
