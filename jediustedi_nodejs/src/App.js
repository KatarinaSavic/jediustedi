import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { PartnerContext } from "./context/PartnerContext";
import CreateOffer from "./components/CreateOffer";
import Menu from "./components/Menu";
import Login from "./components/Login";
import Signup from "./components/Signup";
import OfferList from "./components/OffersList";
import EditOffer from "./components/EditOffer";
import Partner from "./components/Partner";
import Home from "./components/Home";
import Offers from "./components/Offers";
import OrderList from "./components/OrderList";
import PartnerProfile from "./components/PartnerProfile";

function App() {
  //cuvanje tipa ulogovanog korisnika
  const [type, setType] = useState(window.localStorage.getItem("type"));
  //cuvanje uglogovanog korisnika
  const [loggedUser, setLoggedUser] = useState(
    JSON.parse(window.localStorage.getItem("loggedUser"))
  );

  return (
    <div>
      <BrowserRouter>
        <UserContext.Provider
          value={{ type, setType, loggedUser, setLoggedUser }}
        >
          <Menu />
          <Routes>
            <Route path="/offers" element={<Offers />} />
            <Route path="/login" element={<Login />} />
            <Route path="/edit/:id" element={<EditOffer />} />
            <Route path="/myoffers" element={<OfferList />} />
            <Route path="/addoffer" element={<CreateOffer />} />
            <Route path="/myorders" element={<OrderList />} />
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/becomepartner" element={<Partner />} />
            <Route path="/partnerprofile" element={<PartnerProfile />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
//<Route path="/editoffer" element={<EditOffer/>}/>
/*<Route index element={<Home />} /> 
<Route path="/restorani" element={<Offers />}/> 
<Route path="/partner" element={<Partner />}/>
<Route path="/login" element={<Login />} />
<Route path="/kontakt" element={<Contact />} />*/
