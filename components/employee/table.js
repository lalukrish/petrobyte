import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { PetrobyteContext } from '@/context/context';

function createData(
  
) {
  return {};
}

const rows = [
  
];

export default function BasicTable() {
    const { refreshEmployee, setRefreshEmployee } = React.useContext(PetrobyteContext);
    React.useEffect(() => {
    //   first
    
      
      
    }, [refreshEmployee])
    
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 ,borderBlockColor:"GrayText"}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><b>Staff Name</b></TableCell>
            <TableCell align="right"><b>Phone</b></TableCell>
            <TableCell align="right"><b>Age</b></TableCell>
            <TableCell align="right"><b>Address</b></TableCell>
            <TableCell align="right"><b>Email</b></TableCell>
            <TableCell align="right"><b>Option</b></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
          <TableCell></TableCell>
          <TableCell align="right"></TableCell>
          <TableCell align="right"></TableCell>
          <TableCell align="right"></TableCell>
          <TableCell align="right"></TableCell>
          </TableRow>

        </TableBody>
      </Table>
    </TableContainer>
  );
}
