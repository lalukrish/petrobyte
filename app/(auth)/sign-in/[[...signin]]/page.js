// src/LoginPage.js
import React from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Grid,
} from "@mui/material";
import Image from "next/image";

const LoginPage = () => {
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
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="dense"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
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
