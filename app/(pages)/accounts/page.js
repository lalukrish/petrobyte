"use client";

import React, { useEffect, useState } from "react";
require("dotenv").config();
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Tabs, Tab, InputAdornment, IconButton } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

import axios from "axios";

import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import {
  ClearIcon,
  DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import FuelAccountTable from "@/components/accountTables/fuelAccountTable";
import ProdcutTable from "@/components/accountTables/prodcutTable";
import ExpenseTable from "@/components/accountTables/expenseTable";

export default function Page() {
  const [search, setSearch] = useState("");
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [reportAccounts, setReportAccounts] = React.useState([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/accountReport/GETAccount?date=${search}`
      )
      .then((response) => setReportAccounts(response.data.message.account));
  }, [search]);

  const handleClearSearch = () => {
    setSearch("");
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // abhi
  const getIconColor = (tabIndex) => {
    return selectedTab === tabIndex ? "#0d47a1" : "inherit";
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
          <FuelAccountTable />
        </>
      )}

      {selectedTab === 2 && (
        <>
          <ProdcutTable />
        </>
      )}

      {selectedTab === 3 && (
        <>
          <ExpenseTable />
        </>
      )}
    </>
  );
}
