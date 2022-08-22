const router = require("express").Router();

const Order = require("../models/order.model");
const Offer = require("../models/offer.model");
const Partner = require("../models/partner.model");

const { default: mongoose } = require("mongoose");
//JWT web token
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("../passport");

router.get(
  "/",
  passport.authenticate("korisnik", { session: false }),
  (req, res) => {
    console.log(req);
    console.log("U get requestu imam info " + req.user._id);
    userID = mongoose.Types.ObjectId(req.user._id);
    console.log("U USERID imam info " + userID);

    Order.aggregate([
      {
        $match: {
          user: userID,
        },
      },
      {
        $lookup: {
          from: Partner.collection.name,
          localField: "restaurant",
          foreignField: "_id",
          as: "restoran",
        },
      },
    ])
      .then((porucio) => {
        console.log("vraca po user-u " + JSON.stringify(porucio));
        //console.log("/nrestoran " + JSON.stringify(porucio));
        res.status(200).send(porucio);
      })
      .catch((err) => res.status(400).send(err));
  }
);
/*return res.status(200).send({
      user: {
        id: req.user._id,
        email: req.user.email,
      },
    });
  }
);

/*router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //console.log("token " + req.getParameter("token")); // bar
    console.log("id " + req.user._id);
    console.log("email " + req.user.email);
    var korisnik = { id: req.user._id, email: req.user.email };
    console.log("token " + JSON.stringify(korisnik));
    return res.status(200).send({
      success: true,
      user: korisnik,
    });

    // bar
    /*jwt.verify(req.body.token, "Random string", function (err, decoded) {
    console.log(decoded); // bar
  });
    ////Vraca sve porudžbine iz baze iskljucujuci jedino polje verzija pri prikazu objekta
    userID = mongoose.Types.ObjectId("6242ebcdd1aa234555054638");

    /*var porucio = Order.aggregate([
    {
      $match: { user: { _id: "6242ebcdd1aa234555054638" } },
    },
  ]);
  console.log("vraca po user-u " + porucio);*/
// $match: { user: { _id: "6242ebcdd1aa234555054638" } },
/* Order.aggregate([
      {
        $match: {
          user: userID,
        },
      },
      {
        $lookup: {
          from: Partner.collection.name,
          localField: "restaurant",
          foreignField: "_id",
          as: "restoran",
        },
      },
    ]).then((porucio) => {
      // console.log("vraca po user-u " + JSON.stringify(porucio));
      //console.log("restoran " + JSON.stringify(porucio));
    });

    /* Order.find()
    .select("-__v")
    .then((orders) => {
      orders.map((order) =>
        Partner.findById(order.restaurant).then((partner) => {
          console.log(partner);
          //dovlači naziv partnera na osnovu id-ja restorana

          if (partner !== null) {
            console.log(order.restaurant);
            console.log(orders.restaurant);
            console.log(partner.name);
            orders.restaurant = partner.name;
            console.log(order.restaurant);
            console.log(orders.restaurant);
          } else {
            //res.status(404).send("Partner ne postoji");
            console.log("greska");
          }
        })
      );
      res.status(200).send(orders);
      console.log(orders);
    })
    .catch((err) => res.status(400).send(err));*/
//}
//); */

router.post(
  "/",
  passport.authenticate("korisnik", { session: false }),
  (req, res) => {
    console.log("pronasao sam korisnika" + req.user._id);
    if (req.user._id === null) {
      res.status(401).send({ msg: "Korisnik nije autorizovan" });
    }
    //čuvanje podataka iz poziva servisa
    const t_user = req.user._id;
    const t_offer = req.body.offerID;
    const t_dish = req.body.dish;
    const t_price = req.body.price;
    const t_restaurant = req.body.restaurant;
    const t_dateFrom = req.body.dateFrom;
    const t_endDate = req.body.endDate;
    //kreiranje nove ponude
    const order = new Order({
      user: t_user,
      offer: t_offer,
      dish: t_dish,
      price: t_price,
      restaurant: t_restaurant,
      dateFrom: t_dateFrom,
      endDate: t_endDate,
    });
    //cuvanje nove ponude u bazi
    order
      .save()
      .then((order) => {
        res.status(200).send({
          success: true,
          msg: "Uspesno ste rezervisali ponudu",
          // foundUser: req.user,
          newOrder: order,
        });
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
        res.status(400).send(err);
      });
  }
);

router.get("/:id", (req, res) => {
  Order.findById(req.params.id)
    .then((o) => {
      if (o != null) res.status(200).send(o);
      else {
        res.status(404).send("Porudzbina ne postoji");
        console.log(res);
      }
    })
    .catch((err) => res.status(500).send(err));
});

router.delete("/:id", (req, res) => {
  Order.findByIdAndDelete(req.params.id)
    .then((o) => {
      if (o != null) res.status(200).send(o);
      else res.status(404).send("Porudzbina ne postoji");
    })
    .catch((err) => res.status(500).send(err));
});

router.put("/:id", (req, res) => {
  console.log("novi");
  console.log(JSON.stringify(req.body));
  Order.findByIdAndUpdate(req.params.id, req.body)
    .then((o) => {
      if (o != null) {
        res.status(200).send(o);
        console.log(o);
      } else res.status(404).send("Porudzbina ne postoji");
    })
    .catch((err) => res.status(500).send(err));
});

/*router.get("/restaurants/:id", (req, res) => {
  console.log("ovde");
  console.log("query" + req.query);
  console.log("id:" + req.params.id);
  console.log("paramS" + req.params.restaurant);
  Offer.find({ restaurant: ObjectId(req.params.id.restaurant) })
    .then((o) => {
      if (o != null) {
        res.status(200).send(o);
        console.log(o);
      } else {
        res.status(404).send("Nemate unete ponude");
        console.log(res);
      }
    })
    .catch((err) => res.status(500).send(err));
});*/

module.exports = router;
