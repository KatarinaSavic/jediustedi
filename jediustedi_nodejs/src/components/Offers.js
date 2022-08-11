import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import Offer from "./Offer";

//TO DO
//Srediti izgled
//Dodati slike u bazu i ukoliko je nema staviti default sliku restorana

function Offers(props) {
  const { type, setType, loggedUser, setLoggedUser } = useContext(UserContext);
  const [city, setCity] = useState("");
  const [clicked, setClicked] = useState(0);
  const [currentoffers, setCurrentOffers] = useState([]);
  const [cards, setCards] = useState([]);
  const [userID, setUserID] = useState(null);
  const [restaurantName, setRestaurantName] = useState("");
  //ucitavanje svih aktivnih ponuda iz baze
  useEffect(() => {
    if (loggedUser !== null) setUserID(loggedUser._id);
    console.log("useEffect once");
    axios
      .get("http://localhost:5000/offers")
      .then((res) => {
        setCurrentOffers(
          res.data.filter((o) => {
            return o.status === "active";
          })
        );
        setCards(
          res.data.filter((o) => {
            return o.status === "active";
          })
        );
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

  const makeOrderNovo = (id, dish, price, restaurant, dateFrom, endDate) => {
    //console.log("idOffera: " + id);
    axios.post("http://localhost:5000/orders", {
      userID,
      offerID: id,
      dish,
      price,
      restaurant,
      dateFrom,
      endDate,
    });
    axios.put(`http://localhost:5000/offers/${id}`, {
      status: "sold",
    });
    //obrada greske + poruka
    setCurrentOffers(
      currentoffers.filter((o) => {
        return o._id !== id;
      })
    );
    setClicked((x) => x + 1);
  };

  /*const getRestaurantName = (restaurant_id) => {
    return axios
      .get(`http://localhost:5000/partners/${restaurant_id}`)
      .then((res) => {
        console.log(res.data);
        return res.data;
      });
  };*/

  const getRestaurantName = (restaurant_id) => {
    console.log("restaurant " + restaurant_id);
    return axios
      .get(`http://localhost:5000/partners/${restaurant_id}`)
      .then((res) => {
        console.log(res.data);
        setRestaurantName(res.data);
        return res.data;
      });
  };
  return (
    <div class="containter-offers">
      <div class="city-selection">
        <h3>Unesite grad u kome se nalazite {type}</h3>
        <input
          onChange={takeCity}
          type="text"
          placeholder="Beograd/Novi Sad/Nis"
        ></input>
        <button onClick={buttonClicked}>Pogledaj ponudu</button>
      </div>
      <div class="row">
        {cards.map((item) => {
          console.log("itemid" + item.restaurant);

          getRestaurantName(item.restaurant);
          return (
            <Offer
              key={item._id}
              itemID={item._id}
              dish={item.dish}
              dishImg={item.dishImg}
              price={item.price}
              restaurant={restaurantName}
              city={item.city}
              dateFrom={item.dateFrom}
              endDate={item.endDate}
              makeOrderNovo={makeOrderNovo}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Offers;
