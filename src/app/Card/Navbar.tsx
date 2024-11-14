"use client";
import Link from "next/link";
import React from "react";
import { AppBar, Toolbar, Typography, Button, Badge } from "@mui/material";

import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { RootState } from "../Reduxxx/store";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const users = JSON.parse(localStorage.getItem("user"));
  const route = useRouter();
  const Logout = () => {
    localStorage.clear("user");
    route.push('../Login')
  };

  const dd = useSelector((state: RootState) => state.ShippingCart);
  return (
    <AppBar position="fixed" color="primary" sx={{ boxShadow: 3 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Syed Technical
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <h3>
            Cart <span style={{ color: "red" }}>{dd.length}</span>
          </h3>

          <Link href="../Card" passHref>
            <Button color="inherit" style={{ color: "black" }}>
              Home
            </Button>
          </Link>

          <Link href="../AddToCart" passHref>
            <Button color="inherit" style={{ color: "black" }}>
              <Badge badgeContent={dd.length} color="secondary">
                Cart
              </Badge>
            </Button>
          </Link>
          <Button
            onClick={() => {
              Logout();
            }}
            color="inherit"
            style={{ color: "black" }}
          >
            <Badge badgeContent={dd.length} color="secondary">
              Logout
            </Badge>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
