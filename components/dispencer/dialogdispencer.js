import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { MenuItem, Select, Stack, TextField } from "@mui/material";
import axios from "axios";

export default function DispencerNew({ close, refreshDispencer, edit }) {
  const [dispencer, setDispencer] = React.useState(edit ? edit.dispencer : "");
  const [fuel, setFuel] = React.useState("");
  const [live_reading, setLiveReading] = React.useState(
    edit ? edit.live_reading : ""
  );

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [fuels, setAllfuels] = React.useState([]);
  const [optionsLoaded, setOptionsLoaded] = React.useState(false);

  React.useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/fuelPrice/GETAllFuel`)
      .then((response) => {
        setAllfuels(response.data.message);
        setOptionsLoaded(true);

        // Set the default fuel if editing
        if (edit) {
          //console.log("Edit Fuel ID:", edit.fuel_id._id);
          response.data.message.forEach((fuel) => {
            //     console.log("Fuel ID:", fuel._id);
          });

          const defaultFuel = response.data.message.find(
            (fuel) => fuel._id === edit.fuel_id._id
          );
          if (defaultFuel) {
            setFuel(defaultFuel._id);
          }
        }
      })
      .catch((err) => console.log(err.message));
  }, [edit]);

  const handleClose = () => {
    close();
  };

  const handleSave = () => {
    let newDispencer = {
      dispencer: dispencer,
      live_reading: live_reading,
      fuel_id: fuel,
    };

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/dispencer/POSTDispencer`,
        newDispencer
      )
      .then((response) => {
        alert(response.data.message);
        refreshDispencer();
        close();
      })
      .catch(() => {
        alert(`Something went wrong`);
        close();
      });
  };

  //edit dispencer
  const updateDispencer = () => {
    let dispencerData = {
      id: edit._id,
      fuel_id: fuel,
      dispencer: dispencer,
      live_reading: live_reading,
    };

    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/dispencer/PUTDispencer`,
        dispencerData
      )
      .then((response) => {
        alert(response.data.message);
        refreshDispencer();
        close();
      })
      .catch((err) => {
        alert(err);
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
        {edit ? "Edit Dispencer" : "New Dispencer"}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ width: "400px", padding: "5px" }}>
          <TextField
            autoFocus
            id="outlined-basic"
            label="Dispencer"
            value={dispencer}
            variant="outlined"
            onChange={(event) => setDispencer(event.target.value)}
          />
          <Select
            value={fuel}
            onChange={(event) => setFuel(event.target.value)}
            displayEmpty
            variant="outlined"
          >
            <MenuItem value="" disabled>
              Select Fuel
            </MenuItem>
            {fuels.map((fuel) => (
              <MenuItem key={fuel._id} value={fuel._id}>
                {fuel.fuel_name}
              </MenuItem>
            ))}
          </Select>
          <TextField
            id="outlined-basic"
            label="Live Metering"
            value={live_reading}
            variant="outlined"
            onChange={(event) => setLiveReading(event.target.value)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose}>
          Cancel
        </Button>
        <Button color="success" onClick={edit ? updateDispencer : handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
