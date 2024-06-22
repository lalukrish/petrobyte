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

export default function CreditorsDetailsNew({ close, refresh }) {
  // const { refreshCredit, setRefreshCredit } = React.useContext(PetrobyteContext);

  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [creditAmount, setCreditAmount] = React.useState("");

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  const handleClose = () => {
    close();
  };

  const handleSave = () => {
    let newCreditor = {
      cc_name: name,
      cc_contact_no: contact,
      cc_address: address,
      cc_email: email,
      credit_amount: creditAmount ? creditAmount : 0,
      cc_status: "",
    };

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/creditcustomer/POSTCC`,
        newCreditor
      )
      .then((response) => {
        alert(response.data.message);
        refresh();
        close();
      })
      .catch(() => {
        alert(`Something went wrog`);
        close();
      });
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        New Creditor's Details
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ width: "400px", padding: "5px" }}>
          <TextField
            autoFocus
            id="outlined-basic"
            label="Name"
            variant="outlined"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            label="Address"
            variant="outlined"
            onChange={(event) => {
              setAddress(event.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            label="Contact"
            variant="outlined"
            onChange={(event) => {
              setContact(event.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            label="Amount"
            variant="outlined"
            onChange={(event) => {
              setCreditAmount(event.target.value);
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose}>Cancel</Button>
        <Button color="success" onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
