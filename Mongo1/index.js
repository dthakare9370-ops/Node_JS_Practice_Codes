const mongoose = require("mongoose");

main()
  .then((res) => {
    console.log("Connection Successfully wi Database");
  })
  .catch((err) => {
    console.log("Connection Fail ");
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/amazon");
}

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 20,
  },
  author: {
    type: String,
  },
  price: {
    type: Number,
    min: [1, "The Book price is Not less than 1 Rupees"],
  },
  //   category: {
  //     type: String,
  //     enum: ["commics", "funny", "study"],
  //   },

  genre: [String],
  discount: {
    type: Number,
    default: 0,
  },
});

const Book = mongoose.model("Book", bookSchema);

// let Book1 = new Book({
//   title: "java",
//   author: "harish",
//   price: "563",
//   //   category: "study",
//   genre: ["Superhero", "commics"],
//   discount: 10,
// });

// Book1.save()
//   .then((res) => {
//     console.log("Book Data save");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

Book.findByIdAndUpdate(
  "6a097a16901feb7d51c0ec1b",
  { price: -5 },
  {
    runValidators: true,
    //  new: true
  },
)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err.errors.price.properties.message);
  });
