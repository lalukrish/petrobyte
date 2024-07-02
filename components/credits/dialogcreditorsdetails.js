import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Stack, TextField } from "@mui/material";
import axios from "axios";

export default function CreditorsDetailsNew({ close, refresh, data }) {
  const [name, setName] = React.useState(data?.cc_name || "");
  const [address, setAddress] = React.useState(data?.cc_address || "");
  const [contact, setContact] = React.useState(data?.cc_contact_no || "");
  const [email, setEmail] = React.useState(data?.cc_email || "");
  const [creditAmount, setCreditAmount] = React.useState(data?.credit_amount || "");

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    close();
  };

  const handleSave = () => {
    const newCreditor = {
      cc_name: name,
      cc_contact_no: contact,
      cc_address: address,
      cc_email: email,
      credit_amount: creditAmount ? creditAmount : 0,
      cc_status: "",
    };

    const updateCreditor = {
      id:data._id,
      cc_name: name,
      cc_contact_no: contact,
      cc_address: address,
      cc_email: email,
      credit_amount: data.credit_amount,
      cc_status: "",
    };

    const request = data?._id
      ? axios.put(`${process.env.NEXT_PUBLIC_API_URL}/creditcustomer/PUTCC`, updateCreditor)
      : axios.post(`${process.env.NEXT_PUBLIC_API_URL}/creditcustomer/POSTCC`, newCreditor);

    request
      .then((response) => {
        alert(response.data.message);
        refresh();
        close();
      })
      .catch(() => {
        alert(`Something went wrong`);
        close();
      });
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={true}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {data ? "Edit Creditor's Details" : "New Creditor's Details"}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ width: "400px", padding: "5px" }}>
          <TextField
            autoFocus
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            label="Address"
            variant="outlined"
            value={address}
            onChange={(event) => {
              setAddress(event.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            label="Contact"
            variant="outlined"
            value={contact}
            onChange={(event) => {
              setContact(event.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          {/* <TextField
            id="outlined-basic"
            label="Amount"
            variant="outlined"
            value={creditAmount}
            onChange={(event) => {
              setCreditAmount(event.target.value);
            }}
          /> */}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose}>Cancel</Button>
        <Button color="success" onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
