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
  Typography,
} from "@mui/material";
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
// import dayjs from "dayjs";

export default function TestNew({ close }) {
  const handleClose4 = () => close();

  return (
    <Dialog
      sx={{}}
      maxWidth="sm"
      fullWidth
      open={open}
      onClose={handleClose4}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Test Details</DialogTitle>
      <DialogContent >
      <Stack spacing={2} sx={{ width: "100%", padding: "5px" }}>
      <TextField 
              id=""
              
              label="Dispencer Name "
              fullWidth
              variant="outlined"
            />
            <TextField 
              id=""
              
              label="Fuel 1"
              fullWidth
              variant="outlined"
            />
            <TextField 
              id=""
              
              label="Test value"
              fullWidth
              variant="outlined"
            />
            <TextField 
              id=""
              
              label="Fuel 2 "
              fullWidth
              variant="outlined"
            />
            <TextField 
              id=""
              
              label="Test value"
              fullWidth
              variant="outlined"
            />
            </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose4}>Cancel</Button>
        <Button>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
