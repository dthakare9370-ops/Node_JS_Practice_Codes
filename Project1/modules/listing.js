const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    filename: {
      type: String,
      default: "listingimage",
    },

    url: {
      type: String,

      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRglVAsBLaNY7-3qaaWDSFs2bMPmZdZQ7y8xQ&s",

      set: (v) =>
        v === ""
          ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRglVAsBLaNY7-3qaaWDSFs2bMPmZdZQ7y8xQ&s"
          : v,
    },
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
});

const Listing = mongoose.model("Listing", ListingSchema);

module.exports = Listing;
