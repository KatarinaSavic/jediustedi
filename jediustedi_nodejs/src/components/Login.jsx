import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { Paper, Container, TextField, Box, Button } from "@mui/material";
import { UserContext } from "../context/UserContext";
import jwt_decode from "jwt-decode";
//var jwt = require("jsonwebtoken");

//PAssword

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

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

  //password functions
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  ///end of password funcs

  /*
   const submit = () => {
        console.log(username, password)
        axios.post("http://localhost:5000/login", { username, password }).then(user => {
            console.log(user);
            localStorage.setItem('token', user.data.token)
            navigate('/protected')
        }).catch(err => {
            console.log(err);
        })
    }
  */

  const logIn = (e) => {
    axios
      .get("http://localhost:5000/login/" + email + "/" + password)
      .then((res) => {
        window.localStorage.setItem("type", res.data.msg);
        /*window.localStorage.setItem(
          "loggedUser",
          JSON.stringify(res.data.foundUser)
        );*/
        localStorage.setItem("token", res.data.token);
        /* localStorage.setItem(
          "token",
          res.data.token.slice(7, res.data.token.length)
        ); */
        //dodala za JWT
        // var decoded = jwt_decode(res.data.token);
        //console.log("Token decoced" + decoded);
        // console.log(
        //"Token izvorni" + res.data.token.slice(7, res.data.token.length)
        //  );
        //var decode1 = jwt.decode(res.data.token);
        //console.log("Token decoced" + decode1);
        setType(res.data.msg);
        //setLoggedUser(res.data.foundUser);
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
          <FormControl
            sx={{ m: 0, width: "25ch" }}
            variant="outlined"
            color="success"
            focused
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Lozinka
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              //onChange={onChangePassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </Box>
        <Box m={2} pt={3} pb={3}>
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
