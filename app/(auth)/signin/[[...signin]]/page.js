// src/LoginPage.js
"use client";
import React from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import Image from "next/image";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const signin = () => {
    let body = {
      email: email,
      password: password,
    };
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, body)
      .then((response) => {
        alert(response.data.message);
        console.log(response.data.message.token);
      })
      .catch((response) => {
        alert(response);
        console.log(response.data);
      });
  };

  return (
    <Grid>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image sx={{ m: 1 }} width="180" height="80" src="/Petro.png" />
          <Typography component="h1" variant="h5" fontSize="bold">
            Sign in
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="dense"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(event) => setEmail(event.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
            />
            <Button
              fullWidth
              variant="contained"
              onClick={signin}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </Grid>
  );
};

export default LoginPage;
