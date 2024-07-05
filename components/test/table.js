import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, IconButton, InputAdornment, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import TestNew from "./dialogtest";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

export default function TestTable() {
  const [open, setOpen] = useState(false);
  const [editTest, setEditTest] = useState(null);
  const [testData, setTestData] = useState([]);

  const fetchTestData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/test/GETAllTest`
      );
      console.log("testdata", response.data.message.test);
      setTestData(response.data.message.test);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchTestData();
  }, []);

  const handleClickOpen = () => {
    setEditTest(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDataUpdated = () => {
    fetchTestData();
    setOpen(false);
  };

  const handleClickOpenEdit = (test) => {
    setEditTest(test);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/test/DELETETest?id=${id}`
      );
      fetchTestData();
    } catch (error) {
      console.error("There was an error deleting the data!", error);
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="20px">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              label="Search by date..."
              sx={{ 
                marginRight: "10px",
                '.MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#0d47a1',
                  },
                  '&:hover fieldset': {
                    borderColor: '#0d47a1',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#0d47a1',
                  },
                },
                '.MuiInputAdornment-root .MuiSvgIcon-root': {
                  color: '#0d47a1',
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CalendarTodayIcon />
                  </InputAdornment>
                ),
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <Button
          variant="outlined"
          sx={{
            color: "#0d47a1",
            border: "1px solid #0d47a1",
            height: '36.5px',
            marginLeft: "10px"
          }}
          onClick={handleClickOpen}
        >
          Add Test Details
        </Button>
      </Box>
      {open ? (
        <TestNew
          close={handleClose}
          onDataUpdated={handleDataUpdated}
          editTest={editTest}
        />
      ) : null}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ background: "#e3f2fd" }}>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Date
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Dispenser
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Sub Name
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Qty(Lts)
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {testData?.map((test) => (
              <TableRow
                key={test.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{test.date}</TableCell>
                <TableCell align="center">
                  {test?.dispencer_id?.dispencer_name}
                </TableCell>
                <TableCell align="center">
                  {test?.dispencer_id?.sub_dispencer_id?.sub_dispencer}
                </TableCell>
                <TableCell align="center">{test?.fuel_quantity}</TableCell>
                <TableCell align="center">
                  <Button onClick={() => handleClickOpenEdit(test)}>
                    <EditIcon sx={{ color: "#0d47a1" }} />
                  </Button>
                  <Button onClick={() => handleDelete(test._id)}>
                    <DeleteIcon sx={{ color: "#d32f2f" }} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
