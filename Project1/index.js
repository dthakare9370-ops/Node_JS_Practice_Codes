const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./modules/listing");
const path = require("path");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

save()
  .then((res) => {
    console.log("DB Connection Successfull");
  })
  .catch((err) => {
    console.log("DB Connection Error");
  });

async function save() {
  await mongoose.connect("mongodb://127.0.0.1:27017/woderlust");
}

app.listen(8080, () => {
  console.log("Server Run on Port : 8080");
});

app.get("/", (req, res) => {
  res.status(200).send("Server is Running");
});

app.get("/listings", async (req, res) => {
  try {
    const allListings = await Listing.find();
    res.render("index.ejs", { allListings });
    // res.status(200).send(data);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  // console.log(id);
  let listing = await Listing.findById(id);
  res.render("show.ejs", { listing });
});

app.post("/listings/add", async (req, res) => {
  let data = req.body;
  console.log(data);

  let { title, price, location, description, image, country } = req.body;

  try {
    const newListing = new Listing({
      title,
      description,
      image,
      price,
      location,
      country,
    });

    const savedListing = await newListing.save();
    console.log("Data Insert Database Successfully !!");

    res.status(201).json({
      success: true,
      message: "Listing added successfully",
      data: savedListing,
    });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});
