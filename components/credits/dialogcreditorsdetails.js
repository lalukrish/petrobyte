import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Stack, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function CreditorsDetailsNew({ close, refresh, data }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const validationSchema = Yup.object({
    cc_name: Yup.string().required("Name is required"),
    cc_address: Yup.string().required("Address is required"),
    cc_contact_no: Yup.string()
      .required("Contact is required")
      .matches(/^[0-9]{10}$/, "Contact must be exactly 10 digits"),
    cc_email: Yup.string().email("Invalid email address"),
    // .required("Email is required"),
    // credit_amount: Yup.number()
    //   .required("Credit amount is required")
    //   .min(0, "Credit amount must be positive"),
  });

  const formik = useFormik({
    initialValues: {
      cc_name: data?.cc_name || "",
      cc_address: data?.cc_address || "",
      cc_contact_no: data?.cc_contact_no || "",
      cc_email: data?.cc_email || "",
      // credit_amount: data?.credit_amount || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const newCreditor = {
        ...values,
        cc_status: "",
      };

      const request = data?._id
        ? axios.put(`${process.env.NEXT_PUBLIC_API_URL}/creditcustomer/PUTCC`, {
            ...newCreditor,
            id: data?._id,
          })
        : axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/creditcustomer/POSTCC`,
            newCreditor
          );

      request
        .then((response) => {
          alert(response.data.message);
          refresh();
          close();
        })
        .catch(() => {
          alert(`Something went wrong`);
          close();
        });
    },
  });

  return (
    <Dialog
      fullScreen={fullScreen}
      open={true}
      onClose={formik.handleReset}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {data ? "Edit Creditor's Details" : "New Creditor's Details"}
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Stack spacing={2} sx={{ width: "400px", padding: "5px" }}>
            <TextField
              autoFocus
              id="cc_name"
              name="cc_name"
              label="Name"
              variant="outlined"
              value={formik.values.cc_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.cc_name && Boolean(formik.errors.cc_name)}
              helperText={formik.touched.cc_name && formik.errors.cc_name}
            />
            <TextField
              id="cc_address"
              name="cc_address"
              label="Address"
              variant="outlined"
              value={formik.values.cc_address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.cc_address && Boolean(formik.errors.cc_address)
              }
              helperText={formik.touched.cc_address && formik.errors.cc_address}
            />
            <TextField
              id="cc_contact_no"
              name="cc_contact_no"
              label="Contact"
              variant="outlined"
              value={formik.values.cc_contact_no}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.cc_contact_no &&
                Boolean(formik.errors.cc_contact_no)
              }
              helperText={
                formik.touched.cc_contact_no && formik.errors.cc_contact_no
              }
            />
            <TextField
              id="cc_email"
              name="cc_email"
              label="Email"
              variant="outlined"
              value={formik.values.cc_email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.cc_email && Boolean(formik.errors.cc_email)}
              helperText={formik.touched.cc_email && formik.errors.cc_email}
            />
            {/* <TextField
              id="credit_amount"
              name="credit_amount"
              label="Credit Amount"
              variant="outlined"
              value={formik.values.credit_amount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.credit_amount && Boolean(formik.errors.credit_amount)}
              helperText={formik.touched.credit_amount && formik.errors.credit_amount}
            /> */}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={(formik.handleReset, close)}>
            Cancel
          </Button>
          <Button type="submit" color="success">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
