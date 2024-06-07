"use client";

import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Tabs, Tab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import FuelNew from "@/components/accounts/dialogfuel";
import ProductsNew from "@/components/accounts/dialogproduct";
import ExpenseNew from "@/components/accounts/dialogexpense";
import TestNew from "@/components/accounts/dialogtest";
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';

export default function Page() {
  const [fuel, setFuel] = React.useState(false);
  const [product, setProduct] = React.useState(false);
  const [expense, setExpense] = React.useState(false);
  const [test, setTest] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleClickOpenfuel = () => {
    setFuel(true);
  };

  const handleClosefuel = () => {
    setFuel(false);
  };

  const handleClickOpenproduct = () => {
    setProduct(true);
  };

  const handleCloseproduct = () => {
    setProduct(false);
  };

  const handleClickOpenexpense = () => {
    setExpense(true);
  };

  const handleCloseexpense = () => {
    setExpense(false);
  };

  const handleClickOpentest = () => {
    setTest(true);
  };

  const handleClosetest = () => {
    setTest(false);
  };

  return (
    <>
      <Box sx={{ display: "flex", gap: 2, paddingBottom: "20px" }}>
        <Tabs value={selectedTab} onChange={handleTabChange} aria-label="details tabs">
          <Tab icon={<AccountBalanceWalletIcon />} iconPosition="start" label="Account" />
          <Tab icon={<LocalGasStationIcon />} iconPosition="start" label="Fuel Details" />
          <Tab icon={<ShoppingBasketIcon />} iconPosition="start" label="Product Details" />
          <Tab icon={<PointOfSaleIcon />} iconPosition="start" label="Expense Details" />
          <Tab icon={<TroubleshootIcon />} iconPosition="start" label="Test Details" />
        </Tabs>
      </Box>

      {selectedTab === 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{fontStyle:"normal",backgroundColor:"beige"}}>
              <TableRow>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Cash in hand</TableCell>
                <TableCell align="center">Bank</TableCell>
                <TableCell align="center">Hp Card</TableCell>
                <TableCell align="center">Credit</TableCell>
                <TableCell align="center">Net Amount</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row" align="center">
                  18/07/2001
                </TableCell>
                <TableCell align="center">10001</TableCell>
                <TableCell align="center">1200</TableCell>
                <TableCell align="center">6000</TableCell>
                <TableCell align="center">5500</TableCell>
                <TableCell align="center">8000</TableCell>
                <TableCell align="center">
                  <Button>
                    <EditIcon />
                  </Button>
                  <Button>
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {selectedTab === 1 && (
         <>
          <Button variant="outlined" onClick={handleClickOpenfuel}>
            Add Fuel Details
          </Button>
          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{fontStyle:"normal",backgroundColor:"beige"}}>
            <TableRow>
            
                <TableCell align="center" colSpan={5} >Staff</TableCell>
                <TableCell align="center" colSpan={3}>Petrol</TableCell>

                <TableCell align="center" colSpan={3}>Diesel</TableCell>
                <TableCell align="center" colSpan={2}></TableCell>
                
                
                
            </TableRow>
            <TableRow>
            <TableCell  align="center">
                Date
              </TableCell>
            <TableCell align="center">Name</TableCell>
                <TableCell align="center">From</TableCell>
                <TableCell align="center">To </TableCell>
                <TableCell align="center">Dispencer</TableCell>
                <TableCell align="center">SM</TableCell>
                <TableCell align="center">EM</TableCell>
                <TableCell align="center">Sale Amount</TableCell>
                <TableCell align="center">SM</TableCell>
                <TableCell align="center">EM</TableCell>
                <TableCell align="center">Sale Amount</TableCell>
                <TableCell align="center">Total Amount</TableCell>
                <TableCell align="center">Actions</TableCell>
              
            </TableRow>
                
               





                
              
            </TableHead>
            <TableBody>
              <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell  align="center">
                18/07/2001
              </TableCell>
                <TableCell component="th" scope="row">
                  Aslam
                  
                </TableCell>
                <TableCell align="center">9:00</TableCell>
                <TableCell align="center">6:00</TableCell>
                <TableCell align="center">D1</TableCell>
                <TableCell align="center">213000</TableCell>
                <TableCell align="center">523000</TableCell>
                <TableCell align="center">500000</TableCell>
                <TableCell align="center">114000</TableCell>
                <TableCell align="center">330000</TableCell>
                <TableCell align="center">600000</TableCell>
                <TableCell align="center">1100000</TableCell>
                <TableCell align="center"><EditIcon/></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

          
        </>
      )}
      {fuel ? <FuelNew close={handleClosefuel} /> : null}

      {selectedTab === 2 && (
        <>
        <Button variant="outlined" onClick={handleClickOpenproduct}>
          Add Product Details
        </Button>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{fontStyle:"normal",backgroundColor:"beige"}}>
            <TableRow>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Product</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="center">Actions</TableCell>

              
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell  align="center">
                18/07/2001
              </TableCell>
              <TableCell align="center">Grease</TableCell>
              <TableCell align="center">700</TableCell>
              <TableCell align="center">1</TableCell>
              <TableCell align="center">700</TableCell>
              <TableCell align="center">
                <Button>
                  <EditIcon />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      </>
      )}
      {product ? <ProductsNew close={handleCloseproduct} /> : null}

      {selectedTab === 3 && (
        <>
        <Button variant="outlined" onClick={handleClickOpenexpense}>
          Add Expense Details
        </Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{fontStyle:"normal",backgroundColor:"beige"}}>
              <TableRow>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Expense Type</TableCell>
                <TableCell align="center">Amount</TableCell>
                <TableCell align="center">Comments</TableCell>
                <TableCell align="center">Actions</TableCell>

                
                
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row" align="center">
                  18/07/2001
                </TableCell>
                <TableCell align="center">Bills</TableCell>
                <TableCell align="center">4000</TableCell>
                <TableCell align="center">Electricity</TableCell>
                
                <TableCell align="center">
                  <Button>
                    <EditIcon />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        </>
      )}
      {expense ? <ExpenseNew close={handleCloseexpense} /> : null}

      {selectedTab === 4 && (
        <>
        <Button variant="outlined" onClick={handleClickOpentest}>
          Add Test Details
        </Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{fontStyle:"normal",backgroundColor:"beige"}}>
              <TableRow>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Petrol in Lts</TableCell>
                <TableCell align="center">Diesel in Lts</TableCell>
                <TableCell align="center">Actions</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row" align="center">
                  18/07/2001
                </TableCell>
                <TableCell align="center">10001</TableCell>
                <TableCell align="center">1200</TableCell>                
                <TableCell align="center">
                  <Button>
                    <EditIcon />
                  </Button>
                  
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        </>
      )}
      {test ? <TestNew close={handleClosetest} /> : null}
    </>
  );
}
