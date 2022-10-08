import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Paper, Container, TextField, Box, Button } from "@mui/material";
import { UserContext } from "../context/UserContext";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Stack from "@mui/material/Stack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

function CreateOffer() {
  const { type, setType, loggedUser, setLoggedUser } = useContext(UserContext);

  //const [users, setUsers] = useState([]);
  const [dish, setDish] = useState("");
  const [dishImg, setDishImg] = useState("");
  const [price, setPrice] = useState("");
  //const [restaurant, setRestaurant] = useState(loggedUser._id);
  //const [city, setCity] = useState(loggedUser.city);
  const [status, setStatus] = useState("active");
  const [dateFrom, setDateFrom] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [kitchenType, setKitchenType] = useState("");
  const [kitchenName, setKitchenName] = useState("");
  const [msg, setMsg] = useState("");
  const [csrfToken, setToken] = useState("");

  //token
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  console.log("token koji saljem je" + token);

  //console.log(dateFrom);
  const onChangeDish = (e) => {
    setDish(e.target.value);
  };
  const onChangeDishImg = (e) => {
    setDishImg(e.target.value);
  };
  const onChangePrice = (e) => {
    setPrice(e.target.value);
  };
  const onChangeKitchen = (e) => {
    setKitchenType(e.target.value);
    if (e.target.value === 10) {
      setKitchenName("domaca");
    } else if (e.target.value === 20) {
      setKitchenName("azijska");
    } else if (e.target.value === 30) {
      setKitchenName("italijanska");
    } else if (e.target.value === 40) {
      setKitchenName("meksicka");
    } else if (e.target.value === 50) {
      setKitchenName("indijska");
    } else if (e.target.value === 60) {
      setKitchenName("americka");
    } else if (e.target.value === 70) {
      setKitchenName("peciva");
    } else {
      setKitchenName("namirnice");
    }
  };

  //console.log("token u reactu " + response.data.CSRFToken);
  //axios.defaults.headers.post["X-CSRF-Token"] = response.data.CSRFToken;

  /*const getCSRFToken = async () => {
    const response = await axios.get("http://localhost:5000/getCSRFToken");
    axios.defaults.headers.post["X-CSRF-Token"] = response.data.CSRFToken;
    //axios.defaults.headers.common["X-CSRF-Token"] = response.data.CSRFToken;
    //axios.defaults.headers.trace = {};
    //axios.defaults.headers.trace["anti-csrf-token"] = response.data.CSRFToken;
  };
*/
  /* useEffect(() => {
    axios
      .get("http://localhost:5000/getCSRFToken", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        axios.defaults.headers.post["X-CSRF-Token"] = res.data.CSRFToken;
        //axios.defaults.headers.common["x-csrf-token"] = res.data.csrfToken;
        axios.defaults.withCredentials = true;
        //setToken(res.data.CSRFToken);
      });
    // getCSRFToken();
  }, []);
*/
  const onSubmit = (e) => {
    console.log("sacuvaj");
    e.preventDefault();

    //getCSRFToken();*/
    axios
      .post(
        "http://localhost:5000/offers",
        {
          dish,
          dishImg,
          price,
          //restaurant,
          //city,
          status,
          dateFrom,
          endDate,
          kitchenName,
        },
        //{
        //withCredentials: true,
        //xsrfHeaderName: "X-CSRF-Token",
        // },
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
        //console.log(res.headers);

        if (res.status === 200) setMsg("Ponuda uspešno dodata");
        else setMsg("Došlo je do greške");
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
        navigate("../login");
      });
  };
  // <h3>Dodajte danasnju {loggedUser.name} ponudu </h3> mozes uz token ime da vratis
  return type === "partner" ? (
    <Container maxWidth="sm">
      <Paper elevation={3}>
        <h3>Dodajte danasnju ponudu </h3>
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
            {" "}
            <InputLabel id="demo-simple-select-label">Vrsta kuhinje</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={kitchenType}
              label="Vrsta kuhinje"
              onChange={onChangeKitchen}
              sx={{ minWidth: 130 }}
            >
              <MenuItem value={10}>Domaca</MenuItem>
              <MenuItem value={20}>Azijska</MenuItem>
              <MenuItem value={30}>Italijanska</MenuItem>
              <MenuItem value={40}>Meksicka</MenuItem>
              <MenuItem value={50}>Indijska</MenuItem>
              <MenuItem value={60}>Americka</MenuItem>
              <MenuItem value={70}>Peciva</MenuItem>
              <MenuItem value={80}>Namirnice</MenuItem>
            </Select>
          </Box>
          <div>
            <h2>{msg}</h2>
          </div>
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
    <div>Nemate autorizacije da biste pristupili ovoj stranici</div>
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
