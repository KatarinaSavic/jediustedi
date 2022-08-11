import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
//import {  useHistory} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Paper, Container, TextField, Box, Button } from "@mui/material";
import { UserContext } from "../context/UserContext";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Stack from "@mui/material/Stack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

//da li obrisati props?

function EditOffer(props) {
  
  const { type, setType, loggedUser, setLoggedUser } = useContext(UserContext);

  const [dish, setDish] = useState("");
  const [dishImg, setDishImg] = useState("");
  const [price, setPrice] = useState("");
  const [restaurant, setRestaurant] = useState(loggedUser._id);
  const [city, setCity] = useState(loggedUser.city);
  const [offers, setOffers] = useState([]);
  const [status, setStatus] = useState("active");
  const [dateFrom, setDateFrom] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [msg, setMsg] = useState("");

  const { id } = useParams(); //izvlaci sve parametre iz URL-a

  let navigate = useNavigate();

  console.log(restaurant);
  useEffect(() => {
    axios
      .get("http://localhost:5000/offers/" + id)
      .then((res) => {
        setDish(res.data.dish);
        setDishImg(res.data.dishImg);
        setPrice(res.data.price);
        setRestaurant(res.data.restaurant);
        setCity(res.data.city);
        setDateFrom(res.data.dateFrom);
        setEndDate(res.data.endDate);
      })
      .catch((err) => console.log(err));
  }, []);

   const onChangeDish = (e) => {
    setDish(e.target.value);
  };
  const onChangeDishImg = (e) => {
    setDishImg(e.target.value);
  };
  const onChangePrice = (e) => {
    setPrice(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/offers/${id}`, {
        dish: dish,
        dishImg: dishImg,
        price: price,
        restaurant: restaurant,
        city: city,
        status: status,
        dateFrom: dateFrom,
        endDate: endDate,
      })
      .then((res) => {
        if (res.status === 200) setMsg("Ponuda uspešno dodata");
        else setMsg("Došlo je do greške");
      });
    navigate("/myoffers");
  };
  return (
    <Container maxWidth="sm">
      <Paper elevation={3}>
        <h3>Promenite izabrano jelo</h3>
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
          <div>
            <h2>{msg}</h2>
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

export default EditOffer;
