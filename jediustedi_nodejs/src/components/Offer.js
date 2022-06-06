import { React, useState, useEffect, useContext } from "react";
import axios from "axios";
import { Card } from "@material-ui/core";
import {
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { UserContext } from "../context/UserContext";

function Offer(props) {
  const { type, setType, loggedUser, setLoggedUser } = useContext(UserContext);
  const [offerID, setOfferID] = useState("");
  const [userID, setUserID] = useState(loggedUser._id);

  const {
    itemID,
    dish,
    dishImg,
    price,
    restaurant,
    city,
    dateFrom,
    endDate,
    makeOrderNovo,
  } = props;
  console.log(props);

  const makeOrder = (e) => {
    setOfferID(itemID);
    console.log(offerID);
    makeOrderNovo(itemID, dish, price, restaurant, dateFrom, endDate);
    // e.preventDefault();
    // axios.post("http://localhost:5000/orders", {
    //   userID,
    //   offerID,
    // });
  };

  return (
    <div class="col-3">
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia component="img" alt={dish} height="240" image={dishImg} />

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {dish}, {price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {restaurant}, {city}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={makeOrder}>
            Kupi
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Offer;
