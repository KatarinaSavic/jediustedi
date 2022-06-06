import React from "react";
import "../App.css";

function Restaurant(props) {
  return (
    <div>
      <img class="restaurant" src={props.image} />
      <h2 class="restaurant">{props.name}</h2>
      <p class="restaurant">{props.location}</p>
      <p class="restaurant">{props.workinghours}</p>
    </div>
  );
}

export default Restaurant;
