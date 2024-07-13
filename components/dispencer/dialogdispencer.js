import React from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function DispencerNew({ close, refreshDispencer, edit }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [dispencer, setDispencer] = React.useState(
    edit ? edit.dispencer_name : ""
  );
  const [fields, setFields] = React.useState(
    edit
      ? edit.sub_dispencer_id.map((sub) => ({
          sub_dispencer_id: sub._id,
          live_reading: sub.live_reading,
        }))
      : [{ sub_dispencer_id: "", live_reading: "" }]
  );

  const [subDispencer, setSubDispencer] = React.useState([]);

  // Fetch subdispencer data on mount
  React.useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/subdispencer/GETAllSubDispencer`)
      .then((response) => {
        if (response.data) {
          setSubDispencer(response.data);
        }
      })
      .catch((err) => console.log(err.message));
  }, []);

  const handleClose = () => {
    close();
  };

  const handleAddFields = () => {
    if (fields.length < 4) {
      setFields([...fields, { sub_dispencer_id: "", live_reading: "" }]);
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
        ? {
            ...field,
            [event.target.name]: event.target.value,
          }
        : field
    );
    setFields(updatedFields);
  };

  const handleSave = () => {
    const newDispencer = fields.map((field) => ({
      dispencer_name: dispencer,
      sub_dispencer_id: field.sub_dispencer_id,
      live_reading: field.live_reading,
    }));

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
        alert("Something went wrong");
        close();
      });
  };

  const updateDispencer = () => {
    const dispencerData = fields.map((field) => ({
      id: edit._id,
      dispencer_name: dispencer,
      sub_dispencer_id: field.sub_dispencer_id,
      live_reading: field.live_reading,
    }));

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
        alert(err.message);
        close();
      });
  };

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
            onChange={(e) => {
              setDispencer(e.target.value);
            }}
          />

          {fields.map((field, index) => (
            <Stack key={index} direction="row" spacing={2} alignItems="center">
              <FormControl sx={{ width: "45%" }} variant="outlined">
                <InputLabel id={`disp-sub-label-${index}`}>Sub Name</InputLabel>
                <Select
                  labelId={`disp-sub-label-${index}`}
                  id={`disp-sub-${index}`}
                  label="Sub Name"
                  name="sub_dispencer_id"
                  value={field.sub_dispencer_id}
                  onChange={(event) => handleFieldChange(index, event)}
                >
                  {subDispencer.map((sub) => (
                    <MenuItem key={sub._id} value={sub._id}>
                      {sub.sub_dispencer}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                id={`live-metering-${index}`}
                label="Live Metering"
                name="live_reading"
                value={field.live_reading}
                variant="outlined"
                onChange={(event) => handleFieldChange(index, event)}
                sx={{ width: "45%" }}
              />
              {index === fields.length - 1 && fields.length < 4 ? (
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
