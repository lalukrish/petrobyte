"use client";

import React, { useEffect } from "react";
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
import axios from "axios";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import FullScreenDialog from "@/components/accounts/dialogfullscreen";


export default function Page() {
  const [fuel, setFuel] = React.useState(false);
  const [product, setProduct] = React.useState(false);
  const [expense, setExpense] = React.useState(false);
  const [test, setTest] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState(null);

  
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [fuelAccounts,setfuelAccounts] = React.useState([])
  useEffect(() => {
    axios.get("https://petro.adaptable.app/fuelAccounts").then((response)=>setfuelAccounts(response.data.message))
  
    
  }, [])


  
  

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
  const getIconColor = (tabIndex) => {
    return selectedTab === tabIndex ? '#0d47a1' : 'inherit';
  };
  const handleDialogOpen = (content) => {
    setDialogContent(content);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setDialogContent(null);
  };

  return (
    <>
      <Box sx={{ display: "flex", gap: 2, paddingBottom: "20px" }}>
        <Tabs value={selectedTab} onChange={handleTabChange} aria-label="details tabs">
          <Tab icon={<AccountBalanceWalletIcon sx={{ color: getIconColor(0) }} />} iconPosition="start" label="Account" />
          <Tab icon={<LocalGasStationIcon sx={{ color: getIconColor(1) }} />} iconPosition="start" label="Fuel Details" />
          <Tab icon={<ShoppingBasketIcon sx={{ color: getIconColor(2) }}/>} iconPosition="start" label="Product Details" />
          <Tab icon={<PointOfSaleIcon sx={{ color: getIconColor(3) }}/>} iconPosition="start" label="Expense Details" />
          <Tab icon={<TroubleshootIcon sx={{ color: getIconColor(4) }}/>} iconPosition="start" label="Test Details" />
        </Tabs>
      </Box>

      {selectedTab === 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{fontStyle:"normal",background:"#e3f2fd"}}>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Date</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Cash</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Bank</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>HP Card</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Credit</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Net Amount</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Action</TableCell>
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
                    <EditIcon sx={{ color: "#0d47a1" }}/>
                  </Button>
                  <Button>
                    <DeleteIcon sx={{ color: "#e57373" }}/>
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {selectedTab === 1 && (
        <>
        <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: "20px",
        }}
      >
        <Button
          variant="outlined"
          onClick={handleClickOpenfuel}
          style={{ marginBottom: "20px" }}
          sx={{ color: "#0d47a1", border: "1px solid #0d47a1" }}
        >
          Add Fuel Details
        </Button>
      </Box>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{fontStyle:"normal",background:"#e3f2fd"}}>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Date</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Dispencer</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Petrol Sale Amount</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Diesel Sale amount</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Net Amount</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row" align="center">
                18/07/2001
              </TableCell>
              <TableCell align="center">D1</TableCell>
              <TableCell align="center">120000</TableCell>
              <TableCell align="center">80000</TableCell>
              <TableCell align="center">200000</TableCell>
              <TableCell align="center">
              
                <Button onClick={() => handleDialogOpen("Fuel Sale Details for 18/07/2001")}>
                  <VisibilityIcon sx={{ color: "#0d47a1" }}/>
                </Button>
                <Button>
                  <CheckBoxIcon sx={{ color: "#0d47a1" }}/>
                </Button>
                <FullScreenDialog open={dialogOpen} handleClose={handleDialogClose} content={dialogContent} />

              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      </>
      
      )}
      {fuel ? <FuelNew close={handleClosefuel} /> : null}

      {selectedTab === 2 && (
        <>
        <Box sx={{ display: "flex", justifyContent: "flex-end", paddingRight: "20px"}}>
        <Button variant="outlined" onClick={handleClickOpenproduct} style={{marginBottom:"20px",color:"#0d47a1",border: '1px solid #0d47a1'}}>
          Add Product Details
        </Button>
        </Box>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{fontStyle:"normal",background:"#e3f2fd"}}>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Date</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Product</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Price</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Total</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }} >Actions</TableCell>

              
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
                  <EditIcon sx={{ color: "#0d47a1" }}/>
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
        <Box sx={{ display: "flex", justifyContent: "flex-end", paddingRight: "20px"}}>
        <Button variant="outlined" onClick={handleClickOpenexpense} style={{marginBottom:"20px",color:"#0d47a1",border: '1px solid #0d47a1'}}>
          Add Expense Details
        </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{fontStyle:"normal",background:"#e3f2fd"}}>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Date</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Expense Type</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Staff (applicable to salary)</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Comments</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>

                
                
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row" align="center">
                  18/07/2001
                </TableCell>
                <TableCell align="center">Bills</TableCell>
                <TableCell align="center">4000</TableCell>
                <TableCell align="center">N/A</TableCell>
                <TableCell align="center">Electricity</TableCell>

                
                <TableCell align="center">
                  <Button>
                    <EditIcon sx={{ color: "#0d47a1" }}/>
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
        <Box sx={{ display: "flex", justifyContent: "flex-end", paddingRight: "20px"}}>
        
        <Button variant="outlined" onClick={handleClickOpentest} style={{marginBottom:"20px",color:"#0d47a1",border: '1px solid #0d47a1'}}>
          Add Test Details
        </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{fontStyle:"normal",background:"#e3f2fd"}}>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Date</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Petrol in Lts</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Diesel in Lts</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                
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
                    <EditIcon sx={{ color: "#0d47a1" }}/>
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
