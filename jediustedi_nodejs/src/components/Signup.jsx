import React, { useEffect, useState } from "react";
import axios from "axios";
import bcrypt from "bcryptjs";
import { Paper, Container, TextField, Box, Button } from "@mui/material";

//PAssword

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Signup() {
  //const salt = bcrypt.genSaltSync(10)

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [type, setType] = useState("");
  const [registrationInfo, setRegistrationInfo] = useState();

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    //setType("buyer");
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
    //setType("buyer");
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

  /*function hashIt(password){
    const salt = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hash(password, salt);
    return hashed;
  }*/

  // setType("buyer") Uncaught Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.

  const validateMail = (mail) => {
    //if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test($('#email').val()))
    return true;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validateMail(email)) {
      setRegistrationInfo("Uneta email adresa nije validna");
      return;
    }
    /* let tempPass = password;
    //let hashedPass = hashIt(tempPass);
    let hashedPass = bcrypt.hashSync(tempPass, salt);
    console.log("PASS: " + password);
    console.log("HASH: " + hashedPass);
    bcrypt.compare("igor", hashedPass, function(err, res) {
      if(res) console.log("igor je pass");
      else console.log("pass igor pogresan");
    });
    bcrypt.compare("boranija", hashedPass, function(err, res) {
      if(res) console.log("boranija je pass");
      else console.log("pass boranija pogresan");
    });
    return;*/
    axios
      .post("http://localhost:5000/users", { name, email, password })
      .then((res) => {
        setRegistrationInfo(res.data.infoText);
      });
  };
  return (
    <Container maxWidth="sm">
      <Paper elevation={3}>
        <h3>Postani korisnik i spasi hranu vec danas</h3>
        <form onSubmit={onSubmit}>
          <Box m={2} pt={3}>
            <TextField
              label="Ime"
              color="success"
              focused
              onChange={onChangeName}
              value={name}
            />
          </Box>
          <Box m={2} pt={3}>
            <TextField
              label="Email"
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
          <Box m={2} pt={3}>
            <Button variant="contained" type="submit" color="success">
              Sacuvaj
            </Button>
          </Box>
        </form>
        <div>{registrationInfo}</div>
      </Paper>
    </Container>
  );
}

export default Signup;
