const express = require("express"); //ucitavanje biblioteke express
const router = express.Router(); //ucitavanje biblioteke router
const User = require("../models/user.model"); //ucitavanje modela za fizicka lica
const { default: mongoose } = require("mongoose");
//bcrypt kriptovanje lozinke
const { hashSync } = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

router.post("/", (req, res) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");

  /*var csrf_token = document
    .querySelector("meta[name='csrf-token']")
    .getAttribute("content");

  axios.defaults.headers.post["anti-csrf-token"] = csrf_token;*/

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

router.put(
  "/",
  passport.authenticate("korisnik", { session: false }),
  (req, res) => {
    res.set("Access-Control-Allow-Origin", "http://localhost:3000");
    userID = mongoose.Types.ObjectId(req.user._id);
    //pronalazi korisnika na osnovu prosledjenog ID-ja i azurira polja sa novim vrednostima
    User.findByIdAndUpdate(userID, req.body)
      .then((u) => {
        if (u != null) {
          res.status(200).send(u);
        } else res.status(404).send("Korisnik ne postoji");
      })
      .catch((err) => res.status(500).send(err));
  }
);

router.get(
  "/profileData",
  passport.authenticate("korisnik", { session: false }),
  (req, res) => {
    res.set("Access-Control-Allow-Origin", "http://localhost:3000");
    console.log("tu sam ");
    console.log(JSON.stringify(req.user));
    userID = mongoose.Types.ObjectId(req.user._id);
    console.log(JSON.stringify(userID));
    User.findOne({ _id: userID }, (err, foundUser) => {
      if (foundUser) {
        //doslo je do neke greske
        console.log(foundUser);
        let cityCode;
        if (foundUser.city === "Beograd") cityCode = 10;
        else if (foundUser.city === "Nis") cityCode = 20;
        else cityCode = 30;
        const formatUser = {
          userCityCode: cityCode,
          preferences: foundUser.preferences,
        };
        res.status(200).send(formatUser);
      } else {
        console.log(err);
        res.status(404).send("Korisnik ne postoji");
      }
      // ne postoji user sa prosledjenim mailom
    });

    /*User.findById(req.user._id)
      .then((u) => {
        if (u != null) res.status(200).send(u);
        else {
          res.status(404).send("Ponuda ne postoji");
          console.log(res);
        }
      })
      .catch((err) => res.status(500).send(err));*/
  }
);

module.exports = router;
