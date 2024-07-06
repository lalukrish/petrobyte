import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Grid,
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  OutlinedInput,
  Chip,
  Autocomplete,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import axios from "axios";
import moment from "moment";
require("dotenv").config();

function getStyles(name, selectedFuelTypes, theme) {
  return {
    fontWeight:
      selectedFuelTypes.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function FuelNew({ close, editTest }) {
  const [allEmployee, setAllEmployee] = useState([]);
  const [dispencers, setDispencers] = useState([]);
  const [subDispencers, setSubDispencers] = useState([]);
  const theme = useTheme();
  const handleClose = () => close();
  const date = moment().format("DD-MM-YYYY");
  const [fromtime, setfromtime] = useState("");
  const [totime, settotime] = useState("");
  const [dispencer, setdispencer] = useState("");
  const [fueltype, setfueltype] = useState([]);
  const [fuelData, setFuelData] = useState({});
  const [cash, setCash] = useState("");
  const [bank, setBank] = useState("");
  const [hpCard, setHpCard] = useState("");
  const [employee, setEmployee] = useState("");
  const todayStartOfTheDay = dayjs().startOf("day");
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const fetchEmployee = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/employee/GETAllEmployee`)
      .then((response) => setAllEmployee(response.data.message.employees));
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  useEffect(() => {
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

    fetchDispensers();
  }, []);

  useEffect(() => {
    if (dispencer) {
      const fetchSubDispencers = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/dispencer/GETSubDispencer?name=${dispencer}`
          );
          setSubDispencers(response.data.message);
        } catch (error) {
          console.error("Error fetching sub dispensers:", error);
        }
      };

      fetchSubDispencers();
    }
  }, [dispencer]);

  const handleSave = () => {
    const fuelDetails = fueltype.map((type) => ({
      date: date,
      emp_id: employee,
      emp_from_time: fromtime,
      emp_to_time: totime,
      dispencer: dispencer,
      fueltype: type,
      fuel_start_reading: fuelData[type]?.start || "",
      fuel_end_reading: fuelData[type]?.end || "",
      fuel_qty: fuelData[type]?.qty || "",
      amount: fuelData[type]?.total || "",
      cash_inhand: cash,
      cash_bank: bank,
    }));

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/fuelAccounts/POSTFuelAccount`,
        fuelDetails
      )
      .then((response) => {
        alert(response.data.message);
      });
  };

  const handleFuelTypeChange = (event) => {
    const {
      target: { value },
    } = event;
    const newFuelTypes = typeof value === "string" ? value.split(",") : value;
    setfueltype(newFuelTypes);
  };

  const handleFuelDataChange = (type, field, value) => {
    setFuelData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }));
  };

  const handleDeleteFuelType = (typeToDelete) => () => {
    setfueltype((prevFuelTypes) =>
      prevFuelTypes.filter((type) => type !== typeToDelete)
    );
    setFuelData((prevFuelData) => {
      const { [typeToDelete]: _, ...rest } = prevFuelData;
      return rest;
    });
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
          <FormControl fullWidth>
            <InputLabel id="employee-label">Employee</InputLabel>
            <Select
              labelId="employee-label"
              id="employee-select"
              label="Employee"
              value={employee}
              onChange={(event) => setEmployee(event.target.value)}
            >
              {allEmployee.map((option, index) => (
                <MenuItem key={index} value={option._id}>
                  {option.emp_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container spacing={2} sx={{ display: "flex" }}>
              <Grid item xs={6}>
                <TimePicker
                  label="From"
                  defaultValue={todayStartOfTheDay}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      onChange={(event) => setfromtime(event.target.value)}
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <TimePicker
                  label="To"
                  defaultValue={todayStartOfTheDay}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      onChange={(event) => settotime(event.target.value)}
                      fullWidth
                    />
                  )}
                />
              </Grid>
            </Grid>
          </LocalizationProvider>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth sx={{ height: "100%" }}>
                  <InputLabel id="dispencer-label">Dispencer</InputLabel>
                  <Select
                    labelId="dispencer-label"
                    id="dispencer-select"
                    value={dispencer}
                    label="Dispencer"
                    onChange={(event) => setdispencer(event.target.value)}
                  >
                    {dispencers.map((disp) => (
                      <MenuItem key={disp._id} value={disp.dispencer_name}>
                        {disp.dispencer_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth sx={{ height: "100%" }}>
                  <InputLabel id="fuel-type-label">Sub Name</InputLabel>
                  <Select
                    labelId="fuel-type-label"
                    id="fuel-type-select"
                    multiple
                    value={fueltype}
                    onChange={handleFuelTypeChange}
                    input={
                      <OutlinedInput
                        id="select-multiple-chip"
                        label="Fuel Type"
                      />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={value}
                            onDelete={handleDeleteFuelType(value)}
                          />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {subDispencers.map((name) => (
                      <MenuItem
                        key={name?._id}
                        value={name?.sub_dispencer}
                        style={getStyles(name, fueltype, theme)}
                      >
                        {name?.sub_dispencer}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          {fueltype.map((type) => (
            <Box
              key={type}
              sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}
            >
              <Typography>{type}</Typography>
              <TextField
                label="Start Metering"
                fullWidth
                variant="outlined"
                onChange={(e) =>
                  handleFuelDataChange(type, "start", e.target.value)
                }
              />
              <TextField
                label="End Metering"
                fullWidth
                variant="outlined"
                onChange={(e) =>
                  handleFuelDataChange(type, "end", e.target.value)
                }
              />
              <TextField
                label="Fuel Qty"
                fullWidth
                variant="outlined"
                onChange={(e) =>
                  handleFuelDataChange(type, "qty", e.target.value)
                }
              />
              <TextField
                label="Sale Amount"
                fullWidth
                variant="outlined"
                onChange={(e) =>
                  handleFuelDataChange(type, "total", e.target.value)
                }
              />
            </Box>
          ))}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
            <TextField
              label="Cash"
              fullWidth
              variant="outlined"
              value={cash}
              onChange={(e) => setCash(e.target.value)}
            />
            <TextField
              label="Bank"
              fullWidth
              variant="outlined"
              value={bank}
              onChange={(e) => setBank(e.target.value)}
            />
            <TextField
              label="HP Card"
              fullWidth
              variant="outlined"
              value={hpCard}
              onChange={(e) => setHpCard(e.target.value)}
            />
          </Box>
          <TextField
            id=""
            disabled
            label="Total Sale Amount"
            fullWidth
            variant="outlined"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose}>
          Cancel
        </Button>
        <Button color="success" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
