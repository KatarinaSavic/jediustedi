const router = require("express").Router();

const Order = require("../models/order.model");
const Offer = require("../models/offer.model");
const Partner = require("../models/partner.model");

router.get("/", (req, res) => {
  Order.find()
    .select("-__v")
    .then((orders) => {
      orders.map((order) =>
        Partner.findById(order.restaurant).then((partner) => {
          console.log(partner);

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
    .catch((err) => res.status(400).send(err));
});

router.post("/", (req, res) => {
  const t_user = req.body.userID;
  const t_offer = req.body.offerID;
  const t_dish = req.body.dish;
  const t_price = req.body.price;
  const t_restaurant = req.body.restaurant;
  const t_dateFrom = req.body.dateFrom;
  const t_endDate = req.body.endDate;

  console.log(t_user);
  console.log(t_offer);
  //let offerArr = [];
  //offerArr.push(t_offer);
  const order = new Order({
    user: t_user,
    offer: t_offer,
    dish: t_dish,
    price: t_price,
    restaurant: t_restaurant,
    dateFrom: t_dateFrom,
    endDate: t_endDate,
  });

  //order.offer.append(t_offer);
  console.log(order);

  console.log(JSON.stringify(order));
  order
    .save()
    .then((order) => {
      res.status(200).send(order);
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
      res.status(400).send(err);
    });
});

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
