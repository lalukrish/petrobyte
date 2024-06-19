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
import DashboardNew from "./dialogadd";
import axios from "axios";

const initialRates = [
  {
    id: 1,
    type: "Diesel",
    currentRate: "102 Rs/Lts",
    previousRate: "100",
  },
  {
    id: 2,
    type: "Petrol",
    currentRate: "95 Rs/Lts",
    previousRate: "93",
  },
  // Add more initial rates as needed
];

const Liverate = () => {
  const [open, setOpen] = useState(false);
  const [rates, setRates] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/fuelPrice/GETAllFuel`)
      .then((responce) => setRates(responce.data.message))
      .catch(() => alert(`Something went wrong`));
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditRate = (id) => {
    // Logic to handle editing the rate based on id
    console.log(`Editing rate with id: ${id}`);
  };

  return (
    <Box mt={2}>
      <Grid container spacing={3}>
        {/* Diesel Rate Card */}
        {rates.map((rate)=>(
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              width: "240px",
              height: "110px",
              backgroundColor: "white",
              boxShadow: 10,
              color: "black",
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              gap: 4,
              transition: "transform 0.3s",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          >
            {open ? <DashboardNew close={handleClose} /> : null}
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
                {rate.fuel_name}
              </Typography>
              <Typography
                variant="h2"
                component="div"
                
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 1,
                  color:'green'
                }}
              >
                <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                  {rate.fuel_price} Rs/Lts
                </span>
              </Typography>
              <Typography
                variant="body2"
                component="div"
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  color: "gray",
                }}
              >
                Previous Rate: {rate.fuel_price} Rs/Lts
              </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={() => handleEditRate(initialRates[0].id)}>
                <EditIcon />
              </Button>
            </CardActions>
          </Card>
        </Grid>
        ))}
        {/* Petrol Rate Card */}
        {/* <Grid item xs={12} md={4}>
          <Card
            sx={{
              width: "240px",
              height: "110px",
              backgroundColor: "white",
              boxShadow: 10,
              color: "black",
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              gap: 4,
              transition: "transform 0.3s",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          >
            {open ? <DashboardNew close={handleClose} /> : null}
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
                Petrol
              </Typography>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 1,
                }}
              >
                <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                  {initialRates[1].currentRate}
                </span>
              </Typography>
              <Typography
                variant="body2"
                component="div"
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  color: "gray",
                }}
              >
                Previous Rate: {initialRates[1].previousRate}
              </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={() => handleEditRate(initialRates[1].id)}>
                <EditIcon />
              </Button>
            </CardActions>
          </Card>
        </Grid> */}

        {/* Add Rate Card */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              width: "240px",
              height: "110px",
              backgroundColor: "white",
              boxShadow: 10,
              color: "black",
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          >
            <CardContent>
              <Button variant="contained" onClick={handleClickOpen}>
                Add Rate
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Liverate;
