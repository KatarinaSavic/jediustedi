import React, { useEffect, useState } from "react";
import axios from "axios";
import bcrypt from "bcryptjs";
import { Paper, Container, TextField, Box, Button } from "@mui/material";

function Signup() {
  //const salt = bcrypt.genSaltSync(10)

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const [registrationInfo, setRegistrationInfo] = useState();

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
    setType("buyer");
  };

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
      .post("http://localhost:5000/users", { name, email, password, type })
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
              onChange={onChangeEmail}
              value={email}
            />
          </Box>
          <Box m={2} pt={3}>
            <TextField
              label="Lozinka"
              color="success"
              onChange={onChangePassword}
              value={password}
            />
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
