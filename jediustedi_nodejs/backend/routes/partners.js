const express = require("express");

const router = express.Router();

const Partner = require("../models/partner.model");

router.post("/", (req, res) => {
  const t_name = req.body.name;
  //const t_logo = req.body.logo;
  const t_address = req.body.address;
  const t_city = req.body.city;
  const t_working_hours = req.body.working_hours;
  const t_phone = req.body.phone;
  const t_email = req.body.email;
  const t_password = req.body.password;

  const partner = new Partner({
    name: t_name,
    //logo: t_logo,
    address: t_address,
    city: t_city,
    working_hours: t_working_hours,
    phone: t_phone,
    email: t_email,
    password: t_password,
  });

  Partner.findOne({ email: partner.email }, (err, result) => {
    if (err) {
      res.status(400).send({ err, infoText: "Doslo je do greske" });
    }
    if (result) {
      res.status(200).send({
        result,
        infoText:
          "Registracija nije uspela, vec postoji korisnik sa istom email adresom.",
      });
    } else {
      partner
        .save()
        .then((partner) =>
          res.status(200).send({ partner, infoText: "Registracija uspela" })
        );
    }
  });
});

router.get("/", (req, res) => {
  Partner.find()
    .select("email name logo address city working_hours phone  -_id")
    .then((partners) => res.status(200).send(partners))
    .catch((err) => res.status(400).send(err));
});

module.exports = router;
