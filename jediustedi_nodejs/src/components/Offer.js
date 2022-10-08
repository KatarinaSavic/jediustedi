import { React, useState, useEffect, useContext } from "react";
import axios from "axios";
import { Card } from "@material-ui/core";
import Chip from "@mui/material/Chip";
import {
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import { UserContext } from "../context/UserContext";

import Moment from "moment";
//import "moment/locale/sr-latn";
import "moment/min/moment-with-locales";
import "moment/locale/sr";

function Offer(props) {
  //const { type, setType, loggedUser, setLoggedUser } = useContext(UserContext);
  const [offerID, setOfferID] = useState("");
  //const [userID, setUserID] = useState(loggedUser._id);

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
    restaurantID,
    kitchenType,
  } = props;
  console.log(props);

  const makeOrder = (e) => {
    setOfferID(itemID);
    console.log(offerID);
    makeOrderNovo(itemID, dish, price, restaurantID, dateFrom, endDate);
  };
  //class="col-3">
  return (
    <div>
      {" "}
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia component="img" alt={dish} height="240" image={dishImg} />

        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {dish}, {price} RSD
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {restaurant}, {city}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Vazi od:
            {Moment(dateFrom).locale("sr").format("LLL")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Vazi do:
            {Moment(endDate).locale("sr").format("LLL")}
          </Typography>
          {kitchenType && <Chip label={kitchenType} color="success" />}
        </CardContent>
        <CardActions>
          <Grid container justifyContent="flex-end">
            <Button
              sx={{ marginLeft: "auto" }}
              size="small"
              color="success"
              variant="contained"
              onClick={makeOrder}
            >
              Kupi
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </div>
  );
}

export default Offer;
