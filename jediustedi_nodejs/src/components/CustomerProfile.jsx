import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Paper, Container, TextField, Box, Button } from "@mui/material";
import { UserContext } from "../context/UserContext";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import { useNavigate } from "react-router-dom";
import { Warning } from "@mui/icons-material";

//kada se prvi put ucita stranica povuci podatke iz baze!

function CustomerProfile() {
  const { type, setType, loggedUser, setLoggedUser } = useContext(UserContext);
  const token = localStorage.getItem("token");

  const [pref, setPreferences] = useState([]);
  const [msg, setMsg] = useState("");
  const [city, setCity] = useState("");
  const [cityCode, setCityCode] = useState("");
  const [likeDomaca, setDomaca] = useState(false);
  const [likeAzija, setAzija] = useState(false);
  const [likeItalija, setItalija] = useState(false);
  const [likeAmerika, setAmerika] = useState(false);
  const [likeIndija, setIndija] = useState(false);
  const [likeNamirnice, setNamirnice] = useState(false);
  const [likePeciva, setPeciva] = useState(false);
  const [likeMeksiko, setMeksiko] = useState(false);
  const [storedPref, setStoredPreferences] = useState([]);

  const handleChangeCity = (event) => {
    setCityCode(event.target.value);
    if (event.target.value === 10) setCity("Beograd");
    else if (event.target.value === 20) setCity("Nis");
    else setCity("Novi Sad");
  };

  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/users/profileData",
        {
          headers: {
            Authorization: token,
          },
        },
        {
          mode: "cors",
        }
      )
      .then((res) => {
        setCityCode(res.data.userCityCode);
        setStoredPreferences(res.data.preferences);
        console.log(res.data.preferences);

        if (res.data.preferences.includes("domaca")) setDomaca(true);
        if (res.data.preferences.includes("peciva")) setPeciva(true);
        if (res.data.preferences.includes("azijska")) setAzija(true);
        if (res.data.preferences.includes("meksicka")) setMeksiko(true);
        if (res.data.preferences.includes("italijansa")) setItalija(true);
        if (res.data.preferences.includes("indijska")) setIndija(true);
        if (res.data.preferences.includes("americka")) setAmerika(true);
        if (res.data.preferences.includes("namirnice")) setNamirnice(true);
        //else console.log("greska");
        console.log(storedPref);
        console.log("domaca" + likeDomaca);
        console.log("peciva" + likePeciva);
        console.log(res.data.preferences.includes("peciva"));

        //handleChangePref();
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChangePref = (event) => {
    /*const index = pref.indexOf(e.target.value);
    if (index === -1) {
      setPreferences([...pref], e.target.value);
    } else {
      setPreferences(pref.filter((item) => item !== e.target.value));
    }*/
    console.log(event.target.value);
    let newArray = [];

    switch (event.target.value) {
      case "domaca":
        setDomaca(!likeDomaca);
        break;
      case "azijska":
        setAzija(!likeAzija);
        break;
      case "italijanska":
        setItalija(!likeItalija);
        break;
      case "meksicka":
        setMeksiko(!likeMeksiko);
        break;
      case "indijska":
        setIndija(!likeIndija);
        break;
      case "americka":
        setAmerika(!likeAmerika);
        break;
      case "peciva":
        setPeciva(!likePeciva);
        break;
      case "namirnice":
        setNamirnice(!likeNamirnice);
        break;
    }

    if (pref.includes(event.target.value)) {
      newArray = pref.filter((value) => value !== event.target.value);
      setPreferences(newArray);
    } else {
      setPreferences((pref) => [...pref, event.target.value]);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:5000/users/`,
        {
          city: city,
          preferences: pref,
        },
        {
          headers: {
            Authorization: token,
          },
        },
        {
          mode: "cors",
        }
      )
      .then((res) => {
        if (res.status === 200) setMsg("Profil je uspešno azuriran");
        else setMsg("Došlo je do greške");
      });
  };
  const label = { inputProps: { "aria-label": "Domaca" } };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3}>
        <h3>Recite nam više o sebi</h3>
        <form onSubmit={onSubmit}>
          <Box m={2} pt={3}>
            {" "}
            <InputLabel id="demo-simple-select-label">Grad</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={cityCode}
              label="Grad"
              onChange={handleChangeCity}
            >
              <MenuItem value={10}>Beograd</MenuItem>
              <MenuItem value={20}>Niš</MenuItem>
              <MenuItem value={30}>Novi Sad</MenuItem>
            </Select>
          </Box>
          <Box m={2} pt={3}>
            {" "}
            <FormControl component="fieldset">
              <FormLabel component="legend">Omiljena hrana</FormLabel>
              <FormGroup aria-label="position">
                <FormControlLabel
                  label="Domaca hrana"
                  labelPlacement="end"
                  value="domaca"
                  control={
                    <Checkbox
                      {...label}
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite />}
                      //checked={domacaTu && <Favorite />}
                      //checked={pref.includes("domaca")}
                      onChange={handleChangePref}
                      checked={likeDomaca}
                      color="secondary"
                      //defaultChecked={domacaTu}
                      /* sx={{
                        color: "error",
                        "&.Mui-checked": {
                          color: "error",
                        },
                      }}*/
                    />
                  }
                />

                <FormControlLabel
                  value="azijska"
                  control={
                    <Checkbox
                      {...label}
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite />}
                      onChange={handleChangePref}
                      checked={likeAzija}
                      color="secondary"
                      //checked={pref.includes("azijska")}
                    />
                  }
                  label="Azijska"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="italijanska"
                  control={
                    <Checkbox
                      {...label}
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite />}
                      onChange={handleChangePref}
                      //checked={pref.includes("italijanska")}
                      checked={likeItalija}
                      color="secondary"
                    />
                  }
                  label="Italijanska"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="meksicka"
                  control={
                    <Checkbox
                      {...label}
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite />}
                      onChange={handleChangePref}
                      //checked={pref.includes("meksicka")}
                      checked={likeMeksiko}
                      color="secondary"
                    />
                  }
                  label="Meksicka"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="indijska"
                  control={
                    <Checkbox
                      {...label}
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite />}
                      onChange={handleChangePref}
                      //checked={pref.includes("indijska")}
                      checked={likeIndija}
                      color="secondary"
                    />
                  }
                  label="Indijska"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="americka"
                  control={
                    <Checkbox
                      {...label}
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite />}
                      onChange={handleChangePref}
                      //checked={pref.includes("americka")}
                      checked={likeAmerika}
                      color="secondary"
                    />
                  }
                  label="Americka"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="peciva"
                  control={
                    <Checkbox
                      {...label}
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite />}
                      onChange={handleChangePref}
                      //checked={pref.includes("peciva")}
                      checked={likePeciva}
                      color="secondary"
                    />
                  }
                  label="Peciva"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="namirnice"
                  control={
                    <Checkbox
                      {...label}
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite />}
                      onChange={handleChangePref}
                      //checked={pref.includes("namirnice")}
                      checked={likeNamirnice}
                      color="secondary"
                    />
                  }
                  label="Namirnice"
                  labelPlacement="end"
                />
              </FormGroup>
            </FormControl>
          </Box>

          <div>
            <h3>{msg}</h3>
          </div>
          <Box m={2} pt={3}>
            <Button variant="contained" type="submit" color="success">
              Sacuvaj
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default CustomerProfile;
