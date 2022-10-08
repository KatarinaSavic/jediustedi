const router = require("express").Router();

const Offer = require("../models/offer.model");
const Partner = require("../models/partner.model");
const User = require("../models/user.model");
const Order = require("../models/order.model");

//JWT i passport
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { default: mongoose } = require("mongoose");
require("../passport");

//Ruta koja vraca jela iz tog grada
router.get(
  "/locationBased",
  passport.authenticate("korisnik", { session: false }),
  (req, res) => {
    console.log("***** 1");
    //korisnik req.user._id
    res.set("Access-Control-Allow-Origin", "http://localhost:3000");

    /*let recommendations = {
      location: [],
      kitchen: [],
      frequency: [],
    };*/

    let userCity = "";
    //console.log(req.user._id);
    let userID = mongoose.Types.ObjectId(req.user._id);
    let stringID = req.user._id.toString();
    //console.log("2" + userID);
    /*User.findById(stringID, function (err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        userCity = foundUser.city;
      }
    });*/
    User.findOne({ _id: stringID }, function (err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        //console.log(foundUser);
        userCity = foundUser.city;
        //console.log(userCity);
      }
    });

    let offersByCity = [];

    Offer.aggregate([
      {
        $match: {
          status: "active",
        },
      },
      {
        $lookup: {
          from: Partner.collection.name,
          localField: "restaurant",
          foreignField: "_id",
          as: "restaurant_details",
        },
      },
    ])
      .then((porucio) => {
        //console.log("porucio" + JSON.stringify(porucio));
        offersByCity = porucio.filter(
          (item) => item.restaurant_details[0].city === userCity
        );
        //let offersToShow = offersByCity.slice(0, 4);
        //console.log("vraca po user-u " + JSON.stringify(porucio));
        //console.log("/nrestoran " + JSON.stringify(porucio));
        console.log("*****2 res: ", offersByCity);
        res.status(200).send(offersByCity);
        //recommendations.location = offersByCity;
      })
      .catch((err) => res.status(400).send(err));
  }
);

//Ruta koja vraca omiljenu hranu
router.get(
  "/kitchenTypeBased",
  passport.authenticate("korisnik", { session: false }),
  (req, res) => {
    console.log("***** 2");
    //korisnik req.user._id
    res.set("Access-Control-Allow-Origin", "http://localhost:3000");
    let userPreferences = [];
    //console.log(req.user._id);
    let userID = mongoose.Types.ObjectId(req.user._id);
    let stringID = req.user._id.toString();
    //console.log("2" + userID);
    /*User.findById(stringID, function (err, foundUser) {
        if (err) {
          console.log(err);
        } else {
          userCity = foundUser.city;
        }
      });*/
    User.findOne({ _id: stringID }, function (err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        //console.log(foundUser);
        userPreferences = foundUser.preferences;
        //console.log(userCity);
      }
    });

    let offersByPreferences = [];

    Offer.aggregate([
      {
        $match: {
          status: "active",
          kitchenType: { $exists: true },
        },
      },

      {
        $lookup: {
          from: Partner.collection.name,
          localField: "restaurant",
          foreignField: "_id",
          as: "restaurant_details",
        },
      },
    ])
      .then((porucio) => {
        //console.log("porucio" + JSON.stringify(porucio));
        /*let offerswithTypes = porucio.filter((item) => {
          item.kitchenType !== undefined;
        });*/
        //console.log(offerswithTypes);
        offersByPreferences = porucio.filter((item) => {
          // console.log(userPreferences);
          // console.log(item.kitchenType);

          return userPreferences.includes(item.kitchenType);
          // offersByPreferences.push(item);
        });
        //let offersToShow = offersByCity.slice(0, 4);
        //console.log("vraca po user-u " + JSON.stringify(porucio));
        //console.log("/nrestoran " + JSON.stringify(porucio));
        res.status(200).send(offersByPreferences);
      })
      .catch((err) => res.status(400).send(err));
    // res.status(200).send(recommendations);
  }
);

