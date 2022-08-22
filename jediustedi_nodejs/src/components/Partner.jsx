import React, { useState } from "react";
import axios from "axios";
import { Paper, Container, TextField, Box, Button } from "@mui/material";
// za polje lozinka
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

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
          </Box>
          <Box m={2} pt={3}>
            <TextField
              label="Email"
              color="success"
              focused
              type="email"
              onChange={onChangeEmail}
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
