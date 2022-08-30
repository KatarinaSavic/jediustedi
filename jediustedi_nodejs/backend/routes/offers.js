const router = require("express").Router();

const Offer = require("../models/offer.model");
const Partner = require("../models/partner.model");

//JWT i passport
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { default: mongoose } = require("mongoose");
require("../passport");

router.get("/", (req, res) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  //Vraca sve ponude iz baze iskljucujuci jedino polje verzija pri prikazu objekta
  Offer.find()
    .select("-__v")
    .then((offers) => res.status(200).send(offers))
    .catch((err) => res.status(400).send(err));
});

router.get("/active", (req, res) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
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
      //console.log("vraca po user-u " + JSON.stringify(porucio));
      //console.log("/nrestoran " + JSON.stringify(porucio));
      res.status(200).send(porucio);
    })
    .catch((err) => res.status(400).send(err));
});

router.get(
  "/personal",
  passport.authenticate("partner", { session: false }),
  (req, res) => {
    res.set("Access-Control-Allow-Origin", "http://localhost:3000");
    partnerID = mongoose.Types.ObjectId(req.user._id);
    Offer.aggregate([
      {
        $match: {
          restaurant: partnerID,
        },
      },
    ])
      .then((personalOffers) => {
        //console.log("vraca po user-u " + JSON.stringify(porucio));
        //console.log("/nrestoran " + JSON.stringify(porucio));
        res.status(200).send(personalOffers);
      })
      .catch((err) => res.status(400).send(err));
  }
);

router.post(
  "/",
  passport.authenticate("partner", { session: false }),
  (req, res) => {
    //res.set("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    //const cookie = req.headers.cookie;
    // if (cookie) {
    //res.set("Access-Control-Allow-Headers", "X-CSRF-Token");
    //res.set("X-CSRF-Token", req.csrfToken());
    //res.cookie("X-XSRF-TOKEN", req.csrfToken());

    //axios.defaults.headers.post["X-CSRF-Token"] = axios.get("/getCSRFToken");
    //Axios.defaults.headers.common["X-CSRF-TOKEN"] = //req.csrfToken();
    console.log("pronasao sam korisnika" + req.user);
    //čuvanje podataka iz poziva servisa
    const t_dish = req.body.dish;
    const t_dishImg = req.body.dishImg;
    const t_price = req.body.price;
    const t_restaurant = req.user._id;
    //const t_city = req.user.city;
    const t_city = "Beograd";
    const t_status = req.body.status;
    const t_dateFrom = req.body.dateFrom;
    const t_endDate = req.body.endDate;
    //kreiranje nove ponude
    const offer = new Offer({
      dish: t_dish,
      dishImg: t_dishImg,
      price: t_price,
      restaurant: t_restaurant,
      city: t_city,
      status: t_status,
      dateFrom: t_dateFrom,
      endDate: t_endDate,
    });
    console.log(JSON.stringify(offer));
    //cuvanje ponude u bazi
    offer
      .save()
      .then((offer) => {
        res.status(200).send(offer);
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
        res.status(400).send(err);
      });
    // } else {
    // res.sendStatus(403);
    // res.end();
    // }
  }
);

router.get("/:id", (req, res) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  Offer.findById(req.params.id)
    .then((o) => {
      if (o != null) res.status(200).send(o);
      else {
        res.status(404).send("Ponuda ne postoji");
        console.log(res);
      }
    })
    .catch((err) => res.status(500).send(err));
});

router.delete("/:id", (req, res) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  //pronalazi ponudu na osnovu prosledjenog ID-ja i brise je iz baze
  Offer.findByIdAndDelete(req.params.id)
    .then((o) => {
      if (o != null) res.status(200).send(o);
      else res.status(404).send("Ponuda ne postoji");
    })
    .catch((err) => res.status(500).send(err));
});

router.put("/:id", (req, res) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  //pronalazi ponudu na osnovu prosledjenog ID-ja i azurira polja sa novim vrednostima
  Offer.findByIdAndUpdate(req.params.id, req.body)
    .then((o) => {
      if (o != null) {
        res.status(200).send(o);
      } else res.status(404).send("Ponuda ne postoji");
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
