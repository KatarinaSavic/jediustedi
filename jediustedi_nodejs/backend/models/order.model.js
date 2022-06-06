const { default: mongoose } = require("mongoose");
const mongoode = require("mongoose");

//offers: { type: [mongoose.Schema.Types.ObjectId], ref: "Offer" }

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  offer: { type: mongoose.Schema.Types.ObjectId, ref: "Offer" },
  dish: { type: String },
  price: { type: String },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Partner" },
  dateFrom: { type: Date },
  endDate: { type: Date },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
