import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import Offer from "./Offer";
import { useNavigate } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

//TO DO
//Srediti izgled
//Dodati slike u bazu i ukoliko je nema staviti default sliku restorana

function PersonalizedOffers(props) {
  // const { type, setType, loggedUser, setLoggedUser } = useContext(UserContext);
  const [city, setCity] = useState("");
  const [clicked, setClicked] = useState(0);
  const [currentoffers, setCurrentOffers] = useState([]);
  const [cards, setCards] = useState([]);
  const [userID, setUserID] = useState(null);
  const [restaurantName, setRestaurantName] = useState("");
  const token = localStorage.getItem("token");
  const [kitchenCards, setKitchenCards] = useState([]);
  const [frequencyCards, setFrequencyCards] = useState([]);
  const [maxRestaurant, setMaxRest] = useState("");

  const getByCityURL = "http://localhost:5000/recommendations/locationBased";
  const getByKitchenURL =
    "http://localhost:5000/recommendations/kitchenTypeBased";
  const getByFrequencyURL =
    "http://localhost:5000/recommendations/frequentlyOrdered";

  const axiosGetCityOffers = () => {
    return axios.get(
      getByCityURL,
      {
        headers: {
          Authorization: token,
        },
      },
      {
        mode: "cors",
      }
    );
  };

  const axiosGetKitchenOffers = () => {
    return axios.get(
      getByKitchenURL,
      {
        headers: {
          Authorization: token,
        },
      },
      {
        mode: "cors",
      }
    );
  };

  const axiosGetFrequentOffers = () => {
    return axios.get(
      getByFrequencyURL,
      {
        headers: {
          Authorization: token,
        },
      },
      {
        mode: "cors",
      }
    );
  };

  const navigate = useNavigate();

  useEffect(() => {
    const requestCity = axiosGetCityOffers();
    const requestKitchen = axiosGetKitchenOffers();
    const requestFrequency = axiosGetFrequentOffers();
    axios.all([requestCity, requestKitchen, requestFrequency]).then(
      axios.spread((resCityOffers, resKitchenType, resFreqOffers) => {
        setCards(resCityOffers.data);
        setKitchenCards(resKitchenType.data);
        setFrequencyCards(resFreqOffers.data);
      })
    );
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
    if (clicked > 0) {
      var newList = filterData;
      setCards(newList);
    } else setCards(currentoffers);

    /*setCards(
     (currentoffers) => {
      console.log(clicked);
      return currentoffers.filter((item) => {
        return item.city === city;
      });
    });*/
  }, [clicked]);

  //const token = localStorage.getItem("token");

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

  /*function groupIntoThrees(children) {
    const output = [];
    let currentGroup = [];

    children.forEach((child, index) => {
      currentGroup.push(child);

      if (index % 3 === 2) {
        output.push(currentGroup);
        currentGroup = [];
      }
    });

    return output;
  }
  /*
... later in render method ...

<Carousel className="col-md-7 col-11" indicators="true" controls="false">
  {groupIntoThrees(this.props.children).map((group) => (
    <Carousel.Item>
      <h1>first: {group[0]}</h1>
      <h1>middle: {group[1]}</h1>
      <h1>last: {group[2]}</h1>
    </Carousel.Item>
  )} 
</Carousel> */
  return (
    <div class="containter-offers">
      <div class="row">
        <div class="col-lg-4 col-sm-12">
          <h3>U vasem gradu</h3>
          <Carousel className="">
            {cards.map((item) => {
              //console.log("itemid" + JSON.stringify(item.restaurant_details[0]));

              //getRestaurantName(item.restaurant);
              return (
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
              );
            })}
          </Carousel>
        </div>
        <div class="col-lg-4 col-sm-12">
          <h3>Ukusi koje volite</h3>
          <Carousel className="">
            {kitchenCards.map((item) => {
              //console.log("itemid" + JSON.stringify(item.restaurant_details[0]));

              //getRestaurantName(item.restaurant);
              return (
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
              );
            })}
          </Carousel>
        </div>
        <div class="col-lg-4 col-sm-12">
          <h3>Najčešće birate {maxRestaurant}</h3>
          <Carousel className="">
            {frequencyCards.map((item) => {
              //console.log("itemid" + JSON.stringify(item.restaurant_details[0]));

              //getRestaurantName(item.restaurant);
              return (
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
              );
            })}
          </Carousel>
        </div>
      </div>
      <Link to="/offers" class="propose-register">
        <h3>Pretrazite sve aktivne ponude</h3>
      </Link>
    </div>
  );
}

export default PersonalizedOffers;

function Item(props) {
  return (
    <Paper>
      <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>

      <Button className="CheckButton">Check it out!</Button>
    </Paper>
  );
}
