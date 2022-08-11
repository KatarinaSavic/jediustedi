const mongoose = require("mongoose"); //ucitavanje mongoose biblioteke

//definisanje seme za fizicko lice
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String, required: true },
});

//definisanje modela za fizicko lice
const User = mongoose.model("User", userSchema);
module.exports = User;
