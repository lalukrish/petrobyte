import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { PetrobyteContext } from "@/context/context";
import axios from "axios";
import moment from "moment";
require("dotenv").config();

export default function CreditNew({ close }) {
  const [name, setName] = React.useState("");
  const [vehicleNo, setVehicleNo] = React.useState("");
  const [fuel, setFuel] = React.useState("");
  const [fuelQuantity, setFuelQuantity] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [amountType, setAmountType] = React.useState("");
  const [staff, setStaff] = React.useState("");
  const [ccLists, setCcLists] = React.useState("");
  const [fuelList, setFuelList] = React.useState("");
  const [employeeList, setEmployeeList] = React.useState("");

  const datePart = moment().format("DD-MM-YYYY");

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  const handleClose = () => {
    close();
  };
  const staffs = ["aslam", "abhi", "lallu"];
  const fuels = ["Petrol", "Diesel"];

  const handelSave = () => {
    let creditData = {
      date: datePart,
      cc_id: "6673c73c41ae9d70e864abbb",
      vehicle_no: vehicleNo,
      fuel_type: "66669c13c600bf08974a5303",
      fuel_quantity: fuelQuantity,
      amount: amount,
      amount_type: amountType,
      emp_id: "66697b8614979931c7d323a4",
      status: "",
    };

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/creditHistory/POSTCreditHistory`
      )
      .then((responce) => alert(responce.data.message))
      .catch(() => alert(`Something wnet wrong, Please Try After Some Time`));

    // if(amountType=='Credit'){

    //   let putCreditData={
    //     id:"6673c73c41ae9d70e864abbb",
    //     credit_amount:oldAmount+amount
    //   }

    //   axios.put(`${process.env.NEXT_PUBLIC_API_URL}/creditcustomer/PUTCC`,putCreditData).then((responce) => alert(responce.data.message))
    //   .catch(() => alert(`Something wnet wrong, Please Try After Some Time`));
    // }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">New Credit</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ width: "400px", padding: "5px" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Name</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="Name"
              // onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            autoFocus
            id="outlined-basic"
            label="Vehicle Number"
            variant="outlined"
            onChange={(e) => setVehicleNo(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Fuel</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="Fuel"
              // onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <TextField
            autoFocus
            id="outlined-basic"
            label="Fuel Quantity"
            variant="outlined"
            onChange={(e) => setFuelQuantity(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Amount"
            variant="outlined"
            onChange={(e) => setAmount(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Amount Type"
            variant="outlined"
            onChange={(e) => setAmountType(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Employee</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="Employee"
              // onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handelSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
