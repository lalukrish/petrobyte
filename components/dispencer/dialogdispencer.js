"use client";
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
  Snackbar,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useFormik, FieldArray, FormikProvider } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  dispencer: Yup.string().required("Dispencer name is required"),
  fields: Yup.array()
    .of(
      Yup.object({
        sub_dispencer_id: Yup.string().required("Sub dispencer is required"),
        live_reading: Yup.number()
          .required("Live reading is required")
          .positive("Live reading must be a positive number"),
      })
    )
    .min(1, "At least one sub dispencer is required")
    .max(4, "You can only add up to 4 fields"),
});

export default function DispencerNew({
  close,
  refreshDispencer,
  edit,
  handleShowAlert,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [subDispencer, setSubDispencer] = React.useState([]);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [alertSeverity, setAlertSeverity] = React.useState("success");

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

  const formik = useFormik({
    initialValues: {
      dispencer: edit ? edit.dispencer_name : "",
      fields: edit
        ? edit.sub_dispencer_id.map((sub) => ({
            sub_dispencer_id: sub._id,
            live_reading: sub.live_reading,
          }))
        : [{ sub_dispencer_id: "", live_reading: "" }],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const dispencerData = values.fields.map((field) => ({
        ...(edit && { id: edit._id }),
        dispencer_name: values.dispencer,
        sub_dispencer_id: field.sub_dispencer_id,
        live_reading: field.live_reading,
      }));

      const request = edit
        ? axios.put(
            `${process.env.NEXT_PUBLIC_API_URL}/dispencer/PUTDispencer`,
            dispencerData
          )
        : axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/dispencer/POSTDispencer`,
            dispencerData
          );

      request
        .then((response) => {
          handleShowAlert("success", "Dispencer saved successfully!");
          refreshDispencer();
          close();
        })
        .catch((err) => {
          handleShowAlert("error", "some error occured!");
          close();
        });
    },
  });

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  const getAvailableSubDispensers = (selectedDispensers, allDispensers, currentId) => {
    const selectedIds = selectedDispensers.map((field) => field.sub_dispencer_id);
    return allDispensers.filter(
      (sub) => !selectedIds.includes(sub._id) || sub._id === currentId
    );
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={true}
        onClose={close}
        aria-labelledby="responsive-dialog-title"
        maxWidth="md"
      >
        <DialogTitle id="responsive-dialog-title">
          {edit ? "Edit Dispencer" : "New Dispencer"}
        </DialogTitle>
        <DialogContent>
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={2} sx={{ width: "500px", padding: "5px" }}>
                <TextField
                  autoFocus
                  id="dispencer"
                  name="dispencer"
                  label="Dispencer"
                  value={formik.values.dispencer}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.dispencer && Boolean(formik.errors.dispencer)
                  }
                  helperText={
                    formik.touched.dispencer && formik.errors.dispencer
                  }
                />

                <FieldArray name="fields">
                  {({ push, remove }) => (
                    <>
                      {formik.values.fields.map((field, index) => (
                        <Stack
                          key={index}
                          direction="row"
                          spacing={2}
                          alignItems="center"
                        >
                          <FormControl
                            sx={{ width: "45%" }}
                            variant="outlined"
                            error={
                              formik.touched.fields &&
                              formik.touched.fields[index] &&
                              Boolean(
                                formik.errors.fields &&
                                  formik.errors.fields[index] &&
                                  formik.errors.fields[index].sub_dispencer_id
                              )
                            }
                          >
                            <InputLabel id={`disp-sub-label-${index}`}>
                              Sub Name
                            </InputLabel>
                            <Select
                              labelId={`disp-sub-label-${index}`}
                              id={`disp-sub-${index}`}
                              name={`fields[${index}].sub_dispencer_id`}
                              value={field.sub_dispencer_id}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              label="Sub Name"
                            >
                              {getAvailableSubDispensers(formik.values.fields, subDispencer, field.sub_dispencer_id).map((sub) => (
                                <MenuItem key={sub._id} value={sub._id}>
                                  {sub.sub_dispencer}
                                </MenuItem>
                              ))}
                            </Select>
                            {formik.touched.fields &&
                              formik.touched.fields[index] &&
                              formik.errors.fields &&
                              formik.errors.fields[index] && (
                                <div
                                  style={{
                                    color: "red",
                                    fontSize: "0.75rem",
                                    marginTop: "4px",
                                  }}
                                >
                                  {formik.errors.fields[index].sub_dispencer_id}
                                </div>
                              )}
                          </FormControl>
                          <TextField
                            id={`live-reading-${index}`}
                            name={`fields[${index}].live_reading`}
                            label="Live Reading"
                            value={field.live_reading}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched.fields &&
                              formik.touched.fields[index] &&
                              Boolean(
                                formik.errors.fields &&
                                  formik.errors.fields[index] &&
                                  formik.errors.fields[index].live_reading
                              )
                            }
                            helperText={
                              formik.touched.fields &&
                              formik.touched.fields[index] &&
                              formik.errors.fields &&
                              formik.errors.fields[index] &&
                              formik.errors.fields[index].live_reading
                            }
                            sx={{ width: "45%" }}
                          />
                          <IconButton
                            onClick={() => remove(index)}
                            sx={{ width: "10%", color: "red" }}
                            disabled={formik.values.fields.length === 1}
                          >
                            <RemoveIcon />
                          </IconButton>
                          {index === formik.values.fields.length - 1 &&
                          formik.values.fields.length < 4 ? (
                            <IconButton
                              onClick={() =>
                                push({ sub_dispencer_id: "", live_reading: "" })
                              }
                              sx={{
                                width: "10%",
                                color:
                                  formik.values.fields.length < 4
                                    ? "green"
                                    : "gray",
                              }}
                              disabled={formik.values.fields.length >= 4}
                            >
                              <AddIcon />
                            </IconButton>
                          ) : null}
                        </Stack>
                      ))}
                    </>
                  )}
                </FieldArray>
              </Stack>
              <DialogActions>
                <Button color="error" onClick={close}>
                  Cancel
                </Button>
                <Button color="success" type="submit">
                  Save
                </Button>
              </DialogActions>
            </form>
          </FormikProvider>
        </DialogContent>
      </Dialog>
    </>
  );
}
