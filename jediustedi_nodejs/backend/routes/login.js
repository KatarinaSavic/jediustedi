const express = require("express");
const router = express.Router();
const cors = require("cors");

//JWT web token
const jwt = require("jsonwebtoken");

//bcrypt kriptovanje lozinke
const { hashSync, compareSync } = require("bcrypt");

const User = require("../models/user.model"); //ucitavanje modela za fizicka lica
const Partner = require("../models/partner.model"); //ucitavanje modela za poslovne partnere
/**
 * Proverava da li email pripada fizickom licu ili poslovnom partneru i da li je uneta lozinka tacna
 * vraca ulogovanog korisnika i njegov tip
 */
router.get("/:email/:pass", (req, response) => {
  User.findOne({ email: req.params.email }, (err, user) => {
    if (err) {
      response.status(400).send({
        err,
        msg: "Doslo je do greske",
      });
      return;
    }
    if (user) {
      if (compareSync(req.params.pass, user.password)) {
        console.log(err);
        //JWT token promenila sam res na req, a posle toga res u user
        const payload = {
          email: user.email,
          id: user._id,
          //userType: "korisnik",
        };
        const token = jwt.sign(payload, "Random string", { expiresIn: "1d" });
        /////////
        /* response.status(200).send({
          msg: "korisnik",
          user: user,
          token: "Bearer " + token,
        });*/
        response.status(200).send({
          success: true,
          msg: "korisnik",
          token: "Bearer " + token,
          foundUser: user,
        });
      } else {
        response.status(401).send({
          msg: "korisnik pogresan pass",
          success: false,
        });
      }
    } else {
      Partner.findOne({ email: req.params.email }, (err, user) => {
        if (err) {
          response.status(400).send({
            err,
            msg: "Doslo je do greske",
          });
          return;
        }
        if (user) {
          if (compareSync(req.params.pass, user.password)) {
            //JWT token promenila sam res na req, a posle toga res u user
            const payload = {
              email: user.email,
              id: user._id,
              //userType: "partner",
            };
            const token = jwt.sign(payload, "Random string", {
              expiresIn: "1d",
            });
            response.status(200).send({
              success: true,
              msg: "partner",
              token: "Bearer " + token,
              foundUser: user,
            });
          } else {
            response.status(200).send({
              msg: "partner pogresan pass",
            });
          }
        } else {
          response.status(200).send({
            msg: "ne postoji",
          });
        }
      });
      // ne postoji user sa prosledjenim mailom
    }
  });
});

module.exports = router;
