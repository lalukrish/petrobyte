import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

// Validation schema
const validationSchema = Yup.object({
  product_name: Yup.string().required("Product name is required."),
  quantity: Yup.number()
    .required("Quantity is required.")
    .min(1, "Quantity must be at least 1"),
});

export default function EditProductAccount({
  open,
  onClose,
  productAccount,
  refresh,
}) {
  const formik = useFormik({
    initialValues: {
      id: productAccount?._id || "",
      product_id: productAccount?._id || "",
      product_name: productAccount?.product_name || "",
      product_price: productAccount?.product_price || 0,
      quantity: productAccount?.quantity || 0,
      total_amount:
        (parseInt(productAccount?.quantity) || 0) *
          (parseInt(productAccount?.product_price) || 0) || 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/productAccounts/PUTProductAccount`,
          values
        );
        refresh();
        onClose();
      } catch (error) {
        console.error("Error updating product account:", error);
      }
    },
  });

  useEffect(() => {
    formik.setValues({
      id: productAccount?._id || "",
      product_id: productAccount?._id || "",
      product_name: productAccount?.product_name || "",
      product_price: productAccount?.product_price || 0,
      quantity: productAccount?.quantity || 0,
      total_amount:
        (parseInt(productAccount?.quantity) || 0) *
          (parseInt(productAccount?.product_price) || 0) || 0,
    });
  }, [productAccount]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Product Account</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            margin="dense"
            label="Product Name"
            name="product_name"
            value={formik.values.product_name}
            onChange={formik.handleChange}
            fullWidth
            error={
              formik.touched.product_name && Boolean(formik.errors.product_name)
            }
            helperText={
              formik.touched.product_name && formik.errors.product_name
            }
          />
          <TextField
            margin="dense"
            label="Product Price"
            name="product_price"
            value={formik.values.product_price}
            onChange={formik.handleChange}
            fullWidth
            disabled
          />
          <TextField
            margin="dense"
            label="Quantity"
            name="quantity"
            type="number"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            fullWidth
            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
            helperText={formik.touched.quantity && formik.errors.quantity}
            inputProps={{ min: 1 }}
          />
          <TextField
            margin="dense"
            label="Total Amount"
            name="total_amount"
            value={formik.values.total_amount}
            onChange={formik.handleChange}
            fullWidth
            disabled
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
