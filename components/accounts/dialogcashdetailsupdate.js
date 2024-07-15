import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

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
    onSave(formValues);
    onClose();
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
          name="cash"
          label="Cash"
          
          fullWidth
          variant="outlined"
          value={formValues.cash}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="bank"
          label="Bank"
          
          fullWidth
          variant="outlined"
          value={formValues.bank}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="hpCard"
          label="HP Card"
          
          fullWidth
          variant="outlined"
          value={formValues.hpCard}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="totalSaleAmount"
          label="Total Sale Amount"
          disabled
          fullWidth
          variant="outlined"
          value={formValues.totalSaleAmount}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          Cancel
        </Button>
        <Button onClick={handleSave} color="success">
          update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
