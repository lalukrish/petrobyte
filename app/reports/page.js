import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from '@mui/icons-material/Search';

export default function ReportsTable() {
  // const [currentPage, setCurrentPage] = React.useState(1);
  // const [totalPages, setTotalPages] = React.useState(1);
  // const limit = 10;

  return (
    <Box>
      <TextField
        variant="outlined"
        placeholder="Search..."
        sx={{
          "& .MuiOutlinedInput-root": {
            height: "36.5px", // Match the height of the Add Product button
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
          width: "250px", // Increase the width of the search field
          marginRight: "10px",
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={""}
      />

      {/* <Button
        variant="outlined"
        sx={{
          marginBottom: "20px",
          color: "#0d47a1",
          border: "1px solid #0d47a1",
        }}
        onClick={handleClickOpen}
      >
        Add Product
      </Button>
      {open &&
        <ProductNew
          refresh={handleRefresh}
          edit={editProduct}
          close={handleClose}
        />
      } */}
      <Typography sx={{ fontWeight: "bold", marginBottom: "15px" }}>
        Reports History
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ background: "#e3f2fd", fontStyle: "bold" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", borderBottom: "2px solid #ddd" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: "bold", borderBottom: "2px solid #ddd" }}>Cash</TableCell>
              <TableCell sx={{ fontWeight: "bold", borderBottom: "2px solid #ddd" }}>Bank</TableCell>
              <TableCell sx={{ fontWeight: "bold", borderBottom: "2px solid #ddd" }}>HP card</TableCell>
              <TableCell sx={{ fontWeight: "bold", borderBottom: "2px solid #ddd" }}>Credit</TableCell>
              <TableCell sx={{ fontWeight: "bold", borderBottom: "2px solid #ddd" }}>Product Sale Amnt</TableCell>
              <TableCell sx={{ fontWeight: "bold", borderBottom: "2px solid #ddd" }}>Expense Amnt</TableCell>
              <TableCell sx={{ fontWeight: "bold", borderBottom: "2px solid #ddd" }}>Balance</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", borderBottom: "2px solid #ddd" }}>Net Sale Amount</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", borderBottom: "2px solid #ddd" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {?.map(() => ( */}
            <TableRow
              key={""}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "&:not(:last-child) td": { borderBottom: "1px solid #ddd" }
              }}
            >
              <TableCell component="th" scope="row">
                18/07/2001
              </TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center">
                <Button onClick={""}>
                  <EditIcon sx={{ color: "#0d47a1" }} />
                </Button>
                <Button onClick={""}>
                  <DeleteIcon sx={{ color: "#ef5350" }} />
                </Button>
              </TableCell>
            </TableRow>
            {/* ))} */}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      /> */}
    </Box>
  );
}