//Ruta koja vraca restoran iz koga se najvise narucuje
router.get(
  "/frequentlyOrdered",
  passport.authenticate("korisnik", { session: false }),
  (req, res) => {
    console.log("***** 3");
    //korisnik req.user._id
    res.set("Access-Control-Allow-Origin", "http://localhost:3000");
    // let userPreferences = [];
    // console.log(req.user._id);
    let userID = mongoose.Types.ObjectId(req.user._id);
    // let stringID = req.user._id.toString();
    // console.log("2" + userID);
    /*User.findById(stringID, function (err, foundUser) {
        if (err) {
          console.log(err);
        } else {
          userCity = foundUser.city;
        }
      });*/
    /*User.findOne({ _id: stringID }, function (err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        console.log(foundUser);
        userPreferences = foundUser.preferences;
        //console.log(userCity);
      }
    });*/

    //let restMaxOrders = mongoose.Types.ObjectId();
    let restMaxOrders;
    let name = "";
    Order.aggregate([
      {
        $match: {
          user: userID,
        },
      },
      {
        $group: {
          _id: "$restaurant",
          // maxOrders: { $max: { count: { $sum: 1 } } },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 1 },
      /* {
        $lookup: {
          from: Offer.collection.name,
          localField: "_id",
          foreignField: "restaurant",
          as: "offers",
        },
      },
      /*  { $unwind: "$offers" },
      {
        $lookup: {
          from: Partner.collection.name,
          localField: "restaurant",
          foreignField: "_id",
          as: "restaurant_details",
        },
      },
      {
        $unwind: "$restaurant_details",
      },*/
      /* {
        $project: {
          _id: 1,
          city: 1,
          dish: 1,
          dishImg: 1,
          kitchenType: 1,
          price: 1,
          restaurant: 1,
          restaurant_details: "$offers.restaurant_details",
          status: 1,
        },
      },*/
    ])
      .then((restaurantID) => {
        console.log("restaurantID" + JSON.stringify(restaurantID));
        /*let offerswithTypes = porucio.filter((item) => {
          item.kitchenType !== undefined;
        });*/
        //console.log(offerswithTypes);
        restMaxOrders = restaurantID[0]._id;
        /* console.log("maxO" + JSON.stringify(restMaxOrders));
        console.log("por" + JSON.stringify(porucio[0].offers));
        console.log(restMaxOrders[0]);
        Partner.find(
          { _id: mongoose.Types.ObjectId(restMaxOrders) },
          function (err, foundRestaurant) {
            if (err) {
              console.log(err);
            } else {
              console.log("FR" + foundRestaurant);
              name = foundRestaurant.name;
              //console.log(userCity);
            }
          }
        );
        let offersToShow = {
          offers: porucio[0].offers,
          restaurant_details: name,
        };*/
        Offer.aggregate([
          {
            $match: {
              status: "active",
              restaurant: restMaxOrders,
            },
          },

          {
            $lookup: {
              from: Partner.collection.name,
              localField: "restaurant",
              foreignField: "_id",
              as: "restaurant_details",
            },
          },
        ])
          .then((offers) => {
            console.log("***** 3 res ", offers);
            // if(offers !== [])
            res.status(200).send(offers);
            //else
            //res.status(200).send(offers);
          })
          .catch((err) => {
            res.status(400).send(err);
          });

        //offersByPreferences = porucio.filter((item) => {
        // console.log(userPreferences);
        // console.log(item.kitchenType);

        // return userPreferences.includes(item.kitchenType);
        // offersByPreferences.push(item);
      })
      //let offersToShow = offersByCity.slice(0, 4);
      //console.log("vraca po user-u " + JSON.stringify(porucio));
      //console.log("/nrestoran " + JSON.stringify(porucio));
      // res.status(200).send(offersByPreferences);

      .catch((err) => res.status(400).send(err));

    //restaurantID = restMaxOrders[0]_;
  }
);

router.get(
  "/locationBased",
  passport.authenticate("korisnik", { session: false }),
  (req, res) => {
    console.log("***** 1");
    //korisnik req.user._id
    res.set("Access-Control-Allow-Origin", "http://localhost:3000");

    /*let recommendations = {
      location: [],
      kitchen: [],
      frequency: [],
    };*/

    let userCity = "";
    //console.log(req.user._id);
    let userID = mongoose.Types.ObjectId(req.user._id);
    let stringID = req.user._id.toString();
    //console.log("2" + userID);
    /*User.findById(stringID, function (err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        userCity = foundUser.city;
      }
    });*/
    User.findOne({ _id: stringID }, function (err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        //console.log(foundUser);
        userCity = foundUser.city;
        //console.log(userCity);
      }
    });

    let offersByCity = [];

    Offer.aggregate([
      {
        $match: {
          status: "active",
        },
      },
      {
        $lookup: {
          from: Partner.collection.name,
          localField: "restaurant",
          foreignField: "_id",
          as: "restaurant_details",
        },
      },
    ])
      .then((porucio) => {
        //console.log("porucio" + JSON.stringify(porucio));
        offersByCity = porucio.filter(
          (item) => item.restaurant_details[0].city === userCity
        );
        //let offersToShow = offersByCity.slice(0, 4);
        //console.log("vraca po user-u " + JSON.stringify(porucio));
        //console.log("/nrestoran " + JSON.stringify(porucio));
        console.log("*****2 res: ", offersByCity);
        res.status(200).send(offersByCity);
        //recommendations.location = offersByCity;
      })
      .catch((err) => res.status(400).send(err));
  }
);

//ruta za najcesce porucivane
module.exports = router;
