import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Stack, TextField, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";

export default function DispencerNew({ close, refreshDispencer, edit }) {
  const [dispencer, setDispencer] = React.useState(edit ? edit.dispencer : "");
  const [fields, setFields] = React.useState(
    edit
      ? [{ dispSub: "", live_reading: edit.live_reading }]
      : [{ dispSub: "", live_reading: "" }]
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
      })
      .catch((err) => console.log(err.message));
  }, []);

  const handleClose = () => {
    close();
  };

  const handleSave = () => {
    let newDispencer = {
      dispencer: dispencer,
      fields: fields.map(({ dispSub, live_reading }) => ({
        dispSub,
        live_reading,
      })),
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

  const updateDispencer = () => {
    let dispencerData = {
      id: edit._id,
      fields: fields.map(({ dispSub, live_reading }) => ({
        dispSub,
        live_reading,
      })),
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

  const handleAddFields = () => {
    if (fields.length < 4) {
      setFields([...fields, { dispSub: "", live_reading: "" }]);
    } else {
      alert("You can only add up to 4 fields.");
    }
  };

  const handleRemoveField = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
  };

  const handleFieldChange = (index, event) => {
    const updatedFields = fields.map((field, i) =>
      i === index
        ? { ...field, [event.target.name]: event.target.value }
        : field
    );
    setFields(updatedFields);
  };
  let sub_dispencers=[
    {
      subDispencer:"P1",
      fuel_id:"petrolid",
    },
    {
      subDispencer:"P2",
      fuel_id:"petrolid",
    },{
      subDispencer:"D1",
      fuel_id:"dieselid",
    },
    {
      subDispencer:"D2",
      fuel_id:"dieselid",
    }
  ]


  return (
    <Dialog
      fullScreen={fullScreen}
      open={true}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      maxWidth="md"
    >
      <DialogTitle id="responsive-dialog-title">
        {edit ? "Edit Dispencer" : "New Dispencer"}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ width: "500px", padding: "5px" }}>
          <TextField
            autoFocus
            id="outlined-basic"
            label="Dispencer"
            value={dispencer}
            variant="outlined"
            onChange={(event) => setDispencer(event.target.value)}
          />
          {fields.map((field, index) => (
            <Stack key={index} direction="row" spacing={2} alignItems="center">
              <TextField
                id={`disp-sub-${index}`}
                label="Sub Name"
                name="dispSub"
                value={field.dispSub}
                variant="outlined"
                onChange={(event) => handleFieldChange(index, event)}
                sx={{ width: "45%" }}
              />
              <TextField
                id={`live-metering-${index}`}
                label="Live Metering"
                name="live_reading"
                value={field.live_reading}
                variant="outlined"
                onChange={(event) => handleFieldChange(index, event)}
                sx={{ width: "45%" }}
              />
              {index === fields.length - 1 ? (
                <IconButton
                  onClick={handleAddFields}
                  sx={{
                    width: "10%",
                    color: fields.length < 4 ? "green" : "gray",
                  }}
                  disabled={fields.length >= 4}
                >
                  <AddIcon />
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => handleRemoveField(index)}
                  sx={{ width: "10%", color: "red" }}
                >
                  <RemoveIcon />
                </IconButton>
              )}
            </Stack>
          ))}
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
