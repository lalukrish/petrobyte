import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import moment from "moment";

export default function TestNew({ close, onDataUpdated, editTest }) {
  const [dispencer, setDispencer] = React.useState(
    editTest ? editTest.dispencer_name : ""
  );
  const [subDispencer, setSubDispencer] = React.useState(
    editTest ? editTest.sub_dispencer_id : ""
  );
  const [qty, setQty] = React.useState(editTest ? editTest.fuel_quantity : "");
  const [dispencers, setDispencers] = React.useState([]);
  const [subDispencers, setSubDispencers] = React.useState([]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const datePart = moment().format("DD/MM/YYYY");

  React.useEffect(() => {
    const fetchDispensers = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/dispencer/GETAllDispencer`
        );
        setDispencers(response.data.message.allDispencers);
      } catch (error) {
        console.error("Error fetching dispensers:", error);
      }
    };

    fetchDispensers();
  }, []);

  React.useEffect(() => {
    if (editTest) {
      const fetchSubDispencers = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/dispencer/GETSubDispencer?name=${editTest.dispencer_name}`
          );
          setSubDispencers(response.data.message);
        } catch (error) {
          console.error("Error fetching sub dispensers:", error);
        }
      };

      fetchSubDispencers();
    }
  }, [editTest]);

  const handleDispencerChange = async (event) => {
    const selectedDispencer = event.target.value;
    setDispencer(selectedDispencer);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/dispencer/GETSubDispencer?name=${selectedDispencer}`
      );
      setSubDispencers(response.data.message);
    } catch (error) {
      console.error("Error fetching sub dispensers:", error);
    }
  };

  const handleSubDispencerChange = (event) => {
    setSubDispencer(event.target.value);
  };

  const handleQtyChange = (event) => {
    setQty(event.target.value);
  };

  const handleSave = () => {
    const testData = {
      date: datePart,
      dispencer_name: dispencer,
      sub_dispencer_id: subDispencer,
      fuel_quantity: qty,
    };

    const request = editTest
      ? axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/test/PUTTest/${editTest.id}`,
          testData
        )
      : axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/test/POSTTest`,
          testData
        );

    request
      .then((response) => {
        console.log("Data saved successfully:", response.data);
        onDataUpdated();
      })
      .catch((error) => {
        console.error("There was an error saving the data!", error);
      });
  };

  const handleClose = () => {
    close();
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={true}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {editTest ? "Edit Test Details" : "Add Test Details"}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ width: "400px", padding: "5px" }}>
          <FormControl fullWidth>
            <InputLabel id="dispencer-label">Dispencer</InputLabel>
            <Select
              labelId="dispencer-label"
              id="dispencer-select"
              value={dispencer}
              onChange={handleDispencerChange}
              label="Dispencer"
            >
              {dispencers.map((dispencer) => (
                <MenuItem key={dispencer._id} value={dispencer.dispencer_name}>
                  {dispencer.dispencer_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="sub-dispencer-label">Sub Dispencer</InputLabel>
            <Select
              labelId="sub-dispencer-label"
              id="sub-dispencer-select"
              value={subDispencer}
              onChange={handleSubDispencerChange}
              label="Sub Dispencer"
              disabled={!subDispencers.length}
            >
              {subDispencers.map((subDispencer) => (
                <MenuItem key={subDispencer._id} value={subDispencer._id}>
                  {subDispencer.sub_dispencer}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="qty"
            label="Qty"
            variant="outlined"
            value={qty}
            onChange={handleQtyChange}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose}>
          Cancel
        </Button>
        <Button color="success" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
