const router = require("express").Router();

const Offer = require("../models/offer.model");

router.get("/", (req, res) => {
  Offer.find()
    .select("-__v")
    .then((offers) => res.status(200).send(offers))
    .catch((err) => res.status(400).send(err));
});

router.post("/", (req, res) => {
  const t_dish = req.body.dish;
  const t_dishImg = req.body.dishImg;
  const t_price = req.body.price;
  const t_restaurant = req.body.restaurant;
  const t_city = req.body.city;
  const t_status = req.body.status;
  const t_dateFrom = req.body.dateFrom;
  const t_endDate = req.body.endDate;

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
  offer
    .save()
    .then((offer) => {
      res.status(200).send(offer);
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
      res.status(400).send(err);
    });
});

router.get("/:id", (req, res) => {
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
  Offer.findByIdAndDelete(req.params.id)
    .then((o) => {
      if (o != null) res.status(200).send(o);
      else res.status(404).send("Ponuda ne postoji");
    })
    .catch((err) => res.status(500).send(err));
});

router.put("/:id", (req, res) => {
  console.log("novi");
  console.log(JSON.stringify(req.body));
  Offer.findByIdAndUpdate(req.params.id, req.body)
    .then((o) => {
      if (o != null) {
        res.status(200).send(o);
        console.log(o);
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
