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

app.use(cors());
app.use(express.json());
//uvezivanje ruta nakon 404 greske
app.use("/users", users);
app.use("/offers", offers);
app.use("/partners", partners);
app.use("/login", login);
app.use("/orders", orders);

const MONGO_URL =
  "mongodb+srv://ksavic:ksavic@cluster0.it7mg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(MONGO_URL, { useNewUrlParser: true });

mongoose.connection.once("open", () =>
  console.log("Connected to the database")
);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

var userSchema = new mongoose.Schema(
  { 
    ime: String,
    prezime: String,
    createdOn: Date
  });