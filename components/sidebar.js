"use client";

import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { Alert, AlertTitle, Avatar, Menu, MenuItem } from "@mui/material";
import Image from "next/image";
import moment from "moment";
import { AccountCircle } from "@mui/icons-material";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import GroupsIcon from "@mui/icons-material/Groups";
import ArticleIcon from "@mui/icons-material/Article";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BlinkingAlert from "./alertfuelrate";
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';

const drawerWidth = 240;

export default function ResponsiveDrawer() {
  // const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const datePart = moment().format("DD/MM/YYYY");
  const dayPart = moment().format("dddd");
  const [anchorEl, setAnchorEl] = React.useState(null);
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
      name: "Accounts",
      link: "/accounts",
      icon: <AccountBalanceWalletIcon sx={{ color: "#0d47a1" }} />,
    },
    {
      name: "Employee",
      link: "/employe",
      icon: <GroupsIcon sx={{ color: "#0d47a1" }} />,
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

  ];

  const drawer = (
    <div style={{ background: "#e3f2fd" }}>
      <Toolbar>
        <Image src="/Petro.png" width={140} height={60} />
      </Toolbar>
      {/* <Divider /> */} 
      <List>
         
        {routes.map((item, index) => (
          <ListItem key={item.link} disablePadding>
            <ListItemButton component={Link} to={item.link}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{ style: { fontWeight: "" } }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* <Divider /> */}
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  // Remove this const when copying and pasting into your project.
  // const container = window !== undefined ? () => window().document.body : undefined;

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
            <Typography sx={{ fontStyle: "inherit", fontWeight: "" }}>
              {datePart}
            </Typography>
            <Typography sx={{ fontStyle: "inherit", fontWeight: "" }}>
              {dayPart}
            </Typography>
          </Box>
          <Box>
            <BlinkingAlert/>
            
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
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <b>Profile</b>
              </MenuItem>
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
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          //  container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
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
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}
