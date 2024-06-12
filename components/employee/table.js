import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { PetrobyteContext } from '@/context/context';




export default function DataTable() {
  const [employee, setEmployee] = React.useState([]);
  const [data, setData] = React.useState([])
  const { refreshEmployee, setRefreshEmployee } = React.useContext(PetrobyteContext);

  const fetchAllEmployee = () => {
    axios.get("https://petro.adaptable.app/employee").then((response) => {
      setEmployee(response.data.message.employee)
      console.log(employee)
      setData(response.data.message.employee)
    })
  }

 


  const handleDelete = (row) => {
    console.log("row--->", row.email)
  
    axios.delete(`https://petro.adaptable.app/employee?email=${row.emp_email}`).then((response) => {
      console.log("delete", response)
      alert(response.data.message)
      setRefreshEmployee(!refreshEmployee)
    }).catch(error => {
      console.error("Delete request failed:", error);
    
    })
  }
  
  React.useEffect(() => {
    fetchAllEmployee()
  }, [refreshEmployee])
  
  console.log("Refresh Employee state:", refreshEmployee); 
  

  return (
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
          {data?.map((row) => (
            <TableRow
              key={row.emp_name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.emp_name}
              </TableCell>
              <TableCell align="center">{row.emp_email}</TableCell>
              <TableCell align="center">{row.emp_contact_no}</TableCell>
              <TableCell align="center">{row.emp_address}</TableCell>
              <TableCell align="center">{row.emp_age}</TableCell>
              <TableCell align="center"><Button><EditIcon sx={{ color: "#0d47a1" }} /></Button><Button onClick={() => handleDelete(row)} sx={{ color: "#ef5350" }}><DeleteIcon /></Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
