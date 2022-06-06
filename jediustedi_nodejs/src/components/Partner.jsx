import React, { useState } from "react";
import axios from "axios";
import { Paper, Container, TextField, Box, Button } from "@mui/material";

function Partner() {
  const [name, setName] = useState("");
  //const [logo, setLogo] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [working_hours, setWorkingHours] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationInfo, setRegistrationInfo] = useState();

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  /*const onChangeLogo = (e) => {
    setLogo(e.target.value);
  }*/
  const onChangeAddress = (e) => {
    setAddress(e.target.value);
  };
  const onChangeCity = (e) => {
    setCity(e.target.value);
  };
  const onChangeWorkingHours = (e) => {
    setWorkingHours(e.target.value);
  };
  const onChangePhone = (e) => {
    setPhone(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //validateMail(email);
    axios
      .post("http://localhost:5000/partners", {
        name,
        address,
        city,
        working_hours,
        phone,
        email,
        password,
      })
      .then((res) => {
        setRegistrationInfo(res.data.infoText);
      });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3}>
        <Box m={2} pt={3}>
          <h2>Prodavanje viskova hrane nikada nije bilo lakse</h2>
          <p>Priduzite se jednom od 325 objekata koji koriste nase usluge</p>
        </Box>
        <form onSubmit={onSubmit}>
          <Box m={2} pt={3}>
            <TextField
              label="Naziv preduzeca"
              color="success"
              focused
              type="text"
              onChange={onChangeName}
            />
          </Box>
          <Box m={2} pt={3}>
            <TextField label="Logo" color="success" focused type="file" />
          </Box>
          <Box m={2} pt={3}>
            <TextField
              label="Adresa"
              color="success"
              focused
              type="text"
              onChange={onChangeAddress}
            />

            <TextField
              label="Grad"
              color="success"
              focused
              type="text"
              onChange={onChangeCity}
            />
          </Box>
          <Box m={2} pt={3}>
            <TextField
              label="Radno vreme"
              color="success"
              focused
              type="text"
              onChange={onChangeWorkingHours}
            />
          </Box>
          <Box m={2} pt={3}>
            <TextField
              label="Telefon"
              color="success"
              focused
              type="text"
              onChange={onChangePhone}
            />

            <TextField
              label="Email"
              color="success"
              focused
              type="email"
              onChange={onChangeEmail}
            />
          </Box>
          <Box m={2} pt={3}>
            <TextField
              label="Lozinka"
              color="success"
              focused
              type="password"
              onChange={onChangePassword}
            />

            <TextField
              label="Ponovite lozinku"
              color="success"
              focused
              type="password"
            />
          </Box>
          <Box m={2} pt={3}>
            <Button variant="contained" type="submit" color="success">
              Registrujte radnju{" "}
            </Button>
          </Box>
        </form>
        <h2>{registrationInfo}</h2>
      </Paper>
    </Container>
  );
}
export default Partner;
