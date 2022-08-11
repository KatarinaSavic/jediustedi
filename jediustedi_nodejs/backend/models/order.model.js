const { default: mongoose } = require("mongoose"); //ucitavanje mongoose biblioteke

//offers: { type: [mongoose.Schema.Types.ObjectId], ref: "Offer" }

//definisanje seme za porudzbine fizickih lica
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  offer: { type: mongoose.Schema.Types.ObjectId, ref: "Offer" },
  dish: { type: String },
  price: { type: String },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Partner" },
  dateFrom: { type: Date },
  endDate: { type: Date },
});

//definisanje modela za porudzbine fizickih lica
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
