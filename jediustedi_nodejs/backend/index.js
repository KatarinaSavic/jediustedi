const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const users = require("./routes/users");
const offers = require("./routes/offers");
const partners = require("./routes/partners");
const login = require("./routes/login");
const orders = require("./routes/orders");
//JWT
const jwt = require("jsonwebtoken");
const passport = require("passport");
//const csrf = require("csurf");
//const cookieParser = require("cookie-parser");
//const bodyParser = require("body.parser");
require("./passport");

//bcrypt kriptovanje lozinke
const { hashSync } = require("bcrypt");
const { NestCamWiredStand } = require("@mui/icons-material");
//antiCSFR token

////const csrfProtection = csrf({ cookie: true });

/*const corsOptions = {
  origin: "http://localhost:3000",
 credentials: true, //access-control-allow-credentials:true
};

app.use(cors(corsOptions));*/
app.use(cors());
app.use(express.json());

//app.use(cookieParser());
//app.use(csrfProtection);
//app.use(cookieParser());

//dodala sam jer ne radi
app.use(passport.initialize());
//uvezivanje ruta nakon 404 greske
app.use("/users", users);
app.use("/offers", offers);
app.use("/partners", partners);
app.use("/login", login);
app.use("/orders", orders);

/*app.get("/getCSRFToken", (req, res) => {
  console.log("get token na beku" + req.csrfToken());
  //res.cookie("XSRF-TOKEN", req.csrfToken());
  res.json({ CSRFToken: req.csrfToken() });
});*/

/*app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});*/

/*Primeni na druge JWT
app.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.status(200).send({
      user: {
        id: req.user._id,
        username: req.user.username,
      },
    });
  }
);
*/
const MONGO_URL =
  "mongodb+srv://ksavic:ksavic@cluster0.it7mg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(MONGO_URL, { useNewUrlParser: true });

mongoose.connection.once("open", () =>
  console.log("Connected to the database")
);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

/*var userSchema = new mongoose.Schema({
  ime: String,
  prezime: String,
  createdOn: Date,
});*/
