import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  Stack,
  InputLabel,
  FormControl,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";
import moment from "moment";

export default function ProductsNew({ close, refresh }) {
  const todayDate = moment().format("DD/MM/YYYY");

  const handleClose2 = () => close();

  const [products, setProducts] = useState([]);
  const [rows, setRows] = useState([
    {
      date: todayDate,
      product_name: "",
      product_price: "",
      quantity: "1",
      total_amount: "",
    },
  ]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/product/GETAllProduct`)
      .then((response) => {
        const productData = response.data.message.products.map((item) => ({
          product_id: item._id,
          product_name: item.product_name,
          price: item.product_price,
        }));
        setProducts(productData);
      });
  }, []);

  const handleAddClick = () => {
    setRows([
      ...rows,
      {
        date: todayDate,
        product_name: "",
        product_price: "",
        quantity: "1",
        total_amount: "",
      },
    ]);
  };

  const handleRemoveClick = (index) => {
    if (rows.length === 1) return;
    setRows(rows.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    console.log();
    const updatedRows = [...rows];
    if (field === "product_id") {
      const selectedProduct = products.find(
        (product) => product.product_id === value
      );
      console.log("selectedProduct", selectedProduct);
      updatedRows[index].product_name = selectedProduct.product_name;
      updatedRows[index].product_price = selectedProduct.price;
      updatedRows[index].total_amount =
        selectedProduct.price * updatedRows[index].quantity;
    } else {
      updatedRows[index][field] = value;
      if (field === "quantity") {
        updatedRows[index].total_amount =
          updatedRows[index].product_price * value;
      }
    }
    setRows(updatedRows);
  };

  const handleSave = () => {
    const validRows = rows.filter(
      (row) => row.product_name && row.quantity && row.total_amount
    );
    if (validRows.length === 0) {
      alert("Please fill in at least one product completely.");
      return;
    }
    console.log("validRows", validRows);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/productAccounts/POSTProductAccount`,
        validRows
      )
      .then((response) => {
        alert(response.data.message);
        setRows([
          {
            date: todayDate,
            product_name: "",
            quantity: "1",
            product_price: "",
            total_amount: "",
          },
        ]);
        refresh();
        close();
      })
      .catch((error) => {
        alert("There was an error saving the products.");
        console.error(error);
      });
  };

  return (
    <Dialog
      maxWidth="md"
      fullWidth
      open={true}
      onClose={handleClose2}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Products Details</DialogTitle>
      <DialogContent sx={{ height: 600 }}>
        {rows.map((row, index) => (
          <Stack
            key={index}
            spacing={2}
            direction="row"
            sx={{ padding: "10px" }}
          >
            <FormControl fullWidth>
              <InputLabel id={`select-label-${index}`}>Products</InputLabel>
              <Select
                labelId={`select-label-${index}`}
                id={`select-${index}`}
                value={row.product_id}
                label="Products"
                onChange={(event) =>
                  handleChange(index, "product_id", event.target.value)
                }
              >
                {products.map((product) => (
                  <MenuItem key={product.product_id} value={product.product_id}>
                    {product.product_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Price"
              variant="outlined"
              value={row.product_price}
              disabled
            />
            <TextField
              id={`outlined-number-${index}`}
              label="Qty"
              type="number"
              value={row.quantity}
              onChange={(event) =>
                handleChange(index, "quantity", event.target.value)
              }
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: 1,
              }}
            />
            <TextField
              id={`total-${index}`}
              label="Total"
              fullWidth
              variant="outlined"
              value={row.total_amount}
              disabled
            />

            {rows.length > 1 && (
              <Button onClick={() => handleRemoveClick(index)}>
                <RemoveIcon color="error" />
              </Button>
            )}
            {index === rows.length - 1 && (
              <Button onClick={handleAddClick}>
                <AddIcon color="success" />
              </Button>
            )}
          </Stack>
        ))}
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose2}>
          Cancel
        </Button>
        <Button color="success" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
