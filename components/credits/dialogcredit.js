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

export default function CreditNew({ close, refresh, data, currentAmount }) {
  const [ccName, setCcName] = React.useState(data ? data.cc_id?._id : "");
  const [vehicleNo, setVehicleNo] = React.useState(data ? data.vehicle_no : "");
  const [fuel, setFuel] = React.useState(data ? data.fuel_type?._id : "");
  const [fuelQuantity, setFuelQuantity] = React.useState(
    data ? data.fuel_quantity : ""
  );
  const [amount, setAmount] = React.useState(data ? data.amount : "");
  const [amountType, setAmountType] = React.useState(
    data ? data.amount_type : ""
  );
  const [staff, setStaff] = React.useState(data ? data.emp_id?._id : "");
  const [ccLists, setCcLists] = React.useState([]);
  const [fuelList, setFuelList] = React.useState([]);
  const [employeeList, setEmployeeList] = React.useState([]);

  const fetchFuels = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/fuelPrice/GETAllFuel`)
      .then((response) => {
        setFuelList(response.data.message);
        // setOptionsLoaded(true);
      })
      .catch((err) => console.log(err.message));
  };

  const fetchCCs = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/creditcustomer/GETAllCC`)
      .then((response) => {
        setCcLists(response.data.message.CCs);
        // setOptionsLoaded(true);
      })
      .catch((err) => console.log(err.message));
  };

  const fetchEmployee = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/employee/GETAllEmployee`)
      .then((response) => {
        setEmployeeList(response.data.message.employees);
        // setOptionsLoaded(true);
      })
      .catch((err) => console.log(err.message));
  };

  React.useEffect(() => {
    console.log(data);
    fetchCCs();
    fetchFuels();
    fetchEmployee();
  }, []);

  const datePart = moment().format("DD-MM-YYYY");

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  const handleClose = () => {
    close();
  };

  const handelSave = () => {
    let creditData = {
      date: datePart,
      cc_id: ccName,
      vehicle_no: vehicleNo,
      fuel_type: fuel ? fuel : null,
      fuel_quantity: fuelQuantity,
      amount: amount,
      amount_type: amountType,
      emp_id: staff ? staff : null,
      status: "",
    };

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/creditHistory/POSTCreditHistory`,
        creditData
      )
      .then((responce) => alert(responce.data.message))
      .catch(() => alert(`Something wnet wrong, Please Try After Some Time`));

    if (amountType == "Credit") {
      let totalUpdatedAmount = parseInt(currentAmount) + parseInt(amount);

      let putCreditData = {
        id: ccName._id,
        credit_amount: parseInt(totalUpdatedAmount),
      };

      axios
        .put(
          `${process.env.NEXT_PUBLIC_API_URL}/creditcustomer/updateCreditAmount`,
          putCreditData
        )
        .then((responce) => alert(responce.data.message))
        .catch(() => alert(`Something wnet wrong, Please Try After Some Time`));
    }

    if (amountType == "Debit") {
      let totalUpdatedAmount = parseInt(currentAmount) - parseInt(amount);

      let putCreditData = {
        id: ccName._id,
        credit_amount: parseInt(totalUpdatedAmount),
      };

      axios
        .put(
          `${process.env.NEXT_PUBLIC_API_URL}/creditcustomer/updateCreditAmount`,
          putCreditData
        )
        .then((responce) => alert(responce.data.message))
        .catch(() => alert(`Something wnet wrong, Please Try After Some Time`));
    }
    refresh()
    close();
  };

  const handleUpdate = async () => {
    let updateData = {
      id: data._id,
      date: datePart,
      cc_id: ccName,
      vehicle_no: vehicleNo,
      fuel_type: fuel ? fuel : null,
      fuel_quantity: fuelQuantity,
      amount: amount,
      amount_type: amountType,
      emp_id: staff ? staff : null,
      status: "",
    };

    console.log("data-----",data)

    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/creditHistory/PUTCreditHistory`,
        updateData
      )
      .then((responce) => alert(responce.data.message))
      .catch(() => alert(`Something went wrong, At update CreditHistory`));

    if (amountType == "Credit") {

      let totalUpdatedAmount = data.amount;

      if (data.amount > amount) {
        let difference = parseInt(data.amount) - parseInt(amount);
        totalUpdatedAmount = parseInt(currentAmount) - parseInt(difference);
      }
      if (data.amount < amount) {
        let difference = parseInt(amount) - parseInt(data.amount);
        totalUpdatedAmount = parseInt(currentAmount) + parseInt(difference);
      }

      console.log("amount to save---",totalUpdatedAmount)
      let putCreditData = {
        id: data.cc_id._id,
        credit_amount: parseInt(totalUpdatedAmount),
      };
      console.log(putCreditData)
      axios
        .put(
          `${process.env.NEXT_PUBLIC_API_URL}/creditcustomer/updateCreditAmount`,
          putCreditData
        )
        .then((responce) => alert(responce.data.message))
        .catch(() => alert(`Something went wrong, at update amount in credit`));
    }

    if (amountType == "Debit") {
      let totalUpdatedAmount = data.amount;

      if (data.amount > amount) {
        let difference = parseInt(data.amount) - parseInt(amount);
        totalUpdatedAmount = parseInt(currentAmount) + parseInt(difference);
      }
      if (data.amount < amount) {
        let difference = parseInt(amount) - parseInt(data.amount);
        totalUpdatedAmount = parseInt(currentAmount) - parseInt(difference);
      }

      let putCreditData = {
        id: data.cc_id._id,
        credit_amount: parseInt(totalUpdatedAmount),
      };

      axios
        .put(
          `${process.env.NEXT_PUBLIC_API_URL}/creditcustomer/updateCreditAmount`,
          putCreditData
        )
        .then((responce) => alert(responce.data.message))
        .catch(() => alert(`Something went wrong, at update amount in debit`));
    }
    refresh()
    close();
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {data ? `Edit Credit` : `New Credit`}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ width: "400px", padding: "5px" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Name</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={ccName}
              label="Name"
              onChange={(event) => setCcName(event.target.value)}
            >
              {ccLists.map((cc) => (
                <MenuItem key={cc._id} value={cc._id}>
                  {cc.cc_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Amount Type</InputLabel>
            <Select
              disabled={!!data}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={amountType}
              label="Amount Type"
              onChange={(event) => setAmountType(event.target.value)}
            >
              <MenuItem value="Credit">Credit</MenuItem>
              <MenuItem value="Debit">Debit</MenuItem>
            </Select>
          </FormControl>
          <TextField
          disabled={amountType=="Debit"}
            autoFocus
            id="outlined-basic"
            label="Vehicle Number"
            variant="outlined"
            value={vehicleNo}
            onChange={(e) => setVehicleNo(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Fuel</InputLabel>
            <Select
            disabled={amountType=="Debit"}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={fuel}
              label="Fuel"
              onChange={(event) => setFuel(event.target.value)}
            >
              {fuelList.map((fuel) => (
                <MenuItem key={fuel._id} value={fuel._id}>
                  {fuel.fuel_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            disabled={amountType=="Debit"}
            id="outlined-basic"
            label="Fuel Quantity"
            variant="outlined"
            value={fuelQuantity}
            onChange={(e) => setFuelQuantity(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Amount"
            variant="outlined"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Employee</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={staff}
              label="Employee"
              onChange={(event) => setStaff(event.target.value)}
            >
              {employeeList.map((employee) => (
                <MenuItem key={employee._id} value={employee._id}>
                  {employee.emp_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose}>
          Cancel
        </Button>
        <Button color="success" onClick={data ? handleUpdate : handelSave}>
          {data ? `Save Changes` : `Save`}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
