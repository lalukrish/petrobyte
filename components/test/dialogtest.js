import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";

export default function TestNew({ close }) {
  const [dispencer, setDispencer] = React.useState("");
  const [fuel, setFuel] = React.useState("");
  const [qty, setQty] = React.useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleDispencerChange = (event) => {
    setDispencer(event.target.value);
  };

  const handleFuelChange = (event) => {
    setFuel(event.target.value);
  };

  const handleQtyChange = (event) => {
    setQty(event.target.value);
  };

  const handleSave = () => {
    const newTest = {
      dispencer,
      fuel,
      qty,
    };

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/test/POSTTest`, newTest)
      .then((response) => {
        console.log("Data saved successfully:", response.data);
        close();
      })
      .catch((error) => {
        console.error("There was an error saving the data!", error);
      });
  };

  const handleClose = () => {
    close();
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={true} // Make sure the dialog opens
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Test Details</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ width: "400px", padding: "5px" }}>
          <FormControl fullWidth>
            <InputLabel id="dispencer-label">Dispencer</InputLabel>
            <Select
              labelId="dispencer-label"
              id="dispencer-select"
              value={dispencer}
              onChange={handleDispencerChange}
              label="Dispencer"
            >
              <MenuItem value="D1">D1</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="fuel-label">Sub Name</InputLabel>
            <Select
              labelId="fuel-label"
              id="fuel-select"
              value={fuel}
              onChange={handleFuelChange}
              label="Fuel"
            >
              <MenuItem value="Petrol">Petrol</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="qty"
            label="Qty"
            variant="outlined"
            value={qty}
            onChange={handleQtyChange}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose}>
          Cancel
        </Button>
        <Button color="success" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
