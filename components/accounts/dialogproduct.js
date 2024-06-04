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
  Grid,
  Box,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

// import dayjs from "dayjs";

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
  const [rows, setRows] = useState([{ id: 1 }]);

  const handleAddClick = () => {
    setRows([...rows, { id: rows.length + 1 }]);
  };
  //   const dispencer = ["D1", "D2", "D3", "D4"];
  //   const fuel = ["Petrol", "Diesel"];
  //   const start = [];
  //   const end = [];

  // const todayStartOfTheDay = dayjs().startOf("day"); // Example date

  return (
    <Dialog
      sx={{}}
      maxWidth="md"
      fullWidth
      open={open}
      onClose={handleClose2}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Products Details</DialogTitle>
      <DialogContent sx={{ height: 600 }}>
        {rows.map((row, index) => (
          <Stack key={row.id} spacing={2} direction="row" sx={{ padding: "10px" }}>
            <Autocomplete
              disablePortal
              id={`combo-box-demo-${index}`}
              options={products}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label="Products" fullWidth />
              )}
            />
            <TextField label="Price" variant="outlined" />
            <TextField
              id={`outlined-number-${index}`}
              label="Qty"
              type="number"
              defaultValue={1}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: 1,
              }}
            />
            <TextField id={`total-${index}`} label="Total" fullWidth variant="outlined" />
          
        <Button onClick={handleAddClick}>
          <AddIcon color="success" variant="outlined" /> 
        </Button>
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
