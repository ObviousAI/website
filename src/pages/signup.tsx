import React, { useState } from "react";
import Link from "next/link";
import { Container, TextField, Button, Typography } from "@mui/material";
import loginStyles from "../styles/login.module.css";

function LoginPage(props: { name: string }) {
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("Please fill out all the fields.");
  const [alreadyAvailable, setAlreadyAvailable] = useState(false);

  async function submitInput() {
    if (password === "" || email === "" || passwordAgain === "") {
      setMessage("Please fill out all the fields.");
      setOpen(true);
    } else if (password !== passwordAgain) {
      setMessage("Passwords do not match.");
      setOpen(true);
    } else {
    }
  }

  return (
    <div id={loginStyles.body}>
      <Container id={loginStyles.formBox}>
        <Typography variant="h4" className={loginStyles.formElement}>
          {props.name} Sign Up
        </Typography>
        <Typography variant="body1" className={loginStyles.formElement}>
          Welcome to ShopMyStyle!
        </Typography>
        <TextField
          margin="normal"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          margin="normal"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
        />
        <TextField
          margin="normal"
          label="Re-enter Password"
          variant="outlined"
          value={passwordAgain}
          onChange={(event) => setPasswordAgain(event.target.value)}
          type="password"
        />
        <Link className={loginStyles.formElement} href="/login">
          Already a member?
        </Link>
        <Button
          id={loginStyles.submitButton}
          onClick={submitInput}
          variant="contained"
        >
          {" "}
          Continue{" "}
        </Button>
      </Container>
    </div>
  );
}

export default LoginPage;
