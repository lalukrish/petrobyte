import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  Stack,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";
import moment from "moment";
import { Formik, Field, FieldArray, Form } from "formik";
import * as Yup from "yup";

export default function ProductsNew({ close, refresh }) {
  const todayDate = moment().format("DD/MM/YYYY");

  const handleClose2 = () => close();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/product/GETAllProduct`)
      .then((response) => {
        const productData = response.data.message.products.map((item) => ({
          product_id: item._id,
          product_name: item.product_name,
          price: item.product_price,
        }));
        setProducts(productData);
      });
  }, []);

  const validationSchema = Yup.object({
    rows: Yup.array().of(
      Yup.object().shape({
        date: Yup.string().required("Date is required"),
        product_id: Yup.string().required("Product is required"),
        product_name: Yup.string().required("Product name is required"),
        product_price: Yup.number().required("Product price is required"),
        quantity: Yup.number()
          .min(1, "Quantity must be at least 1")
          .required("Quantity is required"),
        total_amount: Yup.number().required("Total amount is required"),
      })
    ),
  });

  const initialValues = {
    rows: [
      {
        date: todayDate,
        product_id: "",
        product_name: "",
        product_price: "",
        quantity: "1",
        total_amount: "",
      },
    ],
  };

  const handleProductChange = (formik, index, value) => {
    const selectedProduct = products.find(
      (product) => product.product_id === value
    );

    formik.setFieldValue(`rows.${index}.product_id`, value);
    formik.setFieldValue(
      `rows.${index}.product_name`,
      selectedProduct.product_name
    );
    formik.setFieldValue(`rows.${index}.product_price`, selectedProduct.price);
    formik.setFieldValue(
      `rows.${index}.total_amount`,
      selectedProduct.price * formik.values.rows[index].quantity
    );
  };

  const handleQuantityChange = (formik, index, value) => {
    formik.setFieldValue(`rows.${index}.quantity`, value);
    formik.setFieldValue(
      `rows.${index}.total_amount`,
      formik.values.rows[index].product_price * value
    );
  };

  return (
    <Dialog
      maxWidth="md"
      fullWidth
      open={true}
      onClose={handleClose2}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Products Details</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          const validRows = values.rows.filter(
            (row) => row.product_name && row.quantity && row.total_amount
          );
          if (validRows.length === 0) {
            alert("Please fill in at least one product completely.");
            return;
          }
          console.log("validRows", validRows);
          axios
            .post(
              `${process.env.NEXT_PUBLIC_API_URL}/productAccounts/POSTProductAccount`,
              validRows
            )
            .then((response) => {
              alert(response.data.message);
              resetForm();
              refresh();
              close();
            })
            .catch((error) => {
              alert("There was an error saving the products.");
              console.error(error);
            });
        }}
      >
        {(formik) => (
          <Form>
            <DialogContent sx={{ height: 600 }}>
              <FieldArray
                name="rows"
                render={({ push, remove }) => (
                  <>
                    {formik.values.rows.map((row, index) => (
                      <Stack
                        key={index}
                        spacing={2}
                        direction="row"
                        sx={{ padding: "10px" }}
                      >
                        <FormControl
                          fullWidth
                          error={
                            formik.touched.rows?.[index]?.product_id &&
                            Boolean(formik.errors.rows?.[index]?.product_id)
                          }
                        >
                          <InputLabel id={`select-label-${index}`}>
                            Products
                          </InputLabel>
                          <Select
                            labelId={`select-label-${index}`}
                            id={`select-${index}`}
                            value={row.product_id}
                            label="Products"
                            onChange={(event) =>
                              handleProductChange(
                                formik,
                                index,
                                event.target.value
                              )
                            }
                          >
                            {products.map((product) => (
                              <MenuItem
                                key={product.product_id}
                                value={product.product_id}
                              >
                                {product.product_name}
                              </MenuItem>
                            ))}
                          </Select>
                          {formik.touched.rows?.[index]?.product_id &&
                            formik.errors.rows?.[index]?.product_id && (
                              <FormHelperText>
                                {formik.errors.rows?.[index]?.product_id}
                              </FormHelperText>
                            )}
                        </FormControl>
                        <TextField
                          label="Price"
                          variant="outlined"
                          value={row.product_price}
                          disabled
                        />
                        <TextField
                          id={`outlined-number-${index}`}
                          label="Qty"
                          type="number"
                          value={row.quantity}
                          onChange={(event) =>
                            handleQuantityChange(
                              formik,
                              index,
                              event.target.value
                            )
                          }
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            min: 1,
                          }}
                          error={
                            formik.touched.rows?.[index]?.quantity &&
                            Boolean(formik.errors.rows?.[index]?.quantity)
                          }
                          helperText={
                            formik.touched.rows?.[index]?.quantity &&
                            formik.errors.rows?.[index]?.quantity
                          }
                        />
                        <TextField
                          id={`total-${index}`}
                          label="Total"
                          fullWidth
                          variant="outlined"
                          value={row.total_amount}
                          disabled
                        />

                        {formik.values.rows.length > 1 && (
                          <Button onClick={() => remove(index)}>
                            <RemoveIcon color="error" />
                          </Button>
                        )}
                        {index === formik.values.rows.length - 1 && (
                          <Button
                            onClick={() =>
                              push({
                                date: todayDate,
                                product_id: "",
                                product_name: "",
                                product_price: "",
                                quantity: "1",
                                total_amount: "",
                              })
                            }
                          >
                            <AddIcon color="success" />
                          </Button>
                        )}
                      </Stack>
                    ))}
                  </>
                )}
              />
            </DialogContent>
            <DialogActions>
              <Button color="error" onClick={handleClose2}>
                Cancel
              </Button>
              <Button color="success" type="submit">
                Save
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
