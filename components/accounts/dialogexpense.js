import React, { useEffect, useState } from "react";
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
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import axios from "axios";
import moment from "moment";
require("dotenv").config();
// import dayjs from "dayjs";

export default function ExpenseNew({ close, refresh }) {
  const [expenseType, setExpenseType] = useState("");
  const [allEmployee, setAllEmployee] = useState([]);
  const [employee, setEmployee] = useState("");
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");
  const handleClose3 = () => close();
  const datePart = moment().format("DD-MM-YYYY");

  const type = ["Salary", "Maintainence", "Bills", "Others"];
  const empname = ["Aslam", "Lallu", "Adhi", "Abhi"];
  const handleExpenseTypeChange = (event, newValue) => {
    setExpenseType(event.target.value);
  };

  const fetchEmployee = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/employee/GETAllEmployee`)
      .then((responce) => setAllEmployee(responce.data.message.employees));
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  const handleSave = () => {
    let expenseData = {
      date: datePart,
      expence_type: expenseType,
      emp_id: employee?employee:null,
      expence_amount: amount,
      expence_comment: comment,
    };

    console.log(expenseData);

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/expenceaccount/POSTExpenceAccount`,
        expenseData
      )
      .then((responce) => {
        alert(responce.data.message);
        refresh();
        close();
      })
      .catch((err) => {
        alert("error");
        refresh();
        close();
      });
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
  `
  );

  return (
    <Dialog
      maxWidth="md"
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
              {type.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
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
                label="Employee"
                value={employee}
                onChange={(event) => setEmployee(event.target.value)}
              >
                {allEmployee.map((option, index) => (
                  <MenuItem key={index} value={option._id}>
                    {option.emp_name}
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
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
          <Textarea
            minRows={4}
            placeholder="Comments"
            fullWidth
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose3}>
          Cancel
        </Button>
        <Button color="success" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
