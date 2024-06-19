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

export default function DispencerNew({ close,refreshDispencer,edit }) {
  const [dispencer, setDispencer] = React.useState("");
  const [fuel, setFuel] = React.useState("");
  const [live_reading, setLive_reading] = React.useState("");

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  const handleClose = () => {
    close();
  };

  const handleSave = () => {
    let add = {
      dispencer: dispencer,
      live_reading: live_reading,
      fuel_id: "66669c13c600bf08974a5303",
    };
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/dispencer/POSTDispencer`, add)
      .then((response) => {
        alert(response.data.message);
        refreshDispencer()
      });
    close();
    console.log(dispencer, live_reading);
    // setRefreshCredit(!refreshCredit)
  };
  //edit dispencer

  const updateDispencer = () => {
    let dispencerData = {
      _id: edit._id,
      dispencer: dispencer ? dispencer : edit.dispencer,
      live_reading: live_reading ? live_reading : edit.live_reading,
    };

    axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/dispencer/PUTDispencer`, dispencerData)
      .then((responce) => {
        alert(responce.data.message);
        refreshDispencer();
        close();
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">New Dispencer</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ width: "400px", padding: "5px" }}>
          <TextField
            autoFocus
            id="outlined-basic"
            label="Dispencer"
            value={dispencer ? dispencer : edit?.dispencer}
            variant="outlined"
            onChange={(event) => {
              edit.dispencer = null;
              setDispencer(event.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            label="Fuel"
            variant="outlined"
            onChange={(event) => {
              setFuel(event.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            label="Live Metering"
            value={live_reading ? live_reading : edit?.live_reading}
            variant="outlined"
            onChange={(event) => {
              setLive_reading(event.target.value);
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose}>Cancel</Button>
        <Button color="success" onClick={edit.dispencer ? updateDispencer : handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
