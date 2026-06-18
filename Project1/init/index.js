const mongoose = require("mongoose");
const data = require("../modules/listing.js");
const initData = require("./data.js");
const Listing = require("../modules/listing.js");

save()
  .then(() => {
    console.log("DB Conneted Successfully !!");
  })
  .catch(() => {
    console.log("DB Connection Issue");
  });

async function save() {
  await mongoose.connect("mongodb://127.0.0.1:27017/woderlust");
}

const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data);
  console.log("Data Insert Successfully ");
};

initDB();
