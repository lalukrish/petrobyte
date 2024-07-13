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
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import axios from "axios";
import moment from "moment";
require("dotenv").config();
export default function FuelNew({ close, editTest }) {
  const [allEmployee, setAllEmployee] = useState([]);
  const [dispencers, setDispencers] = useState([]);
  const [selectedDispencers, setSelectedDispencers] = useState([
    { name: "", subRows: [] },
  ]);
  const theme = useTheme();
  const handleClose = () => close();
  const date = moment().format("DD/MM/YYYY");
  const [fuelData, setFuelData] = useState({});
  const [cash, setCash] = useState("");
  const [bank, setBank] = useState("");
  const [hpCard, setHpCard] = useState("");
  const [totalSaleAmount, setTotalSaleAmount] = useState("");

  useEffect(() => {
    fetchDispensers();
  }, []);

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
      return response.data.message;
    } catch (error) {
      console.error("Error fetching sub rows:", error);
      return [];
    }
  };

  const handleSave = () => {
    const fuelDetails = selectedDispencers.flatMap((dispencer) =>
      (dispencer.subRows || []).map((type) => ({
        date: date,
        dispencer_name: dispencer.name,
        sub_dispencer_id: type.sub_dispencer_id._id,
        fuel_start_reading: fuelData[type.sub_dispencer_id._id]?.start || "",
        fuel_end_reading: fuelData[type.sub_dispencer_id._id]?.end || "",
        fuel_qty: fuelData[type.sub_dispencer_id._id]?.qty || "",
        amount: fuelData[type.sub_dispencer_id._id]?.total || "",
        fuel_price_selected: type.sub_dispencer_id.fuel_id?.fuel_price,
      }))
    );
    console.log("fuelDetails", fuelDetails);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/fuelAccounts/POSTFuelAccount`,
        fuelDetails
      )
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        console.error("Error posting fuel details:", error);
      });

    const cashDetails = {
      date: date,
      total_amount: totalSaleAmount,
      cash_inhand: cash,
      cash_bank: bank,
      cash_other: hpCard,
    };

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/cashManagement/POSTCashDetails`,
        cashDetails
      )
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        console.error("Error posting cash details:", error);
      });
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


  const handleAddDispencer = () => {
    setSelectedDispencers([...selectedDispencers, { name: "", subRows: [] }]);
  };

  const handleDispencerChange = async (index, value) => {
    const newSelectedDispencers = [...selectedDispencers];
    newSelectedDispencers[index].name = value;
    newSelectedDispencers[index].subRows = await fetchSubRows(value);
    console.log("newSelectedDispencers", newSelectedDispencers);
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
                        type.sub_dispencer_id._id,
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
                    value={parseFloat(fuelData.end)-parseFloat(type.live_reading)}
                    onChange={(e) =>
                      handleFuelDataChange(

                        type.sub_dispencer_id._id,
                        "qty",
                        e.target.value
                      )
                    }
                  />
                  <TextField
                    label="Sale Amount"
                    fullWidth
                    variant="outlined"
                    disabled
                    onChange={(e) =>
                      handleFuelDataChange(
                        type.sub_dispencer_id._id,
                        "total",
                        e.target.value
                      )
                    }
                  />
                </Box>
              ))}
              <Divider
                sx={{ my: 1, borderWidth: 0.5, borderStyle: "dashed" }}
              />
            </Box>
          ))}
          {/* <Divider
                sx={{ my: 1, borderWidth: 0.5, borderStyle: "dashed" }}
              />
            </Box>
          ))} */}
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
            label="Total Sale Amount"
            fullWidth
            variant="outlined"
            value={totalSaleAmount}
            onChange={(e) => setTotalSaleAmount(e.target.value)}
            sx={{ mt: 2 }}
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
