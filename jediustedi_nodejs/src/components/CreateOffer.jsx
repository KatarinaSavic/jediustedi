import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Paper, Container, TextField, Box, Button } from "@mui/material";
import { UserContext } from "../context/UserContext";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Stack from "@mui/material/Stack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

//Ubaciti datepicker

function CreateOffer() {
  const { type, setType, loggedUser, setLoggedUser } = useContext(UserContext);

  //const [users, setUsers] = useState([]);
  const [dish, setDish] = useState("");
  const [dishImg, setDishImg] = useState("");
  const [price, setPrice] = useState("");
  const [restaurant, setRestaurant] = useState(loggedUser._id);
  const [city, setCity] = useState(loggedUser.city);
  const [status, setStatus] = useState("active");
  const [dateFrom, setDateFrom] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  /* useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((res) => setUsers(res.data.map((user) => user.name)))
      .catch((err) => console.log(err));
  });*/
  console.log(dateFrom);
  const onChangeDish = (e) => {
    setDish(e.target.value);
  };
  const onChangeDishImg = (e) => {
    setDishImg(e.target.value);
  };
  const onChangePrice = (e) => {
    setPrice(e.target.value);
  };
  /* const onChangeRestaurant = (e) => {
    setRestaurant(e.target.value);
  };
  const onChangeCity = (e) => {
    setCity(e.target.value);
  };*/
  const onSubmit = (e) => {
    console.log("sacuvaj");
    e.preventDefault();
    axios.post("http://localhost:5000/offers", {
      dish,
      dishImg,
      price,
      restaurant,
      city,
      status,
      dateFrom,
      endDate,
    });
  };
  return type === "partner" ? (
    <Container maxWidth="sm">
      <Paper elevation={3}>
        <h3>Dodajte danasnju {loggedUser.name} ponudu </h3>
        <form onSubmit={onSubmit}>
          <Box m={2} pt={3}>
            {" "}
            <TextField
              label="Ime jela"
              color="success"
              focused
              onChange={onChangeDish}
              value={dish}
            />
          </Box>
          <Box m={2} pt={3}>
            {" "}
            <TextField
              label="Slika jela"
              color="success"
              focused
              onChange={onChangeDishImg}
              value={dishImg}
            />
          </Box>
          <Box m={2} pt={3}>
            <TextField
              label="Cena"
              color="success"
              focused
              onChange={onChangePrice}
              value={price}
            />
          </Box>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <Box m={2} pt={3}>
                <MobileDateTimePicker
                  label="Vazi od"
                  value={dateFrom}
                  onChange={(newValue) => {
                    setDateFrom(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />

                <MobileDateTimePicker
                  label="Vazi do"
                  value={endDate}
                  onChange={(newValue) => {
                    setEndDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Box>
            </Stack>
          </LocalizationProvider>

          <Box m={2} pt={3}>
            <Button variant="contained" type="submit" color="success">
              Sacuvaj
            </Button>
          </Box>
          <Link to="/myoffers" class="propose-register">
            Pogledajte aktivne ponude
          </Link>
        </form>
      </Paper>
    </Container>
  ) : (
    <div>1234</div>
  );
}

export default CreateOffer;

/*
<div>
      <h3>Dodajte danasnju ponudu</h3>
      <form onSubmit={onSubmit}>
          <label>Ime jela:</label>
          <input type="text" onChange={onChangeDish} value={dish}></input>
          <label>Slika jela:</label>
          <input type="text"  onChange={onChangeDishImg} value={dishImg}></input>
          <label>Cena:</label>
          <input type="text"  onChange={onChangePrice} value={price}></input>
          <label>Restoran:</label>
          <input type="text"  onChange={onChangeRestaurant} value={restaurant}></input>
          <label>Grad:</label>
          <input type="text"  onChange={onChangeCity} value={city}></input>
          <button type="submit">Sacuvaj</button>
          <Link to="/restaurantoffers" class="propose-register">
            Pogledajte aktivne ponude
          </Link>
      </form>
  </div>;

*/
