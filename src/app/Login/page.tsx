"use client";
import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Paper,
  Link as MuiLink,
} from "@mui/material";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import Swal from "sweetalert2";
import Card from "../Components/Card";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  // router
  const router = useRouter();
  const Logins = async () => {
    try {
      const sing = await signInWithEmailAndPassword(auth, email, password);

      Swal.fire({
        title: "Login Success",
        icon: "success",
      });
      setemail("");
      setpassword("");
      router.push("../Card");
    } catch (err) {
      Swal.fire({
        title: "wrong Password",
      });
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e0e7ff", // soft blue background
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          width: 320,
          textAlign: "center",
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // softer shadow
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#1a237e" }}
        >
          Welcome Back
        </Typography>
        <Typography variant="body2" color="textSecondary" mb={3}>
          Please login to your account
        </Typography>

        <TextField
          id="email-input"
          label="Email"
          type="text"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setemail(e.currentTarget.value)}
        />
        <TextField
          id="password-input"
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setpassword(e.currentTarget.value)}
        />

        <Button
          onClick={() => {
            Logins();
          }}
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            mt: 2,
            py: 1.2,
            fontWeight: "bold",
            backgroundColor: "#1a73e8",
            "&:hover": {
              backgroundColor: "#0f5bb5",
            },
          }}
        >
          Login
        </Button>

        <Typography variant="body2" color="textSecondary" mt={2}>
          Don't have an account?{" "}
          <Link href="../SignUp" passHref>
            <MuiLink
              underline="hover"
              color="primary"
              sx={{ fontWeight: "bold" }}
            >
              Register
            </MuiLink>
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoginPage;
