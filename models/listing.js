const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: String,

  image: {
    type: String,
    default:
      "https://img.freepik.com/free-photo/beautiful-tropical-nature_23-2151979595.jpg",
    set: (v) =>
      v === ""
        ? "https://img.freepik.com/free-photo/beautiful-tropical-nature_23-2151979595.jpg"
        : v,
  },

  price: {
    type: Number,
    required: true,
    min: 0,
  },

  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
