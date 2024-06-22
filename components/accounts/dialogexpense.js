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

export default function ExpenseNew({ close }) {
  const [expenseType, setExpenseType] = useState("");
  const handleClose3 = () => close();

  const type=["Salary","Maintainence","Bills","Others"]
  const empname=["Aslam","Lallu","Adhi","Abhi"]
  const handleExpenseTypeChange = (event, newValue) => {
    setExpenseType(newValue);
  };


  

  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    width: fullwidth;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    font-color:black;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color:black;

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  );

 

  return (
    <Dialog
      
      maxWidth="md"
      fullWidth
      open={open}
      onClose={handleClose3}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Expense Details</DialogTitle>
      <DialogContent sx={{padding:"5px",margin:"5px"}}>
      <Stack spacing={2} sx={{ width: "100%", padding: "5px" }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={type}
            sx={{ width: "100%" }}
            renderInput={(params) => (
              <TextField {...params} label="Expense Type" fullWidth />
            )}
            onChange={handleExpenseTypeChange}
          />
          {expenseType === "Salary" && (
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={empname}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label="Employee" fullWidth />
              )}
            />
          )}
          <TextField 
              id=""
              
              label="Amount"
              fullWidth
              variant="outlined"
            />
            <Textarea  minRows={4} placeholder="Comments" fullWidth />
            
          
        </Stack>
        </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose3}>Cancel</Button>
        <Button color="success">Save</Button>
      </DialogActions>
    </Dialog>
  );
}
