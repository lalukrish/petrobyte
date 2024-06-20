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
  const [dispencer, setDispencer] = React.useState(edit?.dispencer || "");
  const [fuel, setFuel] = React.useState(edit?.fuel_id || "");
  const [live_reading, setLive_reading] = React.useState(
    edit?.live_reading || ""
  );

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [fuels, setAllfuels] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/fuelPrice/GETAllFuel`)
      .then((response) => setAllfuels(response.data.message))
      .catch((err) => console.log(err.message));
  }, []);

  const handleClose = () => {
    close();
  };

  const handleSave = () => {
    const add = {
      dispencer,
      live_reading,
      fuel_id: fuel,
    };

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/dispencer/POSTDispencer`, add)
      .then((response) => {
        alert(response.data.message);
        refreshDispencer();
      })
      .catch((err) => alert(err));
    close();
  };

  const updateDispencer = () => {
    const dispencerData = {
      _id: edit._id,
      dispencer,
      live_reading,
      fuel_id: fuel,
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
      .catch((err) => alert(err));
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={true}
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
            value={dispencer}
            variant="outlined"
            onChange={(event) => setDispencer(event.target.value)}
          />
          <Select
            value={fuel}
            onChange={(event) => setFuel(event.target.value)}
            displayEmpty
            placeholder="Fuel"
            variant="outlined"
          >
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
            onChange={(event) => setLive_reading(event.target.value)}
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
