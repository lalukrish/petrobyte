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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios"; // Assuming you are using axios to send requests to the backend
import moment from "moment";

export default function ProductsNew({ close }) {
  const todayDate = moment().format("DD-MM-YYYY");

  // const [products,setProducts]=React.useState([])

  const handleClose2 = () => close();

  const products = [];
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/product/GETAllProduct`)
      .then((responce) => {
        responce.data.message.map((item) => {
          products.push(item.product_name);
        });
      });
  }, []);

  const [rows, setRows] = useState([
    {
      product_id: "",
      quantity: 1,
      total_amount: "",
    },
  ]);

  const handleAddClick = () => {
    setRows([
      ...rows,
      { date: todayDate, product_id: "", quantity: 1, total: "" },
    ]); //actual value needed for backend, change below fields acording to this, date is fixed
  };

  const handleRemoveClick = (index) => {
    if (rows.length === 1) return;
    setRows(rows.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleSave = () => {
    const validRows = rows.filter(
      (row) => row.products && row.price && row.quantity && row.total
    );
    if (validRows.length === 0) {
      alert("Please fill in at least one product completely.");
      return;
    }
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/productAccounts/POSTProductAccount`,
        validRows
      )
      .then((response) => {
        alert(response.data.message);
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
            <Autocomplete
              disablePortal
              id={`combo-box-demo-${index}`}
              options={products}
              sx={{ width: "100%" }}
              value={row.products}
              onChange={(event, value) =>
                handleChange(index, "products", value)
              }
              renderInput={(params) => (
                <TextField {...params} label="Products" fullWidth />
              )}
            />
            <TextField
              label="Price"
              variant="outlined"
              value={row.price}
              // onChange={(event) => handleChange(index, 'price', event.target.value)}
            />
            <TextField
              id={`outlined-number-${index}`}
              label="quantity"
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
              value={row.total}
              onChange={(event) =>
                handleChange(index, "total", event.target.value)
              }
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
