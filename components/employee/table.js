import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Pagination } from '@mui/material';

export default function DataTable() {
  const [employee, setEmployee] = React.useState([]);
  const [refreshEmployee, setRefreshEmployee] = React.useState(false);
  const isFirstRender = React.useRef(true); // Ref to track initial render

  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [age, setAge] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [email, setEmail] = React.useState("");

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setOpen] = React.useState(false);
  const [editingEmployee, setEditingEmployee] = React.useState(null); // State for editing employee
  const [editOpen, setEditOpen] = React.useState(false); // State for edit dialog


  const handleEdit = (row) => {
    setEditingEmployee(row); // Set the row to be edited
    setEditOpen(true); // Open the edit dialog
  };
  const [currentPage, setCurrentPage] = React.useState(1);
const [totalPages, setTotalPages] = React.useState(1);


  const handleSaveEdit = () => {
    console.log("editingEmployee",editingEmployee.emp_name)
    if (editingEmployee) {
      const update = {
        id: editingEmployee._id, // Assuming emp_id is available
        emp_name: editingEmployee.emp_name,
        emp_email: editingEmployee.emp_email,
        emp_contact_no: editingEmployee.emp_contact_no,
        emp_address: editingEmployee.emp_address,
        emp_age: editingEmployee.emp_age,
      };

     
      axios.put(`https://petro.adaptable.app/employee`, update)
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
  };

  const handleSave = () => {
    const add = {
      emp_name: name,
      emp_email: email,
      emp_contact_no: phone,
      emp_address: address,
      emp_age: age,
    };

    axios.post("https://petro.adaptable.app/employee", add)
      .then((response) => {
        alert(response.data.message);
        setRefreshEmployee(!refreshEmployee);
      })
      .catch((error) => {
        console.error("Save request failed:", error);
      });

    handleClose();
  };

  const fetchAllEmployee = (page = 1, limit = 10) => {
    axios.get(`https://petro.adaptable.app/employee?page=${page}&limit=${limit}`)
      .then((response) => {
        setEmployee(response.data.message.employees);
        setTotalPages(Math.ceil(response.data.message.count / limit));

      })
      .catch((error) => {
        console.error("Fetch request failed:", error);
      });
  };

  const handleDelete = (row) => {
    axios.delete(`https://petro.adaptable.app/employee?id=${row._id}`)
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
  }, [currentPage, refreshEmployee]);
  

  const handleInputChange = (event, fieldName) => {
    // Assuming editingEmployee is part of your component's state
    setEditingEmployee(prevState => ({
     ...prevState,
      [fieldName]: event.target.value,
    }));
  };
  

  return (
    <Box>
      
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add New Employee
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
            <Stack spacing={2} sx={{ width: "400px", padding: "5px" }}>
              <TextField autoFocus placeholder="Name" variant="outlined" onChange={(event) => setName(event.target.value)} />
              <TextField placeholder="Phone" variant="outlined" onChange={(event) => setPhone(event.target.value)} />
              <TextField placeholder="Age" variant="outlined" onChange={(event) => setAge(event.target.value)} />
              <TextField placeholder="Address" variant="outlined" onChange={(event) => setAddress(event.target.value)} />
              <TextField placeholder="Email" variant="outlined" onChange={(event) => setEmail(event.target.value)} />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ background: "#e3f2fd" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Contact</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Address</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Age</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employee?.map((row) => (
                <TableRow key={row.emp_email} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">{row.emp_name}</TableCell>
                  <TableCell align="center">{row.emp_email}</TableCell>
                  <TableCell align="center">{row.emp_contact_no}</TableCell>
                  <TableCell align="center">{row.emp_address}</TableCell>
                  <TableCell align="center">{row.emp_age}</TableCell>
                  <TableCell align="center">
                  <Button onClick={() => handleEdit(row)}><EditIcon sx={{ color: "#0d47a1" }} /></Button>
                  <Button onClick={() => handleDelete(row)} sx={{ color: "#ef5350" }}><DeleteIcon /></Button>
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
      sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
    />
        <Dialog
    fullScreen={fullScreen}
    open={editOpen}
    onClose={() => setEditOpen(false)}
    aria-labelledby="responsive-dialog-title"
  >
    <DialogTitle id="responsive-dialog-title">Edit Employee</DialogTitle>
    <DialogContent>
      <Stack spacing={2} sx={{ width: "400px", padding: "5px" }}>
        {/* Pre-fill the fields with editingEmployee details */}
        <TextField 
  value={editingEmployee? editingEmployee.emp_name : ""} 
  variant="outlined"  
  onChange={(e) => handleInputChange(e, 'emp_name')} // Assuming you have a handler for input change
/>
<TextField 
  value={editingEmployee? editingEmployee.emp_email : ""} 
  variant="outlined"  
  onChange={(e) => handleInputChange(e, 'emp_email')} // Assuming you have a handler for input change
/>

<TextField 
  value={editingEmployee? editingEmployee.emp_contact_no : ""} 
  variant="outlined"  
  onChange={(e) => handleInputChange(e, 'emp_contact_no')} // Assuming you have a handler for input change
/>
<TextField 
  value={editingEmployee? editingEmployee.emp_address : ""} 
  variant="outlined"  
  onChange={(e) => handleInputChange(e, 'emp_address')} // Assuming you have a handler for input change
/>
<TextField 
  value={editingEmployee? editingEmployee.emp_age : ""} 
  variant="outlined"  
  onChange={(e) => handleInputChange(e, 'emp_age')} // Assuming you have a handler for input change
/>
        {/* Repeat for other fields */}
      </Stack>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setEditOpen(false)}>Cancel</Button>
      <Button onClick={handleSaveEdit}>Save Changes</Button>
    </DialogActions>
  </Dialog>
      </Box>
    </Box>
  );
}
