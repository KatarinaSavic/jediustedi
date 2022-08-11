import React from "react";
import Restaurant from "./Restaurant";
import "../App.css";
import logo from "../img/logo.jpg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

//TO DO
//Srediti responzivan dizajn
//Srediti ubacivanje i citanje logo-a iz baze

function Home() {
  const [restaurants, setRestaurants] = useState([]);
  //ucitavanje restorana koji ce biti prikazani u sekciji partneri
  useEffect(() => {
    axios
      .get("http://localhost:5000/partners")
      .then((res) => {
        setRestaurants(res.data);
        console.log(res.data);
        console.log(restaurants);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div class="home-page">
      <div class="container home">
        <div class="row home-banner1">
          <div class="col-6">
            <img class="logo-img" src={logo} alt="logo" />
          </div>
          <div class="col-6">
            <h2>OTPAD HRANE, PROBLEM ŠIROM SVETA</h2>
            <p>
              Svake godine više od jedne trećine hrane proizvedene u svetu
              odlazi u otpad, a ona je odgovorna za 10% svih emisija gasova
              staklene bašte. Mi smo na misiji da to promenimo - da li ste sa
              nama?
            </p>
            <button class="btn-lg">
              <Link to="/login" class="btn-link">
                Prijavi se
              </Link>
            </button>
            <button class="btn-lg">
              <Link to="/becomepartner" class="btn-link">
                Postani partner
              </Link>
            </button>
          </div>
        </div>
        <div class="row home-banner2">
          <div class="col-6">
            <h2>
              DOĐITE DA SE BORITE SA NAMA protiv OTPADA HRANE. POTREBNI STE
              PLANETI!
            </h2>
          </div>
          <div class="col-6">
            <p>
              Sanjamo o planeti bez otpada od hrane i svaki dan radimo na tome
              da to postane stvarnost. Naša aplikacija je najdirektniji način da
              se uključite - samo se prijavite i sačuvajte savršeno dobru, višak
              hrane iz vaših lokalnih prodavnica. To je uvek iznenađenje, po
              odličnoj ceni i trenutno dobro delo za planetu. Započnete sada!
            </p>
            <button class="btn-lg">
              <Link to="/login" class="btn-link">
                Prijavi se
              </Link>
            </button>
          </div>
        </div>
      </div>
      <div class="container partners">
        <h2>Nasi partneri</h2>
        <div class="row">
          {restaurants.slice(0, 3).map((item) => {
            return (
              <div class="col-4">
                <Restaurant
                  key={item.id}
                  image={item.logo}
                  name={item.name}
                  location={item.address}
                  workinghours={item.working_hours}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
