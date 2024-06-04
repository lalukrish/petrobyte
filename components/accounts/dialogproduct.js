import React, { useState } from "react";
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
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function ProductsNew({ close }) {
  const handleClose2 = () => close();

  const products = [
    "Grease",
    "Battery Water 15",
    "Battery Water 16",
    "Battery Water 20",
    "Racer2",
    "Racer4 900 ",
    "Racer4 1Ltr ",
    "Lalghoda",
    "Cruise",
    "Milcy",
    "DEF",
    "Koolgard",
    "Adblue",
    "Generator",
  ];
  
  const [firstRow, setFirstRow] = useState({
    products: '',
    price: '',
    qty: 1,
    total: ''
  });
  const [rows, setRows] = useState([firstRow]);

  const handleAddClick = () => {
    setRows([...rows, { ...firstRow }]);
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
          <Stack key={index} spacing={2} direction="row" sx={{ padding: "10px" }}>
            <Autocomplete
              disablePortal
              id={`combo-box-demo-${index}`}
              options={products}
              sx={{ width: "100%" }}
              value={row.products}
              onChange={(event, value) => handleChange(index, 'products', value)}
              renderInput={(params) => (
                <TextField {...params} label="Products" fullWidth />
              )}
            />
            <TextField 
              label="Price" 
              variant="outlined" 
              value={row.price}
              onChange={(event) => handleChange(index, 'price', event.target.value)}
            />
            <TextField
              id={`outlined-number-${index}`}
              label="Qty"
              type="number"
              value={row.qty}
              onChange={(event) => handleChange(index, 'qty', event.target.value)}
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
              onChange={(event) => handleChange(index, 'total', event.target.value)}
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
        <Button onClick={handleClose2}>Cancel</Button>
        <Button>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
