const { default: mongoose } = require("mongoose"); //ucitavanje mongoose biblioteke

//definisanje seme za ponude poslovnih partnera
const offerSchema = new mongoose.Schema({
  dish: { type: String, required: true },
  dishImg: { type: String, required: true },
  price: { type: String, required: true },
  city: { type: String, required: true },
  status: { type: String, required: true },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Partner" },
  dateFrom: { type: Date },
  endDate: { type: Date },
  kitchenType: { type: String },
});
//definisanje modela za ponude poslovnih partnera
const Offer = mongoose.model("Offer", offerSchema);
module.exports = Offer;
