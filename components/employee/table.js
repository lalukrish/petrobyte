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




export default function DataTable({data}) {

  
  
  
const { refreshEmployee, setRefreshEmployee } = React.useContext(PetrobyteContext);


  const handleDelete = (row) => {
    axios.delete(`https://petro.adaptable.app/employee?email=${row.mail}`).then((response)=>{alert(response.data.message)})
    setRefreshEmployee(!refreshEmployee)
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{background:"#e3f2fd"}}>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Contact</TableCell>
            <TableCell align="center">Address</TableCell>
            <TableCell align="center">Age</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
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
              <TableCell align="center"><Button><EditIcon/></Button><Button onClick={() =>handleDelete(row) }><DeleteIcon/></Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
