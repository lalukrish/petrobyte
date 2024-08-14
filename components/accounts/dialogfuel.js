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
  Grid,
  InputAdornment,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import axios from "axios";
import moment from "moment";
import * as Yup from "yup";
import { useFormik } from "formik";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import dayjs from "dayjs";

require("dotenv").config();

export default function FuelNew({ close, setAlert }) {
  const [dispencers, setDispencers] = useState([]);
  const [selectedDispencers, setSelectedDispencers] = useState([
    { name: "", subRows: [] },
  ]);
  const [fuelData, setFuelData] = useState({});
  const [date, setDate] = useState();
  // const date = moment().format("DD/MM/YYYY");

  // Validation Schema
  const validationSchema = Yup.object().shape({
    cash: Yup.number().required("Cash is required"),
    bank: Yup.number().required("Bank is required"),
    hpCard: Yup.number().required("HP Card is required"),
    totalSaleAmount: Yup.number().required("Total Sale Amount is required"),
    // fuelData: Yup.object().shape(
    //   selectedDispencers.reduce((acc, dispencer) => {
    //     dispencer.subRows.forEach((type) => {
    //       acc[type.sub_dispencer_id._id] = Yup.object().shape({
    //         //   start: Yup.number().required("Start Metering is required"),
    //         end: Yup.number()
    //           .required("End Metering is required")
    //           .test(
    //             "is-greater-than-start",
    //             "End Metering must be greater than Start Metering",
    //             function (value) {
    //               const { start } = this.parent;
    //               return value > start;
    //             }
    //           ),
    //       });
    //     });
    //     return acc;
    //   }, {})
    // ),
  });

  const formik = useFormik({
    initialValues: {
      cash: "",
      bank: "",
      hpCard: "",
      totalSaleAmount: "",
      fuelData: selectedDispencers.reduce((acc, dispencer) => {
        dispencer.subRows.forEach((type) => {
          acc[type.sub_dispencer_id._id] = { start: "", end: "" };
        });
        return acc;
      }, {}),
    },
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
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
          end: row.live_reading,
          fuelPrice: row.sub_dispencer_id.fuel_id.fuel_price,
        };
        return acc;
      }, {});

      setFuelData((prev) => ({
        ...prev,
        ...initialFuelData,
      }));

      formik.setFieldValue(
        "fuelData",
        subRows.reduce((acc, row) => {
          acc[row.sub_dispencer_id._id] = {
            start: row.live_reading,
            end: row.live_reading,
          };
          return acc;
        }, {})
      );

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

        // Trigger Formik field update
        formik.setFieldValue(`fuelData.${type}.end`, value);
        formik.setFieldValue(`fuelData.${type}.qty`, qty);
        formik.setFieldValue(`fuelData.${type}.total`, qty * fuelPrice);
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

  // Handle Close Function
  const handleClose = () => {
    close(); // Call the close function passed as a prop
  };

  return (
    <Dialog
      maxWidth="md"
      fullWidth
      open={true}
      onClose={handleClose}
      PaperProps={{
        sx: {
          minHeight: "80vh",
          maxHeight: "80vh",
        },
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Fuel Entry</DialogTitle>
        <Divider />
        <DialogContent>
          <Typography variant="h6">Fuel Data</Typography>
          <Grid>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Date"
                  value={date ? dayjs(date, "DD/MM/YYYY") : null}
                  sx={{
                    width: "100%",
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
                    setDate(dayjs(date).format("DD/MM/YYYY"));
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Stack spacing={2} sx={{ mt: 2 }}>
            {selectedDispencers.map((dispencer, index) => (
              <Box key={index}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <FormControl sx={{ flex: 1 }}>
                    <InputLabel>Dispenser</InputLabel>
                    <Select
                      value={dispencer.name}
                      onChange={(e) =>
                        handleDispencerChange(index, e.target.value)
                      }
                      required
                    >
                      {getAvailableDispensers(index).map((disp) => (
                        <MenuItem key={disp._id} value={disp.dispencer_name}>
                          {disp.dispencer_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <IconButton onClick={() => handleRemoveDispencer(index)}>
                    <Remove />
                  </IconButton>
                </Stack>
                <Stack spacing={1} mt={2}>
                  {dispencer.subRows.map((type, typeIndex) => (
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      key={typeIndex}
                    >
                      <Typography>
                        {type.sub_dispencer_id.sub_dispencer}
                      </Typography>
                      {/* <TextField
                        label="Fuel Type"
                        value={type?.sub_dispencer_id?.fuel_id?.fuel_type}
                        disabled
                      /> */}
                      <TextField
                        label="Start"
                        type="number"
                        value={fuelData[type.sub_dispencer_id._id]?.start || ""}
                        onChange={(e) =>
                          handleFuelDataChange(
                            type.sub_dispencer_id._id,
                            "start",
                            e.target.value
                          )
                        }
                        error={Boolean(
                          formik.touched?.fuelData?.[type.sub_dispencer_id._id]
                            ?.start &&
                            formik.errors?.fuelData?.[type.sub_dispencer_id._id]
                              ?.start
                        )}
                        helperText={
                          formik.touched?.fuelData?.[type.sub_dispencer_id._id]
                            ?.start &&
                          formik.errors?.fuelData?.[type.sub_dispencer_id._id]
                            ?.start
                        }
                      />
                      <TextField
                        label="End"
                        type="number"
                        value={fuelData[type.sub_dispencer_id._id]?.end || ""}
                        onChange={(e) =>
                          handleFuelDataChange(
                            type.sub_dispencer_id._id,
                            "end",
                            e.target.value
                          )
                        }
                        error={Boolean(
                          formik.touched?.fuelData?.[type.sub_dispencer_id._id]
                            ?.end &&
                            formik.errors?.fuelData?.[type.sub_dispencer_id._id]
                              ?.end
                        )}
                        helperText={
                          formik.touched?.fuelData?.[type.sub_dispencer_id._id]
                            ?.end &&
                          formik.errors?.fuelData?.[type.sub_dispencer_id._id]
                            ?.end
                        }
                      />
                      <TextField
                        label="Qty"
                        type="number"
                        value={fuelData[type.sub_dispencer_id._id]?.qty || ""}
                        disabled
                      />
                      <TextField
                        label="Amount"
                        type="number"
                        value={fuelData[type.sub_dispencer_id._id]?.total || ""}
                        disabled
                      />
                    </Stack>
                  ))}
                </Stack>
              </Box>
            ))}
            <Button
              variant="outlined"
              onClick={handleAddDispencer}
              startIcon={<Add />}
            >
              Add Dispenser
            </Button>
          </Stack>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6">Cash Management</Typography>
          <Stack spacing={2}>
            <TextField
              label="Cash in Hand"
              type="number"
              value={formik.values.cash}
              onChange={formik.handleChange}
              name="cash"
              error={Boolean(formik.touched.cash && formik.errors.cash)}
              helperText={formik.touched.cash && formik.errors.cash}
            />
            <TextField
              label="Bank"
              type="number"
              value={formik.values.bank}
              onChange={formik.handleChange}
              name="bank"
              error={Boolean(formik.touched.bank && formik.errors.bank)}
              helperText={formik.touched.bank && formik.errors.bank}
            />
            <TextField
              label="HP Card"
              type="number"
              value={formik.values.hpCard}
              onChange={formik.handleChange}
              name="hpCard"
              error={Boolean(formik.touched.hpCard && formik.errors.hpCard)}
              helperText={formik.touched.hpCard && formik.errors.hpCard}
            />
            <TextField
              label="Total Sale Amount"
              type="number"
              value={formik.values.totalSaleAmount}
              disabled
              name="totalSaleAmount"
              error={Boolean(
                formik.touched.totalSaleAmount && formik.errors.totalSaleAmount
              )}
              helperText={
                formik.touched.totalSaleAmount && formik.errors.totalSaleAmount
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
