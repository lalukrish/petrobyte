import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Autocomplete, Stack, TextField } from "@mui/material";
import { PetrobyteContext } from "@/context/context";
import axios from "axios";

export default function CreditNew({ close }) {
  const [name, setName] = React.useState("");
  const [credit, setCredit] = React.useState("");
  const [staff, setStaff] = React.useState("");
  const [fuel, setFuel] = React.useState("");

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  const handleClose = () => {
    close();
  };
  const staffs= ["aslam","abhi","lallu"]
  const fuels= ["Petrol","Diesel"]


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
          <TextField
            autoFocus
            id="outlined-basic"
            label="Name"
            variant="outlined"
          />
          <TextField id="outlined-basic" label="Credit" variant="outlined" />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={staffs}
            sx={{ width: 390 }}
            renderInput={(params) => <TextField {...params} label="Employee" />}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={fuels}
            sx={{ width: 390 }}
            renderInput={(params) => <TextField {...params} label="Fuel" />}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
