import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Stack, TextField } from "@mui/material";
import { PetrobyteContext } from "@/context/context";
import axios from "axios";
require("dotenv").config();

export default function ProductNew({ refresh, edit, close }) {
  const [product, setProduct] = React.useState("");
  const [price, setPrice] = React.useState("");

  const saveProduct = () => {
    let productData = {
      product_name: product,
      product_price: price,
    };

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/product/POSTProduct`, productData)
      .then((responce) => {
        alert(responce.data.message);
        refresh();
        close();
      })
      .catch((err) => {
        alert(err);
      });
  };

  const updateProduct = () => {
    let productData = {
      _id: edit._id,
      product_name: product ? product : edit.product_name,
      product_price: price ? price : edit.product_price,
    };

    axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/product/PUTProduct`, productData)
      .then((responce) => {
        alert(responce.data.message);
        refresh();
        close();
      })
      .catch((err) => {
        alert(err);
      });
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  const handleClose = () => {
    close();
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Add New Product</DialogTitle>
      <DialogContent sx={{ paddingTop: "5px" }}>
        <Stack spacing={2} sx={{ width: "400px", padding: "5px" }}>
          <TextField
            autoFocus
            id="outlined-basic"
            label="Product"
            variant="outlined"
            value={product ? product : edit?.product_name}
            onChange={(event) => {
              edit.product_name = null;
              setProduct(event.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            label="Price"
            variant="outlined"
            value={price ? price : edit?.product_price}
            onChange={(event) => {
              edit.product_price = null;
              setPrice(event.target.value);
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          color="success"
          onClick={edit.product_name ? updateProduct : saveProduct}
        >
          {edit.product_name ? `Update` : `Save`}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
