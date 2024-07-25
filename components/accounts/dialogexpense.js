import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import moment from "moment";

const expenseSchema = Yup.object().shape({
  expence_type: Yup.string().required("Expense Type is required"),
  expence_amount: Yup.number().required("Amount is required").positive(),
  expence_comment: Yup.string().required("Comments are required"),
});

export default function ExpenseNew({ close, refresh, edit }) {
  const [allEmployee, setAllEmployee] = useState([]);
  const datePart = moment().format("DD/MM/YYYY");

  const formik = useFormik({
    initialValues: {
      expence_type: edit ? edit.expence_type : "",
      emp_id: edit.emp_id ? edit.emp_id._id : "",
      expence_amount: edit ? edit.expence_amount : "",
      expence_comment: edit ? edit.expence_comment : "",
    },
    validationSchema: expenseSchema,
    onSubmit: async (values) => {
      const expenseData = {
        date: datePart,
        ...values,
      };

      try {
        if (edit._id) {
          await axios.put(
            `${process.env.NEXT_PUBLIC_API_URL}/expenceaccount/PUTExpenceAccount`,
            { _id: edit?._id, ...expenseData }
          );
        } else {
          await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/expenceaccount/POSTExpenceAccount`,
            expenseData
          );
        }
        refresh();
        close();
      } catch (error) {
        console.error("Error saving expense:", error);
      }
    },
  });

  const fetchEmployee = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/employee/GETAllEmployee`)
      .then((response) => setAllEmployee(response.data.message.employees));
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={true}
      onClose={close}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Expense Details</DialogTitle>
      <DialogContent sx={{ padding: "5px", margin: "5px", gap: "2" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <form onSubmit={formik.handleSubmit}>
            <FormControl fullWidth>
              <InputLabel id="expense-type-label">Expense Type</InputLabel>
              <Select
                labelId="expense-type-label"
                id="expense-type-select"
                name="expence_type"
                value={formik.values.expence_type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Expense Type"
                error={
                  formik.touched.expence_type &&
                  Boolean(formik.errors.expence_type)
                }
              >
                {["Salary", "Maintainence", "Bills", "Others"].map(
                  (option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  )
                )}
              </Select>
              {formik.touched.expence_type && formik.errors.expence_type && (
                <div style={{ color: "red", marginTop: "5px" }}>
                  {formik.errors.expence_type}
                </div>
              )}
            </FormControl>
            {formik.values.expence_type === "Salary" && (
              <FormControl fullWidth>
                <InputLabel id="employee-label">Employee</InputLabel>
                <Select
                  labelId="employee-label"
                  id="employee-select"
                  name="emp_id"
                  value={formik.values.emp_id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Employee"
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
              name="expence_amount"
              label="Amount"
              fullWidth
              variant="outlined"
              value={formik.values.expence_amount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.expence_amount &&
                Boolean(formik.errors.expence_amount)
              }
              helperText={
                formik.touched.expence_amount && formik.errors.expence_amount
              }
            />
            <TextField
              id="comment"
              name="expence_comment"
              label="Comments"
              fullWidth
              variant="outlined"
              value={formik.values.expence_comment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.expence_comment &&
                Boolean(formik.errors.expence_comment)
              }
              helperText={
                formik.touched.expence_comment && formik.errors.expence_comment
              }
            />
            <DialogActions>
              <Button color="error" onClick={close}>
                Cancel
              </Button>
              <Button color="success" type="submit">
                Save
              </Button>
            </DialogActions>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
