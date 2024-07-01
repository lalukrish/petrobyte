import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DashboardPriceModal from "./dashboardPriceModal";
import axios from "axios";

const initialRates = {
  diesel: {
    fuel_name: "Diesel",
    fuel_price: "Loading...",
    previous_rate: "Loading...",
  },
  petrol: {
    fuel_name: "Petrol",
    fuel_price: "Loading...",
    previous_rate: "Loading...",
  },
};

const Liverate = () => {
  const [open, setOpen] = useState(false);
  const [currentRate, setCurrentRate] = useState(null);
  const [rates, setRates] = useState(initialRates);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/fuelPrice/GETAllFuel`)
      .then((response) => {
        const updatedRates = response.data.message.reduce((acc, rate) => {
          if (rate.fuel_name === "Diesel") {
            acc.diesel = rate;
          } else if (rate.fuel_name === "Petrol") {
            acc.petrol = rate;
          }
          return acc;
        }, {});
        setRates(updatedRates);
      })
      .catch(() => alert(`Something went wrong`));
  }, [open]);

  const handleClickOpen = (rate) => {
    setCurrentRate(rate);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentRate(null);
  };
  return (
    <Box mt={2}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              width: "240px",
              height: "120px",
              backgroundColor: "white",
              boxShadow: 10,
              color: "black",
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              gap: 40,
              transition: "transform 0.3s",
              "&:hover": {
                transform: "scale(1.1)",
              },
              //   m: 2, // Adds margin around the card
            }}
            onClick={() => handleClickOpen(rates.diesel)}
          >
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontWeight: "bold",
                  mb: 1,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {rates.diesel.fuel_name}
              </Typography>
              <Typography
                variant="h2"
                component="div"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 1,
                  color: "green",
                }}
              >
                <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                  {rates.diesel.fuel_price} Rs/Lts
                </span>
              </Typography>
              <Typography
                variant="body2"
                component="div"
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  color: "gray",
                  mt: 2,
                }}
              >
                Previous Rate: {rates.diesel.previous_rate}
              </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={() => handleClickOpen(rates.diesel)}>
                <EditIcon />
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              width: "240px",
              height: "120px",
              backgroundColor: "white",
              boxShadow: 10,
              color: "black",
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              transition: "transform 0.3s",
              "&:hover": {
                transform: "scale(1.1)",
              },
              marginLeft: 12, // Adds margin around the card
            }}
            onClick={() => handleClickOpen(rates.petrol)}
          >
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontWeight: "bold",
                  mb: 1,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {rates.petrol.fuel_name}
              </Typography>
              <Typography
                variant="h2"
                component="div"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 1,
                  color: "green",
                }}
              >
                <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                  {rates.petrol.fuel_price} Rs/Lts
                </span>
              </Typography>
              <Typography
                variant="body2"
                component="div"
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  color: "gray",
                  mt: 2,
                }}
              >
                Previous Rate: {rates.petrol.previous_rate}
              </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={() => handleClickOpen(rates.petrol)}>
                <EditIcon />
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      {open && (
        <DashboardPriceModal
          open={open}
          onClose={handleClose}
          currentRate={currentRate}
        />
      )}
    </Box>
  );
};

export default Liverate;
