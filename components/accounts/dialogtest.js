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
      maxWidth="md"
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
              
              label="Petrol taken in Lts for Test "
              fullWidth
              variant="outlined"
            />
            <TextField 
              id=""
              
              label="Diesel taken in Lts for Test "
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
