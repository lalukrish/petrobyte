import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { PetrobyteContext } from "@/context/context";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
require("dotenv").config();

export default function StaffNew({ close }) {
  const { refreshEmployee, setRefreshEmployee } =
    React.useContext(PetrobyteContext);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    phone: Yup.string().required("Phone is required"),
    age: Yup.number()
      .required("Age is required")
      .positive("Age must be positive")
      .integer("Age must be an integer"),
    address: Yup.string().required("Address is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      age: "",
      address: "",
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let add = {
        emp_name: values.name,
        emp_email: values.email,
        emp_contact_no: values.phone,
        emp_address: values.address,
        emp_age: values.age,
      };
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/employee/POSTEmployee`, add)
        .then((response) => {
          alert(response.data.message);
        });
      close();
      setRefreshEmployee(!refreshEmployee);
    },
  });

  const handleClose = () => {
    close();
  };

  React.useEffect(() => {
    fetchAllEmployee();
  }, [refreshEmployee]);

  const fetchAllEmployee = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/employee/GETAllEmployee`)
      .then((response) => {
        console.log(response.data.message.employee);
      });
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={true}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Add New</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2} sx={{ width: "400px", padding: "5px" }}>
            <TextField
              autoFocus
              id="name"
              name="name"
              placeholder="Name"
              variant="outlined"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              id="phone"
              name="phone"
              placeholder="Phone"
              variant="outlined"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
            <TextField
              id="age"
              name="age"
              placeholder="Age"
              variant="outlined"
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.age && Boolean(formik.errors.age)}
              helperText={formik.touched.age && formik.errors.age}
            />
            <TextField
              id="address"
              name="address"
              placeholder="Address"
              variant="outlined"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
            <TextField
              id="email"
              name="email"
              placeholder="Email"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Stack>
          <DialogActions>
            <Button color="error" onClick={handleClose}>
              Cancel
            </Button>
            <Button color="success" type="submit">
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
