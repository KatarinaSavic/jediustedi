import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { Paper, Container, TextField, Box, Button } from "@mui/material";
import { UserContext } from "../context/UserContext";

//import MailOutlineIcon from '@mui/icons-material/MailOutline';
//import PasswordIcon from '@mui/icons-material/Password';

function Login() {
  const { type, setType, loggedUser, setLoggedUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const logIn = (e) => {
    axios
      .get("http://localhost:5000/login/" + email + "/" + password)
      .then((res) => {
        window.localStorage.setItem("type", res.data.msg);
        window.localStorage.setItem(
          "loggedUser",
          JSON.stringify(res.data.user)
        );
        setType(res.data.msg);
        setLoggedUser(res.data.user);
        if (res.data.msg === "korisnik") {
          navigate("../offers");
        } else if (res.data.msg === "partner") {
          navigate("../addoffer");
        } else {
          console.log(res.data.msg);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3}>
        <h2>Prijavi se</h2>
        <Box m={2} pt={3}>
          {" "}
          <TextField
            label="Mail"
            color="success"
            focused
            onChange={onChangeEmail}
            value={email}
          />
        </Box>
        <Box m={2} pt={3}>
          {" "}
          <TextField
            label="Lozinka"
            color="success"
            focused
            onChange={onChangePassword}
            value={password}
          />
        </Box>
        <Box m={2} pt={3}>
          <Button
            variant="contained"
            type="submit"
            color="success"
            onClick={logIn}
          >
            Prijavi se
          </Button>
        </Box>
        <h4>Prvi put koristis Jedi & Ustedi? </h4>
        <Link to="/signup" class="propose-register">
          Registruj se
        </Link>
      </Paper>
    </Container>
  );
}

export default Login;
