// components/credits/MediumDialog.js
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";

const MediumDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Credit History</DialogTitle>
      <DialogContent>
        {/* Add your content here */}
        Table here...!
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MediumDialog;
