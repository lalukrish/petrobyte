import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Divider,
  Alert,
  AlertTitle,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import moment from "moment";
import * as Yup from "yup";
import { useFormik } from "formik";
require("dotenv").config();

const validationSchema = Yup.object().shape({
  cash: Yup.number().required("Cash is required"),
  bank: Yup.number().required("Bank is required"),
  hpCard: Yup.number().required("HP Card is required"),
  totalSaleAmount: Yup.number().required("Total Sale Amount is required"),
});

export default function FuelNew({ close, editTest, setAlert }) {
  const [allEmployee, setAllEmployee] = useState([]);
  const [dispencers, setDispencers] = useState([]);
  const [selectedDispencers, setSelectedDispencers] = useState([
    { name: "", subRows: [] },
  ]);
  // const [alert, setAlert] = useState({
  //   open: false,
  //   message: "",
  //   severity: "",
  // });
  const theme = useTheme();
  const handleClose = () => close();
  const date = moment().format("DD/MM/YYYY");
  const [fuelData, setFuelData] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const formik = useFormik({
    initialValues: {
      cash: "",
      bank: "",
      hpCard: "",
      totalSaleAmount: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSave(values);
    },
  });

  useEffect(() => {
    fetchDispensers();
  }, []);

  useEffect(() => {
    const totalSaleAmount = Object.values(fuelData).reduce(
      (acc, curr) => acc + (curr.total || 0),
      0
    );
    formik.setFieldValue("totalSaleAmount", totalSaleAmount);
  }, [fuelData]);

  const fetchDispensers = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/dispencer/GETAllDispencer`
      );
      setDispencers(response.data.message.allDispencers);
    } catch (error) {
      console.error("Error fetching dispensers:", error);
    }
  };

  const fetchSubRows = async (dispencer) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/dispencer/GETSubDispencer?name=${dispencer}`
      );

      const subRows = response.data.message;

      const initialFuelData = subRows.reduce((acc, row) => {
        acc[row.sub_dispencer_id._id] = {
          start: row.live_reading,
          fuelPrice: row.sub_dispencer_id.fuel_id.fuel_price,
        };
        return acc;
      }, {});

      setFuelData((prev) => ({
        ...prev,
        ...initialFuelData,
      }));

      return subRows;
    } catch (error) {
      console.error("Error fetching sub rows:", error);
      return [];
    }
  };

  const handleSave = (formValues) => {
    const fuelDetails = selectedDispencers.flatMap((dispencer) =>
      (dispencer.subRows || []).map((type) => ({
        date: date,
        dispencer_name: dispencer.name,
        sub_dispencer_id: type?.sub_dispencer_id?._id,
        fuel_start_reading: fuelData[type.sub_dispencer_id._id]?.start || "",
        fuel_end_reading: fuelData[type.sub_dispencer_id._id]?.end || "",
        fuel_qty: fuelData[type.sub_dispencer_id._id]?.qty || "",
        amount: fuelData[type.sub_dispencer_id._id]?.total || "",
        fuel_price_selected: type.sub_dispencer_id.fuel_id?.fuel_price,
      }))
    );

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/fuelAccounts/POSTFuelAccount`,
        fuelDetails
      )
      .then((response) => {
        setAlert({
          open: true,
          message: response.data.message,
          severity: "success",
        });
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: "Error posting fuel details",
          severity: "error",
        });
        console.error("Error posting fuel details:", error);
      });

    const cashDetails = {
      date: date,
      total_amount: formValues.totalSaleAmount,
      cash_inhand: formValues.cash,
      cash_bank: formValues.bank,
      cash_other: formValues.hpCard,
    };

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/cashManagement/POSTCashDetails`,
        cashDetails
      )
      .then((response) => {
        setAlert({
          open: true,
          message: response.data.message,
          severity: "success",
        });
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: "Error posting cash details",
          severity: "error",
        });
        console.error("Error posting cash details:", error);
      });
  };

  const handleFuelDataChange = (type, field, value) => {
    setFuelData((prev) => {
      const updatedData = {
        ...prev,
        [type]: {
          ...prev[type],
          [field]: value,
        },
      };

      if (field === "end") {
        const startReading = parseFloat(updatedData[type].start || 0);
        const endReading = parseFloat(value);
        const qty = endReading - startReading;
        const fuelPrice = updatedData[type].fuelPrice || 0;

        updatedData[type].qty = qty;
        updatedData[type].total = qty * fuelPrice;
      }

      return updatedData;
    });
  };

  const handleAddDispencer = () => {
    setSelectedDispencers([...selectedDispencers, { name: "", subRows: [] }]);
  };

  const handleDispencerChange = async (index, value) => {
    const newSelectedDispencers = [...selectedDispencers];
    newSelectedDispencers[index].name = value;
    newSelectedDispencers[index].subRows = await fetchSubRows(value);
    setSelectedDispencers(newSelectedDispencers);
  };

  const handleRemoveDispencer = (index) => {
    const newSelectedDispencers = selectedDispencers.filter(
      (_, i) => i !== index
    );
    setSelectedDispencers(newSelectedDispencers);
  };

  const getAvailableDispensers = (index) => {
    const selectedNames = selectedDispencers.map((disp) => disp.name);
    return dispencers.filter(
      (disp) =>
        !selectedNames.includes(disp.dispencer_name) ||
        disp.dispencer_name === selectedDispencers[index].name
    );
  };

  return (
    <Dialog
      maxWidth="md"
      fullWidth
      open={true}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Add Fuel Details</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ width: "100%", padding: "5px" }}>
          {/* {alert.open && (
            <Alert
              severity={alert.severity}
              onClose={() =>
                setAlert({ open: false, message: "", severity: "" })
              }
            >
              <AlertTitle>
                {alert.severity === "success" ? "Success" : "Error"}
              </AlertTitle>
              {alert.message}
            </Alert>
          )} */}
          {selectedDispencers.map((dispencer, index) => (
            <Box
              key={index}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <FormControl fullWidth>
                  <InputLabel id={`dispencer-label-${index}`}>
                    Dispencer
                  </InputLabel>
                  <Select
                    labelId={`dispencer-label-${index}`}
                    id={`dispencer-select-${index}`}
                    value={dispencer.name}
                    label="Dispencer"
                    onChange={(event) =>
                      handleDispencerChange(index, event.target.value)
                    }
                  >
                    {getAvailableDispensers(index).map((disp) => (
                      <MenuItem key={disp._id} value={disp.dispencer_name}>
                        {disp.dispencer_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {index === selectedDispencers.length - 1 && (
                  <IconButton onClick={handleAddDispencer} color="primary">
                    <Add />
                  </IconButton>
                )}
                {selectedDispencers.length > 1 && (
                  <IconButton
                    onClick={() => handleRemoveDispencer(index)}
                    color="error"
                  >
                    <Remove />
                  </IconButton>
                )}
              </Box>
              {dispencer.subRows.map((type) => (
                <Box
                  key={type._id}
                  sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}
                >
                  <Typography>{type.sub_dispencer_id.sub_dispencer}</Typography>
                  <TextField
                    label="Start Metering"
                    fullWidth
                    value={type.live_reading}
                    variant="outlined"
                    disabled
                    onChange={(e) =>
                      handleFuelDataChange(
                        type.sub_dispencer_id._id,
                        "start",
                        e.target.value
                      )
                    }
                  />
                  <TextField
                    label="End Metering"
                    fullWidth
                    variant="outlined"
                    onChange={(e) =>
                      handleFuelDataChange(
                        type.sub_dispencer_id?._id,
                        "end",
                        e.target.value
                      )
                    }
                  />
                  <TextField
                    label="Fuel Qty"
                    fullWidth
                    variant="outlined"
                    disabled
                    value={fuelData[type.sub_dispencer_id._id]?.qty || ""}
                  />
                  <TextField
                    label="Sale Amount"
                    fullWidth
                    variant="outlined"
                    disabled
                    value={fuelData[type.sub_dispencer_id._id]?.total || ""}
                  />
                </Box>
              ))}
              <Divider
                sx={{ my: 1, borderWidth: "1px", borderColor: "primary.main" }}
              />
            </Box>
          ))}
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="Cash"
                fullWidth
                variant="outlined"
                value={formik.values.cash}
                onChange={formik.handleChange}
                name="cash"
                error={formik.touched.cash && Boolean(formik.errors.cash)}
                helperText={formik.touched.cash && formik.errors.cash}
              />
              <TextField
                label="Bank"
                fullWidth
                variant="outlined"
                value={formik.values.bank}
                onChange={formik.handleChange}
                name="bank"
                error={formik.touched.bank && Boolean(formik.errors.bank)}
                helperText={formik.touched.bank && formik.errors.bank}
              />
              <TextField
                label="HP Card"
                fullWidth
                variant="outlined"
                value={formik.values.hpCard}
                onChange={formik.handleChange}
                name="hpCard"
                error={formik.touched.hpCard && Boolean(formik.errors.hpCard)}
                helperText={formik.touched.hpCard && formik.errors.hpCard}
              />
            </Box>
            <TextField
              label="Total Sale Amount"
              fullWidth
              variant="outlined"
              value={formik.values.totalSaleAmount}
              onChange={formik.handleChange}
              name="totalSaleAmount"
              error={
                formik.touched.totalSaleAmount &&
                Boolean(formik.errors.totalSaleAmount)
              }
              helperText={
                formik.touched.totalSaleAmount && formik.errors.totalSaleAmount
              }
              sx={{ mt: 2 }}
            />
            <DialogActions>
              <Button color="error" onClick={handleClose}>
                Cancel
              </Button>
              <Button color="success" type="submit">
                Save
              </Button>
            </DialogActions>
          </form>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
