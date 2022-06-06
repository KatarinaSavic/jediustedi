const express = require("express");

const router = express.Router();

const User = require("../models/user.model");

router.post("/", (req, res) => {
  const t_name = req.body.name;
  const t_email = req.body.email;
  const t_password = req.body.password;
  const t_type = req.body.type;

  const user = new User({
    name: t_name,
    email: t_email,
    password: t_password,
    type: t_type,
  });
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
      user
        .save()
        .then((user) =>
          res.status(200).send({ user, infoText: "Registracija uspela" })
        );
    }
  });
});

router.get("/:email/:pass", (req, res) => {
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
