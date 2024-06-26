import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Grid,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';

export default function ExpenseNew({ close }) {
  const [expenseType, setExpenseType] = useState("");
  const [employee, setEmployee] = useState("");
  const handleClose3 = () => close();

  const types = ["Salary", "Maintenance", "Bills", "Others"];
  const employees = ["Aslam", "Lallu", "Adhi", "Abhi"];

  const handleExpenseTypeChange = (event) => {
    setExpenseType(event.target.value);
  };

  const handleEmployeeChange = (event) => {
    setEmployee(event.target.value);
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
      maxWidth="sm"
      fullWidth
      open={true}
      onClose={handleClose3}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Expense Details</DialogTitle>
      <DialogContent sx={{ padding: "5px", margin: "5px" }}>
        <Stack spacing={2} sx={{ width: "100%", padding: "5px" }}>
          <FormControl fullWidth>
            <InputLabel id="expense-type-label">Expense Type</InputLabel>
            <Select
              labelId="expense-type-label"
              id="expense-type-select"
              value={expenseType}
              onChange={handleExpenseTypeChange}
              label="Expense Type"
            >
              {types.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {expenseType === "Salary" && (
            <FormControl fullWidth>
              <InputLabel id="employee-label">Employee</InputLabel>
              <Select
                labelId="employee-label"
                id="employee-select"
                value={employee}
                onChange={handleEmployeeChange}
                label="Employee"
              >
                {employees.map((emp) => (
                  <MenuItem key={emp} value={emp}>
                    {emp}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <TextField
            id="amount"
            label="Amount"
            fullWidth
            variant="outlined"
          />
          <Textarea minRows={4} placeholder="Comments" fullWidth />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose3}>Cancel</Button>
        <Button color="success">Save</Button>
      </DialogActions>
    </Dialog>
  );
}
