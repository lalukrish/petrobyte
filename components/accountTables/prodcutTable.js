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
import {
  ClearIcon,
  DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FuelNew from "../accounts/dialogfuel";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import dayjs from "dayjs";
import EditProductAccount from "../accounts/accountsProducts/editAccountProduct";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductsNew from "../accounts/dialogproduct";
const ProdcutTable = () => {
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState(false);
  const [refreshProduct, setRefreshProduct] = useState(false);
  const [productaccounts, setProductAccounts] = useState([]);

  const handleClearSearch = () => {
    setSearch("");
  };

  const handleSearch = (value) => {
    // Handle the search functionality here
    console.log("Search clicked", value);
    setSearch(value);
  };

  const handleClickOpenproduct = () => {
    setProduct(true);
  };
  const [editProduct, setEditProduct] = useState({});
  const [editProductOpen, setEditProductOpen] = useState(false);

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

  useEffect(() => {
    axios
      .get(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/productAccounts/GETAllProductAccount?page=${1}&date=${search || ""}`
      )
      .then((response) => {
        setProductAccounts(response?.data?.message?.productAccount);
      });
  }, [refreshProduct, search]);

  const handleCloseproduct = () => {
    setProduct(false);
  };
  return (
    <>
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
          <IconButton onClick={handleClearSearch} sx={{ marginRight: "660px" }}>
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
                    <TableCell align="center">{productAccount?.date}</TableCell>
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
                      <Button onClick={() => handleEditProduct(productAccount)}>
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
    </>
  );
};

export default ProdcutTable;
