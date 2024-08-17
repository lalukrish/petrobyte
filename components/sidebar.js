"use client";

import React, { useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import {
  SpaceDashboard as SpaceDashboardIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon,
  Groups as GroupsIcon,
  Article as ArticleIcon,
  CreditCard as CreditCardIcon,
  ShoppingCart as ShoppingCartIcon,
  Troubleshoot as TroubleshootIcon,
  LocalGasStation as LocalGasStationIcon,
} from "@mui/icons-material";
import Link from "next/link";
import moment from "moment";
import Image from "next/image";
import BlinkingAlert from "./alertfuelrate";

const drawerWidth = 240;

export default function ResponsiveDrawer() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const datePart = moment().format("DD/MM/YYYY");
  const dayPart = moment().format("dddd");

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const routes = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <SpaceDashboardIcon sx={{ color: "#0d47a1" }} />,
    },
    {
      name: "Closing",
      link: "/closing",
      icon: <AccountBalanceWalletIcon sx={{ color: "#0d47a1" }} />,
    },
    {
      name: "Accounts",
      link: "/accounts",
      icon: <AccountBalanceWalletIcon sx={{ color: "#0d47a1" }} />,
    },
    {
      name: "Test",
      link: "/test",
      icon: <TroubleshootIcon sx={{ color: "#0d47a1" }} />,
    },
    {
      name: "Credits",
      link: "/credits",
      icon: <CreditCardIcon sx={{ color: "#0d47a1" }} />,
    },
    {
      name: "Products",
      link: "/products",
      icon: <ShoppingCartIcon sx={{ color: "#0d47a1" }} />,
    },
    {
      name: "Reports",
      link: "/reports",
      icon: <ArticleIcon sx={{ color: "#0d47a1" }} />,
    },
    {
      name: "Dispencer",
      link: "/dispencer",
      icon: <LocalGasStationIcon sx={{ color: "#0d47a1" }} />,
    },
    {
      name: "Employee",
      link: "/employe",
      icon: <GroupsIcon sx={{ color: "#0d47a1" }} />,
    },
  ];

  const drawer = (
    <div style={{ background: "#e3f2fd" }}>
      <Toolbar>
        <Image src="/Petro.png" width={140} height={60} alt="Petro Logo" />
      </Toolbar>
      <List>
        {routes.map((item) => (
          <ListItem key={item.link} disablePadding>
            <ListItemButton component={Link} href={item.link}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        elevation={1}
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#e3f2fd",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{ color: "black", display: "flex", flexDirection: "column" }}
          >
            <Typography>{datePart}</Typography>
            <Typography>{dayPart}</Typography>
          </Box>
          <Box>
            <BlinkingAlert />
          </Box>
          <Box sx={{ alignItems: "end" }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="success"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              sx={{ marginTop: "35px" }}
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <b>Log out</b>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: "#e3f2fd",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          // p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}
