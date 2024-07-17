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
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
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
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import EditProductAccount from "@/components/accounts/accountsProducts/editAccountProduct";
import {
  ClearIcon,
  DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";

export default function Page() {
  const [fuel, setFuel] = React.useState(false);
  const [product, setProduct] = React.useState(false);
  const [expense, setExpense] = React.useState(false);
  const [editExpence, setEditExpence] = React.useState({});
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState({});
  const [search, setSearch] = useState("");
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [reportAccounts, setReportAccounts] = React.useState([]);
  const [accountoverview, setAccountoverview] = React.useState([]);
  const [productaccounts, setProductAccounts] = React.useState([]);
  const [expenceaccount, setExpenceAccount] = React.useState([]);
  // const [refreshReport, setRefreshReport] = React.useState(false);

  const [refreshExpence, setRefreshExpence] = React.useState(false);

  const [refreshProduct, setRefreshProduct] = React.useState(false);

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/accountReport/GETAccount?date=${search}`
      )
      .then((response) => setReportAccounts(response.data.message.account));
  }, [search]);

  useEffect(() => {
    axios
      .get(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/fuelAccounts/GETFuelAccountOverview?date=${search || ""}`
      )
      .then((response) => setAccountoverview(response.data.message));
  }, [search]);

  useEffect(() => {
    axios
      .get(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/productAccounts/GETAllProductAccount?page=${1}&date=${search || ""}`
      )
      .then((response) => {
        setProductAccounts(response?.data?.message?.fuelDetails);
      });
  }, [refreshProduct, search]);

  useEffect(() => {
    axios
      .get(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/expenceaccount/GETAllExpenceAccount?&date=${search || ""}`
      )
      .then((response) =>
        setExpenceAccount(response.data.message.expenceDetails)
      );
  }, [refreshExpence, search]);

  const handleRefeshExpence = () => {
    setEditExpence({});
    setRefreshExpence(!refreshExpence);
  };

  // const handleRefeshReport = () => {
  //   setRefreshReport(!refreshReport);
  // };

  const handleClearSearch = () => {
    setSearch(null);
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
      .then((response) => setRefreshProduct(!refreshProduct));
  };

  const handleSearch = (value) => {
    // Handle the search functionality here
    console.log("Search clicked", value);
    setSearch(value);
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
          <Box
            display="flex"
            justifyContent="flex-end"
            marginBottom="20px"
            marginRight="20px"
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Search by date..."
                  value={search ? dayjs(search, "DD/MM/YYYY") : null}
                  sx={{
                    marginRight: "10px",
                    ".MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#0d47a1",
                      },
                      "&:hover fieldset": {
                        borderColor: "#0d47a1",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#0d47a1",
                      },
                    },
                    ".MuiInputAdornment-root .MuiSvgIcon-root": {
                      color: "#0d47a1",
                    },
                  }}
                  format="DD/MM/YYYY"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CalendarTodayIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(date) => {
                    handleSearch(dayjs(date).format("DD/MM/YYYY"));
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <IconButton sx={{ marginLeft: "15px" }} onClick={handleClearSearch}>
              <ClearIcon />
            </IconButton>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ fontStyle: "normal", background: "#e3f2fd" }}>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Date
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Fuel Sale Amnt
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Product Sale Amnt
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Expense Amnt
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", background: "#fff9c4" }}
                  >
                    Net Amount
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    in Cash
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    in Bank
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Others
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Credit
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Debit
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reportAccounts?.map((reportAccount) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {reportAccount.date}
                    </TableCell>
                    <TableCell align="center">
                      {reportAccount.total_fuel_amount}
                    </TableCell>
                    <TableCell align="center">
                      {reportAccount.total_product_amount}
                    </TableCell>
                    <TableCell align="center">
                      {reportAccount.total_expence_amount}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#29b6f6" }}>
                      {reportAccount.total_fuel_amount +
                        reportAccount.total_product_amount -
                        reportAccount.total_expence_amount}
                    </TableCell>
                    <TableCell align="center">
                      {reportAccount.total_cash_inhand}
                    </TableCell>
                    <TableCell align="center">
                      {reportAccount.total_cash_bank}
                    </TableCell>
                    <TableCell align="center">
                      {reportAccount.total_cash_other}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#f44336" }}>
                      {reportAccount.total_credit_amount}
                    </TableCell>
                    <TableCell align="center">
                      {reportAccount.total_debit_amount}
                    </TableCell>
                  </TableRow>
                ))}
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
              justifyContent: "space-between",
              alignItems: "center",
              paddingRight: "20px",
              marginBottom: "20px",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Search by date..."
                  value={search ? dayjs(search, "DD/MM/YYYY") : null}
                  sx={{
                    marginRight: "10px",
                    ".MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#0d47a1",
                      },
                      "&:hover fieldset": {
                        borderColor: "#0d47a1",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#0d47a1",
                      },
                    },
                    ".MuiInputAdornment-root .MuiSvgIcon-root": {
                      color: "#0d47a1",
                    },
                  }}
                  format="DD/MM/YYYY"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CalendarTodayIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(date) => {
                    handleSearch(dayjs(date).format("DD/MM/YYYY"));
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <IconButton
              onClick={handleClearSearch}
              sx={{ marginRight: "700px" }}
            >
              <ClearIcon />
            </IconButton>
            <Button
              variant="outlined"
              onClick={handleClickOpenfuel}
              sx={{
                color: "#0d47a1",
                border: "1px solid #0d47a1",
                marginBottom: "0px",
              }}
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
                    <TableCell align="center">{accnt.dispencer_name}</TableCell>
                    {/* <TableCell align="center">
                      {accnt.petrolSaleAmount}
                    </TableCell>
                    <TableCell align="center">
                      {accnt.deiselSaleAmount}
                    </TableCell> */}
                    <TableCell align="center">{accnt.total_amount}</TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() =>
                          handleDialogOpen(accnt.date, accnt.dispencer_name)
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
              justifyContent: "space-between",
              alignItems: "center",
              paddingRight: "20px",
              marginBottom: "20px",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Search by date..."
                  value={search ? dayjs(search, "DD/MM/YYYY") : null}
                  sx={{
                    marginRight: "10px",
                    ".MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#0d47a1",
                      },
                      "&:hover fieldset": {
                        borderColor: "#0d47a1",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#0d47a1",
                      },
                    },
                    ".MuiInputAdornment-root .MuiSvgIcon-root": {
                      color: "#0d47a1",
                    },
                  }}
                  format="DD/MM/YYYY"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CalendarTodayIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(date) => {
                    handleSearch(dayjs(date).format("DD/MM/YYYY"));
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <IconButton
              onClick={handleClearSearch}
              sx={{ marginRight: "660px" }}
            >
              <ClearIcon />
            </IconButton>
            <Button
              variant="outlined"
              onClick={handleClickOpenproduct}
              style={{
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
                        {productAccount?.product_name || "N/A"}
                      </TableCell>
                      <TableCell align="center">
                        {productAccount?.product_price || "N/A"}
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
      {product ? (
        <ProductsNew
          close={handleCloseproduct}
          refresh={() => setRefreshProduct(!refreshProduct)}
        />
      ) : null}
      {editProductOpen && (
        <EditProductAccount
          open={editProductOpen}
          onClose={handleEditProductClose}
          productAccount={editProduct}
          refresh={() => setRefreshProduct(!refreshProduct)}
        />
      )}

      {selectedTab === 3 && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingRight: "20px",
              marginBottom: "20px",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Search by date..."
                  value={search ? dayjs(search, "DD/MM/YYYY") : null}
                  sx={{
                    marginRight: "10px",
                    ".MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#0d47a1",
                      },
                      "&:hover fieldset": {
                        borderColor: "#0d47a1",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#0d47a1",
                      },
                    },
                    ".MuiInputAdornment-root .MuiSvgIcon-root": {
                      color: "#0d47a1",
                    },
                  }}
                  format="DD/MM/YYYY"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CalendarTodayIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(date) => {
                    handleSearch(dayjs(date).format("DD/MM/YYYY"));
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <IconButton
              onClick={handleClearSearch}
              sx={{ marginRight: "660px" }}
            >
              <ClearIcon />
            </IconButton>
            <Button
              variant="outlined"
              onClick={handleClickOpenexpense}
              style={{
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
                {expenceaccount?.map((expAcc) => (
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
