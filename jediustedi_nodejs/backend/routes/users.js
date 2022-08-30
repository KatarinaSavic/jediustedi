const express = require("express"); //ucitavanje biblioteke express
const router = express.Router(); //ucitavanje biblioteke router
const User = require("../models/user.model"); //ucitavanje modela za fizicka lica
//bcrypt kriptovanje lozinke
const { hashSync } = require("bcrypt");

router.post("/", (req, res) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");

  var csrf_token = document
    .querySelector("meta[name='csrf-token']")
    .getAttribute("content");

  axios.defaults.headers.post["anti-csrf-token"] = csrf_token;

  //čuvanje podataka iz poziva servisa
  const t_name = req.body.name;
  const t_email = req.body.email;
  const t_password = hashSync(req.body.password, 10);
  //const t_type = req.body.type;
  //kreiranje novog korisnika
  const user = new User({
    name: t_name,
    email: t_email,
    password: t_password,
    //type: t_type,
  });
  //Provera da li korisnik već postoji na osnovu email-a koji mora biti jedinstven
  User.findOne({ email: user.email }, (err, result) => {
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
      user
        .save()
        .then((user) =>
          res.status(200).send({ user, infoText: "Registracija uspela" })
        );
    }
  });
});

router.get("/:email/:pass", (req, res) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  User.findOne({ email: req.params.email }, (err, res) => {
    if (err) {
      //doslo je do neke greske
      console.log("greska");
      return;
    }
    if (res) {
      if (res.password == req.params.pass) {
        // sve ok
        console.log("sve ok");
      } else {
        console.log("pogresan pass");
        // pogresan pass
      }
    } else {
      console.log("ne postoji user");
      // ne postoji user sa prosledjenim mailom
    }
  });
});

module.exports = router;
