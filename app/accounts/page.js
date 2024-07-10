"use client";

import React, { useEffect, useState } from "react";
require("dotenv").config();
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Tabs,
  Tab,
  InputAdornment,
  IconButton,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import FuelNew from "@/components/accounts/dialogfuel";
import ProductsNew from "@/components/accounts/dialogproduct";
import ExpenseNew from "@/components/accounts/dialogexpense";
import axios from "axios";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import FullScreenDialog from "@/components/accounts/dialogfullscreen";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import EditProductAccount from "@/components/accounts/accountsProducts/editAccountProduct";
import SearchIcon from "@mui/icons-material/Search";

export default function Page() {
  const [fuel, setFuel] = React.useState(false);
  const [product, setProduct] = React.useState(false);
  const [expense, setExpense] = React.useState(false);
  const [editExpence, setEditExpence] = React.useState({});
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState({});

  const [selectedTab, setSelectedTab] = React.useState(0);
  // const [fuelAccounts, setfuelAccounts] = React.useState([]);
  const [accountoverview, setAccountoverview] = React.useState([]);
  const [productaccounts, setProductAccounts] = React.useState([]);
  const [expenceaccount, setExpenceAccount] = React.useState([]);

  const [refreshExpence, setRefreshExpence] = React.useState(false);

  const [refreshProduct, setRefreshProduct] = React.useState(false);

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.NEXT_PUBLIC_API_URL}/fuelAccounts/GETAllFuelAccount`)
  //     .then((response) => setfuelAccounts(response.data.message));
  // }, []);

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/fuelAccounts/GETFuelAccountOverview`
      )
      .then((response) => setAccountoverview(response.data.message));
  }, []);

  useEffect(() => {
    axios
      .get(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/productAccounts/GETAllProductAccount?page=${1}`
      )
      .then((response) => {
        setProductAccounts(response?.data?.message?.fuelDetails);
        setRefreshProduct(false);
      });
  }, [refreshProduct]);

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/expenceaccount/GETAllExpenceAccount`
      )
      .then((response) =>
        setExpenceAccount(response.data.message.expenceDetails)
      );
  }, [refreshExpence]);
  const handleRefeshExpence = () => {
    setEditExpence({});
    setRefreshExpence(!refreshExpence);
  };

  const handleEditExpence = (editData) => {
    setEditExpence(editData);
    setExpense(true);
  };

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
    setEditExpence({});
  };

  const handleExpenseDelete = (id) => {
    axios
      .delete(
        `${process.env.NEXT_PUBLIC_API_URL}/expenceaccount/DELETEExpenceAccount?id=${id}`
      )
      .then((response) => {
        handleRefeshExpence();
        alert(response.data.message);
      });
  };
  // abhi
  const getIconColor = (tabIndex) => {
    return selectedTab === tabIndex ? "#0d47a1" : "inherit";
  };

  const handleDialogOpen = (date, dispencer) => {
    setDialogContent({
      date: date,
      dispencer: dispencer,
    });
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    // setDialogContent(null);
  };

  const [editProduct, setEditProduct] = React.useState({});
  const [editProductOpen, setEditProductOpen] = React.useState(false);

  // Function to handle opening the edit modal
  const handleEditProduct = (productAccount) => {
    setEditProduct(productAccount);
    setEditProductOpen(true);
  };

  // Function to handle closing the edit modal
  const handleEditProductClose = () => {
    setEditProductOpen(false);
    setEditProduct(null);
  };

  const handleDeleteProduct = (productAccount) => {
    axios
      .delete(
        `${process.env.NEXT_PUBLIC_API_URL}/productAccounts/DELETEProductAccount?id=${productAccount?._id}`
      )
      .then((response) => setRefreshProduct(true));
  };

  return (
    <>
      <Box sx={{ display: "flex", gap: 2, paddingBottom: "20px" }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="details tabs"
        >
          <Tab
            icon={<AccountBalanceWalletIcon sx={{ color: getIconColor(0) }} />}
            iconPosition="start"
            label="Account"
          />
          <Tab
            icon={<LocalGasStationIcon sx={{ color: getIconColor(1) }} />}
            iconPosition="start"
            label="Fuel Details"
          />
          <Tab
            icon={<ShoppingBasketIcon sx={{ color: getIconColor(2) }} />}
            iconPosition="start"
            label="Product Details"
          />
          <Tab
            icon={<ShoppingCartCheckoutIcon sx={{ color: getIconColor(3) }} />}
            iconPosition="start"
            label="Expense Details"
          />
        </Tabs>
      </Box>

      {selectedTab === 0 && (
        <>
          <Box display="flex" justifyContent="flex-end" marginBottom="20px">
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
                width: "250px", // Increase the width of the search field
                marginRight: "20px",
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
              onChange={() => {
                handleSearch(event.target.value);
              }}
            />
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ fontStyle: "normal", background: "#e3f2fd" }}>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Date
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Cash
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Bank
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    HP Card
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Credit
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Net Amount
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    18-07-2001
                  </TableCell>
                  <TableCell align="center">10001</TableCell>
                  <TableCell align="center">1200</TableCell>
                  <TableCell align="center">6000</TableCell>
                  <TableCell align="center">7000</TableCell>
                  <TableCell align="center">23000</TableCell>

                  <TableCell align="center">
                    <DoneAllIcon />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {selectedTab === 1 && (
        <>
          {dialogOpen ? (
            <FullScreenDialog
              content={dialogContent}
              open={dialogOpen}
              handleClose={handleDialogClose}
            />
          ) : null}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              paddingRight: "20px",
            }}
          >
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
              onChange={() => {
                handleSearch(event.target.value);
              }}
            />
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
              <TableHead sx={{ fontStyle: "normal", background: "#e3f2fd" }}>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Date
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Dispencer
                  </TableCell>
                  {/* <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Petrol Sale Amount
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Diesel Sale amount
                  </TableCell> */}
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Net Amount
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {accountoverview?.map((accnt) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {accnt.date}
                    </TableCell>
                    <TableCell align="center">{accnt.dispencer}</TableCell>
                    <TableCell align="center">
                      {accnt.petrolSaleAmount}
                    </TableCell>
                    <TableCell align="center">
                      {accnt.deiselSaleAmount}
                    </TableCell>
                    <TableCell align="center">{accnt.netAmount}</TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() =>
                          handleDialogOpen(accnt.date, accnt.dispencer)
                        }
                      >
                        <OpenInFullIcon sx={{ color: "#0d47a1" }} />
                      </Button>
                      <Button>
                        <CheckBoxIcon sx={{ color: "#0d47a1" }} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {fuel ? <FuelNew close={handleClosefuel} /> : null}

      {selectedTab === 2 && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              paddingRight: "20px",
            }}
          >
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
              onChange={() => {
                handleSearch(event.target.value);
              }}
            />
            <Button
              variant="outlined"
              onClick={handleClickOpenproduct}
              style={{
                marginBottom: "20px",
                color: "#0d47a1",
                border: "1px solid #0d47a1",
              }}
            >
              Add Product Details
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ fontStyle: "normal", background: "#e3f2fd" }}>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Date
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Product
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Price
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Quantity
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Total
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productaccounts?.map((productAccount) => {
                  // console.log("productAccount", productAccount);
                  return (
                    <TableRow
                      key={productAccount?._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">
                        {productAccount?.date}
                      </TableCell>
                      <TableCell align="center">
                        {productAccount?.product_id?.product_name || "N/A"}
                      </TableCell>
                      <TableCell align="center">
                        {productAccount?.product_id?.product_price || "N/A"}
                      </TableCell>
                      <TableCell align="center">
                        {productAccount?.quantity}
                      </TableCell>
                      <TableCell align="center">
                        {productAccount?.total_amount}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          onClick={() => handleEditProduct(productAccount)}
                        >
                          <EditIcon sx={{ color: "#0d47a1" }} />
                        </Button>
                        <Button
                          onClick={() => handleDeleteProduct(productAccount)}
                          sx={{ color: "#ef5350" }}
                        >
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      {product ? <ProductsNew close={handleCloseproduct} /> : null}
      {editProductOpen && (
        <EditProductAccount
          open={editProductOpen}
          onClose={handleEditProductClose}
          productAccount={editProduct}
          refresh={() => setRefreshProduct(true)}
        />
      )}

      {selectedTab === 3 && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              paddingRight: "20px",
            }}
          >
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
              onChange={() => {
                handleSearch(event.target.value);
              }}
            />
            <Button
              variant="outlined"
              onClick={handleClickOpenexpense}
              style={{
                marginBottom: "20px",
                color: "#0d47a1",
                border: "1px solid #0d47a1",
              }}
            >
              Add Expense Details
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ fontStyle: "normal", background: "#e3f2fd" }}>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Date
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Expense Type
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Amount
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Staff (applicable to salary)
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Comments
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expenceaccount.map((expAcc) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {expAcc.date}
                    </TableCell>
                    <TableCell align="center">{expAcc.expence_type}</TableCell>
                    <TableCell align="center">
                      {expAcc.expence_amount}
                    </TableCell>
                    <TableCell align="center">
                      {expAcc.emp_id ? expAcc.emp_id.emp_name : "N/A"}
                    </TableCell>
                    <TableCell align="center">
                      {expAcc.expence_comment}
                    </TableCell>

                    <TableCell align="center">
                      <Button onClick={() => handleEditExpence(expAcc)}>
                        <EditIcon sx={{ color: "#0d47a1" }} />
                      </Button>
                      <Button onClick={() => handleExpenseDelete(expAcc._id)}>
                        <DeleteIcon sx={{ color: "#ef5350" }} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      {expense ? (
        <ExpenseNew
          close={handleCloseexpense}
          refresh={handleRefeshExpence}
          edit={editExpence}
        />
      ) : null}
    </>
  );
}
