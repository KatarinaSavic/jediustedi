const express = require("express"); //ucitavanje biblioteke express
const router = express.Router(); //ucitavanje biblioteke router
const Partner = require("../models/partner.model"); //ucitavanje modela za poslovne partnere
//bcrypt kriptovanje lozinke
const { hashSync } = require("bcrypt");

router.post("/", (req, res) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  //čuvanje podataka iz poziva servisa
  const t_name = req.body.name;
  //const t_logo = req.body.logo;
  const t_address = req.body.address;
  const t_city = req.body.city;
  const t_working_hours = req.body.working_hours;
  const t_phone = req.body.phone;
  const t_email = req.body.email;
  const t_password = hashSync(req.body.password, 10);
  //kreiranje novog korisnika
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
  //Provera da li korisnik već postoji na osnovu email-a koji mora biti jedinstven
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
      //cuvanje korisnika u bazi
      partner
        .save()
        .then((partner) =>
          res.status(200).send({ partner, infoText: "Registracija uspela" })
        );
    }
  });
});

router.get("/", (req, res) => {
  //pronalazi sve partnere iz baze i vraca sve parametre sem generickog id-ja
  Partner.find()
    .select("email name logo address city working_hours phone  -_id")
    .then((partners) => res.status(200).send(partners))
    .catch((err) => res.status(400).send(err));
});

router.get("/:id", (req, res) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  Partner.findById(req.params.id)
    .then((p) => {
      if (p != null) res.status(200).send(p.name);
      else {
        res.status(404).send("Partner ne postoji");
        console.log(res);
      }
    })
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
