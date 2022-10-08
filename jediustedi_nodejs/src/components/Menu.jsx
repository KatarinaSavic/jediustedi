import { React, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { UserContext } from "../context/UserContext";

function Menu() {
  const { type, setType, loggedUser, setLoggedUser } = useContext(UserContext);
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
        <h2>Jedi & ustedi</h2>
        <Link to="/" class="nav-item">
          O nama
        </Link>
        {type === "partner" && (
          <Link to="/addoffer" class="nav-item">
            Dodaj ponudu
          </Link>
        )}
        {type === "partner" && (
          <Link to="/myoffers" class="nav-item">
            Moje ponude
          </Link>
        )}
        {type === "partner" && (
          <Link to="/partnerprofile" class="nav-item">
            Moj profil
          </Link>
        )}

        {type != "partner" && (
          <Link to="/offers" class="nav-item">
            Restorani
          </Link>
        )}
        {type === "korisnik" && (
          <Link to="/myorders" class="nav-item">
            Moje porudzbine
          </Link>
        )}
        {type === null && (
          <Link to="/becomepartner" class="nav-item">
            Postani partner
          </Link>
        )}
        {type === "korisnik" && (
          <Link to="/customerprofile" class="nav-item">
            Moj profil
          </Link>
        )}
        {type === null && (
          <Link to="/login" class="nav-item">
            Prijavi se
          </Link>
        )}

        {(type === "partner" || type === "korisnik") && (
          <Link
            to="/"
            class="nav-item"
            onClick={() => {
              setType(null);
              setLoggedUser(null);
              window.localStorage.removeItem("type");
              localStorage.removeItem("token");
            }}
          >
            Odjavi se
          </Link>
        )}
      </nav>
    </div>
  );
}

export default Menu;
