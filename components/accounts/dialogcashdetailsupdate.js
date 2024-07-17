import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
require("dotenv").config();

export default function CashDetailsUpdate({ open, onClose, data, onSave }) {
  const [formValues, setFormValues] = React.useState(data || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSave = () => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/cashManagement/PUTCashDetails`,
        formValues
      )
      .then((response) => {
        onSave(formValues);
        onClose();
      })
      .catch((error) => {
        console.error("Error updating cash details:", error);
      });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold", color: "#0d47a1" }}>
        Edit Cash Details
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="cash_inhand"
          label="Cash"
          fullWidth
          variant="outlined"
          value={formValues.cash_inhand}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="cash_bank"
          label="Bank"
          fullWidth
          variant="outlined"
          value={formValues.cash_bank}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="cash_other"
          label="HP Card"
          fullWidth
          variant="outlined"
          value={formValues.cash_other}
          onChange={handleChange}
        />
        {/* <TextField
          margin="dense"
          name="total_amount"
          label="Total Sale Amount"
          disabled
          fullWidth
          variant="outlined"
          value={formValues.total_amount}
          onChange={handleChange}
        /> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          Cancel
        </Button>
        <Button onClick={handleSave} color="success">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
