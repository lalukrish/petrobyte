import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";

export default function EditProductAccount({
  open,
  onClose,
  productAccount,
  refresh,
}) {
  console.log("productAccount", productAccount);

  const [formData, setFormData] = useState({
    id: productAccount?._id || "",
    product_id: productAccount?._id || "",
    product_name: productAccount?.product_name || "",
    product_price: productAccount?.product_price || 0,
    quantity: productAccount?.quantity || 0,
    total_amount: productAccount?.total_amount || 0,
  });

  useEffect(() => {
    setFormData({
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

  console.log("formData", formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    // Recalculate the total amount if quantity changes
    if (name === "quantity") {
      updatedFormData.total_amount = parseInt(value) * formData.product_price;
    }

    setFormData(updatedFormData);
  };

  const handleSubmit = async () => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/productAccounts/PUTProductAccount`,
        formData
      );
      refresh();
      onClose();
    } catch (error) {
      console.error("Error updating product account:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Product Account</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Product Name"
          name="product_name"
          value={formData.product_name}
          onChange={handleChange}
          fullWidth
          // disabled
        />
        <TextField
          margin="dense"
          label="Product Price"
          name="product_price"
          value={formData.product_price}
          onChange={handleChange}
          fullWidth
          disabled
        />
        <TextField
          margin="dense"
          label="Quantity"
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Total Amount"
          name="total_amount"
          value={formData.total_amount}
          onChange={handleChange}
          fullWidth
          disabled
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
