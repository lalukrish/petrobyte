import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import PrintIcon from "@mui/icons-material/Print";
import ProductNew from "./dialogproduct";
require("dotenv").config();

export default function ProductsTable({}) {
  const [open, setOpen] = React.useState(false);
  const [products, setProduct] = React.useState([]);
  const [editProduct, setEditProduct] = React.useState({});
  const [refreshProduct, setrefreshProduct] = React.useState(false);

  React.useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/GETAllProduct`).then((responce) => {
      setProduct(responce.data.message);
    });
  }, [refreshProduct]);

  const handleRefresh = () => {
    setrefreshProduct(!refreshProduct);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setEditProduct({})
  };

  const handleEditProduct=(data)=>{
    setEditProduct(data)
    setOpen(true);
  }

  const handleDeleteProduct=(id)=>{
    axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/product/DELETEProduct?id=${id}`).then((responce) => {
      alert(responce.data.message);
    setrefreshProduct(!refreshProduct);
    });
  }

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
        Add Product
      </Button>
      {open ? <ProductNew refresh={handleRefresh} edit={editProduct} close={handleClose} /> : null}
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ background: "#e3f2fd", fontStyle: "bold" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Product</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Price(Rs)
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((product) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product.product_name}
                </TableCell>
                <TableCell align="center">{product.product_price}</TableCell>

                <TableCell align="center">
                  <Button onClick={()=>handleEditProduct(product)}>
                    <EditIcon sx={{ color: "#0d47a1" }} />
                  </Button>
                  <Button onClick={()=>handleDeleteProduct(product._id)}>
                    <DeleteIcon sx={{ color: "#ef5350" }} />
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
