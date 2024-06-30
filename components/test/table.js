import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import TestNew from "./dialogtest";
import axios from "axios";

export default function TestTable() {
  const [open, setOpen] = useState(false);
  const [editTest, setEditTest] = useState({});
  const [testData, setTestData] = useState([]);

  const handleClickOpenEdit = () => {
    setEditTest("");
    setOpen(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    // Replace with your API endpoint
    const fetchTestData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/test/GETAllTest`
        );
        setTestData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTestData();
  }, []);

  return (
    <Box>
      <Button
        variant="outlined"
        sx={{
          marginBottom: "20px",
          color: "#0d47a1",
          border: "1px solid #0d47a1",
        }}
        onClick={handleClickOpen}
      >
        Add Test Details
      </Button>
      {open ? <TestNew close={handleClose} edit={editTest} /> : null}
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
                Fuel
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
                <TableCell align="center">{test.dispenser}</TableCell>
                <TableCell align="center">{test.fuel}</TableCell>
                <TableCell align="center">{test.quantity}</TableCell>
                <TableCell align="center">
                  <Button onClick={handleClickOpenEdit}>
                    <EditIcon sx={{ color: "#0d47a1" }} />
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
