import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import Offer from "./Offer";
import { useNavigate } from "react-router-dom";
import { Paper, Container, TextField, Box, Button, Grid } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { SipTwoTone } from "@mui/icons-material";

//TO DO
//Srediti izgled
//Dodati slike u bazu i ukoliko je nema staviti default sliku restorana

function Offers(props) {
  // const { type, setType, loggedUser, setLoggedUser } = useContext(UserContext);
  const [city, setCity] = useState("");
  const [clicked, setClicked] = useState(0);
  const [currentoffers, setCurrentOffers] = useState([]);
  const [cards, setCards] = useState([]);
  const [userID, setUserID] = useState(null);
  const [restaurantName, setRestaurantName] = useState("");
  const [kitchenType, setKitchenType] = useState();

  function onChangeKitchen(event) {
    const temp = event.target.value;
    setKitchenType(temp);
  }

  const navigate = useNavigate();
  //ucitavanje svih aktivnih ponuda iz baze
  useEffect(() => {
    let type = "";
    switch (kitchenType) {
      case 10:
        type = "domaca";
        break;
      case 20:
        type = "azijska";
        break;
      case 30:
        type = "italijanska";
        break;
      case 40:
        type = "meksicka";
        break;
      case 50:
        type = "indijska";
        break;
      case 60:
        type = "americka";
        break;
      case 70:
        type = "peciva";
        break;
      case 80:
        type = "namirnice";
        break;
    }

    axios
      .get(
        "http://localhost:5000/offers/active",

        {
          headers: { mode: "cors" },
          params: { city: city, type: type },
        }
      )
      .then((res) => {
        setCurrentOffers(res.data);
        setCards(res.data);
        console.log(res.data);
        console.log("cur off" + JSON.stringify(currentoffers));
        console.log("card" + JSON.stringify(cards));
      })
      .catch((err) => console.log(err));
  }, []);

  function takeCity(event) {
    const temp = event.target.value;
    setCity(temp);
  }

  var filteredlist = [];

  function buttonClicked() {
    setClicked((x) => x + 1);
  }

  function filterData() {
    return (filteredlist = currentoffers.filter((item) => {
      if (city === "") return currentoffers;
      return item.city.toLocaleLowerCase().startsWith(city.toLocaleLowerCase());
    }));
  }

  useEffect(() => {
    // console.log("useeffect " + cards);
    // if (clicked > 0) {
    //   var newList = filterData;
    //   //setCards(newList);
    // } else setCards(currentoffers);

    // /*setCards(
    //  (currentoffers) => {
    //   console.log(clicked);
    //   return currentoffers.filter((item) => {
    //     return item.city === city;
    //   });
    // });*/
    let type = "";
    switch (kitchenType) {
      case 10:
        type = "domaca";
        break;
      case 20:
        type = "azijska";
        break;
      case 30:
        type = "italijanska";
        break;
      case 40:
        type = "meksicka";
        break;
      case 50:
        type = "indijska";
        break;
      case 60:
        type = "americka";
        break;
      case 70:
        type = "peciva";
        break;
      case 80:
        type = "namirnice";
        break;
    }

    axios
      .get(
        "http://localhost:5000/offers/active",

        {
          headers: { mode: "cors" },
          params: { city: city, type: type },
        }
      )
      .then((res) => {
        setCurrentOffers(res.data);
        setCards(res.data);
        console.log(res.data);
        console.log("cur off" + JSON.stringify(currentoffers));
        console.log("card" + JSON.stringify(cards));
      })
      .catch((err) => console.log(err));
  }, [clicked]);

  const token = localStorage.getItem("token");

  // console.log("Iz offersa saljem tokne" + token);

  const makeOrderNovo = (id, dish, price, restaurant, dateFrom, endDate) => {
    //console.log("idOffera: " + id);
    axios
      .post(
        "http://localhost:5000/orders",
        {
          //userID,
          offerID: id,
          dish,
          price,
          restaurant,
          dateFrom,
          endDate,
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
        console.log("Res" + res);
        // if (res.isAuthenticated()) {

        axios.put(
          `http://localhost:5000/offers/${id}`,
          {
            status: "sold",
          },
          {
            mode: "cors",
          }
        );
        //obrada greske + poruka
        setCurrentOffers(
          currentoffers.filter((o) => {
            return o._id !== id;
          })
        );
        setClicked((x) => x + 1);
        window.alert(
          "Rezervisali ste ponudu! Svoje porudzbine mozete je na stranici Moje porudzbine."
        );
      })
      .catch((err) => {
        navigate("../login");
      });
  };

  /*
     axios.post("http://localhost:5000/orders", {
      userID,
      offerID: id,
      dish,
      price,
      restaurant,
      dateFrom,
      endDate,
    });
    */
  /*axios.put(`http://localhost:5000/offers/${id}`, {
      status: "sold",
    });
    //obrada greske + poruka
    setCurrentOffers(
      currentoffers.filter((o) => {
        return o._id !== id;
      })
    );
    setClicked((x) => x + 1);
  };*/

  /*const getRestaurantName = (restaurant_id) => {
    return axios
      .get(`http://localhost:5000/partners/${restaurant_id}`)
      .then((res) => {
        console.log(res.data);
        return res.data;
      });
  };*/

  /*const getRestaurantName = (restaurant_id) => {
    console.log("restaurant " + restaurant_id);
    return axios
      .get(`http://localhost:5000/partners/${restaurant_id}`)
      .then((res) => {
        console.log(res.data);
        setRestaurantName(res.data);
        return res.data;
      });
  };*/

  //<h3>Unesite grad u kome se nalazite {type}</h3>
  return (
    <div class="container">
      <Paper>
        <Box pb={3} sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={3}>
              <InputLabel id="demo-simple-select-label">
                Unesite grad u kome se nalazite
              </InputLabel>
              <TextField
                label="Grad"
                color="success"
                onChange={takeCity}
                placeholder="Beograd/Novi Sad/Nis"
                //value={name}
              />
            </Grid>
            <Grid item xs={2}>
              <InputLabel id="demo-simple-select-label">
                Izaberite vrstu kuhinje
              </InputLabel>
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
                <MenuItem value={90}></MenuItem>
              </Select>
            </Grid>

            <Grid item xs={2}>
              <Button
                variant="contained"
                type="submit"
                color="success"
                onClick={buttonClicked}
              >
                Pretrazi ponudu
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <div class="row">
        {cards.map((item) => {
          console.log("itemid" + JSON.stringify(item.restaurant_details[0]));

          //getRestaurantName(item.restaurant);
          return (
            <div class="col-lg-3 col-sm-12">
              <Offer
                key={item._id}
                itemID={item._id}
                dish={item.dish}
                dishImg={item.dishImg}
                price={item.price}
                restaurant={item.restaurant_details[0].name}
                city={item.city}
                dateFrom={item.dateFrom}
                endDate={item.endDate}
                makeOrderNovo={makeOrderNovo}
                restaurantID={item.restaurant}
                kitchenType={item.kitchenType}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Offers;
