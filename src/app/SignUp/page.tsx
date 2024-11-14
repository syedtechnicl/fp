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
import { createUserWithEmailAndPassword } from "firebase/auth/cordova";
import { auth } from "../firebase/firebase";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
const LoginPage = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const router = useRouter();

  const register = async () => {
    try {
      const userCreate = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const users = localStorage.setItem('user',JSON.stringify(userCreate))

      // sw
      let timerInterval;
      Swal.fire({
        title: "Auto close alert!",
        html: "I will close in <b></b> milliseconds.",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
      });
      // sw
      router.push("../Login");
      setemail("");
      setpassword("");
    } catch (err) {
      console.log(err);
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
          Welcome To Our Website
        </Typography>
        <Typography variant="body2" color="textSecondary" mb={3}>
          Please Create an Account
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
          onClick={() => register()}
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
          Register
        </Button>

        <Typography variant="body2" color="textSecondary" mt={2}>
          Do you have an account?{" "}
          <Link href="../Login" passHref>
            <MuiLink
              underline="hover"
              color="primary"
              sx={{ fontWeight: "bold" }}
            >
              Login
            </MuiLink>
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoginPage;
