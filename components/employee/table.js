import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Pagination } from "@mui/material";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { useFormik } from "formik";
import * as Yup from "yup";
require("dotenv").config();

export default function DataTable() {
  const [employee, setEmployee] = React.useState([]);
  const [refreshEmployee, setRefreshEmployee] = React.useState(false);
  const isFirstRender = React.useRef(true); // Ref to track initial render

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = React.useState(false);
  const [editingEmployee, setEditingEmployee] = React.useState(null); // State for editing employee
  const [editOpen, setEditOpen] = React.useState(false); // State for edit dialog

  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [search, setSearch] = React.useState("");

  const validationSchema = Yup.object({
    emp_name: Yup.string()
      .required("Name is required")
      .test(
        "is-not-empty",
        "Name is required",
        (value) => value && value.trim() !== ""
      ),

    emp_email: Yup.string()
      .email("Invalid email format")
      .test(
        "is-not-empty",
        "Invalid email format",
        (value) => value && value.trim() !== ""
      ),

    emp_contact_no: Yup.string() // Validate as string first
      .required("Phone is required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .test("is-valid-number", "Invalid phone number", (value) => {
        if (!value) return true; // Allow empty if not required
        return !isNaN(parseFloat(value)) && isFinite(value); // Check if valid number
      }),

    emp_address: Yup.string()
      .required("Address is required")
      .test(
        "is-not-empty",
        "Address is required",
        (value) => value && value.trim() !== ""
      ),

    emp_age: Yup.string()
      .required("Age is required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .test("is-valid-number", "Invalid phone number", (value) => {
        if (!value) return true; // Allow empty if not required
        return !isNaN(parseFloat(value)) && isFinite(value); // Check if valid number
      }),
  });

  const formik = useFormik({
    initialValues: {
      emp_name: "",
      emp_email: "",
      emp_contact_no: "",
      emp_address: "",
      emp_age: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const add = {
        emp_name: values.emp_name,
        emp_email: values.emp_email,
        emp_contact_no: values.emp_contact_no,
        emp_address: values.emp_address,
        emp_age: values.emp_age,
      };

      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/employee/POSTEmployee`, add)
        .then((response) => {
          alert(response.data.message);
          setRefreshEmployee(!refreshEmployee);
        })
        .catch((error) => {
          console.error("Save request failed:", error);
        });

      handleClose();
    },
  });

  const handleEdit = (row) => {
    setEditingEmployee(row); // Set the row to be edited
    setEditOpen(true); // Open the edit dialog
  };

  const handleSaveEdit = () => {
    console.log("editingEmployee", editingEmployee.emp_name);
    if (editingEmployee) {
      const update = {
        id: editingEmployee._id, // Assuming emp_id is available
        emp_name: editingEmployee.emp_name,
        emp_email: editingEmployee.emp_email,
        emp_contact_no: editingEmployee.emp_contact_no,
        emp_address: editingEmployee.emp_address,
        emp_age: editingEmployee.emp_age,
      };

      axios
        .put(`${process.env.NEXT_PUBLIC_API_URL}/employee/PUTEmployee`, update)
        .then((response) => {
          alert(response.data.message);
          setRefreshEmployee(!refreshEmployee); // Refresh the employee list
          setEditOpen(false); // Close the edit dialog
          setEditingEmployee(null); // Reset the editing state
        })
        .catch((error) => {
          console.error("Update request failed:", error);
        });
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingEmployee(null);
  };

  const fetchAllEmployee = (page = 1, limit = 10) => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/employee/GETAllEmployee?page=${page}&limit=${limit}&name=${search}`
      )
      .then((response) => {
        setEmployee(response.data.message.employees);
        setTotalPages(Math.ceil(response.data.message.count / limit));
      })
      .catch((error) => {
        console.error("Fetch request failed:", error);
      });
  };

  const handleDelete = (row) => {
    axios
      .delete(
        `${process.env.NEXT_PUBLIC_API_URL}/employee/DELETEEmployee?id=${row._id}`
      )
      .then((response) => {
        alert(response.data.message);
        setRefreshEmployee(!refreshEmployee);
      })
      .catch((error) => {
        console.error("Delete request failed:", error);
      });
  };

  React.useEffect(() => {
    if (!isFirstRender.current) {
      fetchAllEmployee(currentPage); // Fetch data for the current page
    }
    isFirstRender.current = false;
  }, [currentPage, refreshEmployee, search]);

  const handleInputChange = (event, fieldName) => {
    // Assuming editingEmployee is part of your component's state
    setEditingEmployee((prevState) => ({
      ...prevState,
      [fieldName]: event.target.value,
    }));
  };

  const handleSearch = (value) => {
    // Handle the search functionality here
    console.log("Search clicked", value);
    setSearch(value);
  };

  return (
    <Box>
      <TextField
        variant="outlined"
        placeholder="Search..."
        sx={{
          "& .MuiOutlinedInput-root": {
            height: "36.5px",
            padding: 0,
            "& fieldset": {
              borderColor: "#0d47a1",
            },
            "&:hover fieldset": {
              borderColor: "#0d47a1",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#0d47a1",
            },
            "& input": {
              padding: "0 14px",
            },
            "& .MuiInputAdornment-root": {
              display: "flex",
              alignItems: "center",
              "& .MuiSvgIcon-root": {
                color: "#0d47a1",
              },
            },
          },
          marginBottom: "20px",
          marginLeft: "10px",
          width: "250px",
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <PersonSearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={(event) => {
          handleSearch(event.target.value);
        }}
      />
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          marginBottom: "20px",
          color: "#0d47a1",
          border: "1px solid #0d47a1",
          marginLeft: "10px",
          height: "36.5px",
          width: "160px",
        }}
      >
        Add Employee
      </Button>
      <Box sx={{ mt: 2 }}>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            Add New Employee
          </DialogTitle>
          <DialogContent>
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={2} sx={{ width: "400px", padding: "5px" }}>
                <TextField
                  autoFocus
                  placeholder="Name"
                  variant="outlined"
                  //label="Name"
                  name="emp_name"
                  value={formik.values.emp_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.emp_name && Boolean(formik.errors.emp_name)
                  }
                  helperText={formik.touched.emp_name && formik.errors.emp_name}
                />
                <TextField
                  placeholder="Phone"
                  variant="outlined"
                  //label="Phone"
                  name="emp_contact_no"
                  value={formik.values.emp_contact_no}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.emp_contact_no &&
                    Boolean(formik.errors.emp_contact_no)
                  }
                  helperText={
                    formik.touched.emp_contact_no &&
                    formik.errors.emp_contact_no
                  }
                />
                <TextField
                  placeholder="Age"
                  variant="outlined"
                  // label="Age"
                  name="emp_age"
                  value={formik.values.emp_age}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.emp_age && Boolean(formik.errors.emp_age)
                  }
                  helperText={formik.touched.emp_age && formik.errors.emp_age}
                />
                <TextField
                  placeholder="Address"
                  variant="outlined"
                  // label="Address"
                  name="emp_address"
                  value={formik.values.emp_address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.emp_address &&
                    Boolean(formik.errors.emp_address)
                  }
                  helperText={
                    formik.touched.emp_address && formik.errors.emp_address
                  }
                />
                <TextField
                  placeholder="Email"
                  variant="outlined"
                  //label="Email"
                  name="emp_email"
                  value={formik.values.emp_email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.emp_email && Boolean(formik.errors.emp_email)
                  }
                  helperText={
                    formik.touched.emp_email && formik.errors.emp_email
                  }
                />
              </Stack>
              <DialogActions>
                <Button onClick={handleClose} variant="outlined" color="error">
                  Cancel
                </Button>
                <Button type="submit" variant="outlined" color="success">
                  Save
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ background: "#e3f2fd" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Email
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Contact
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Address
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Age
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employee.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.emp_name}
                  </TableCell>
                  <TableCell align="center">{row.emp_email}</TableCell>
                  <TableCell align="center">+91{row.emp_contact_no}</TableCell>
                  <TableCell align="center">{row.emp_address}</TableCell>
                  <TableCell align="center">{row.emp_age}</TableCell>
                  <TableCell align="center">
                    <Button onClick={() => handleEdit(row)}>
                      <EditIcon sx={{ color: "#0d47a1" }} />
                    </Button>
                    <Button
                      onClick={() => handleDelete(row)}
                      sx={{ color: "#ef5350" }}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          sx={{ mt: 2, display: "flex", justifyContent: "center" }}
        />
        <Dialog
          fullScreen={fullScreen}
          open={editOpen}
          onClose={() => setEditOpen(false)}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">Edit Employee</DialogTitle>
          <DialogContent>
            <Stack
              spacing={2}
              sx={{ width: "400px", height: "350px", padding: "5px" }}
            >
              <TextField
                value={editingEmployee ? editingEmployee.emp_name : ""}
                variant="outlined"
                onChange={(e) => handleInputChange(e, "emp_name")}
              />
              <TextField
                value={editingEmployee ? editingEmployee.emp_email : ""}
                variant="outlined"
                onChange={(e) => handleInputChange(e, "emp_email")}
              />
              <TextField
                value={editingEmployee ? editingEmployee.emp_contact_no : ""}
                variant="outlined"
                onChange={(e) => handleInputChange(e, "emp_contact_no")}
              />
              <TextField
                value={editingEmployee ? editingEmployee.emp_address : ""}
                variant="outlined"
                onChange={(e) => handleInputChange(e, "emp_address")}
              />
              <TextField
                value={editingEmployee ? editingEmployee.emp_age : ""}
                variant="outlined"
                onChange={(e) => handleInputChange(e, "emp_age")}
              />
            </Stack>
          </DialogContent>
          <DialogActions
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 0,
              mb: 4,
            }}
          >
            <Button
              color="error"
              variant="outlined"
              onClick={() => setEditOpen(false)}
            >
              Cancel
            </Button>
            <Button color="success" variant="outlined" onClick={handleSaveEdit}>
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
