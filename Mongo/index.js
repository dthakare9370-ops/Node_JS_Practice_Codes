const mongoose = require("mongoose");

main()
  .then((res) => {
    console.log("Connection Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Hospital");
}

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

//Model collection internally User asel tar Users karto
const User = mongoose.model("User", userSchema);

// *** Add User ****
const user1 = new User({
  name: "Dnyaneshwar",
  email: "Dnyaneshwar@gmail.com",
  age: 20,
});

//  ***** Save user data into the Database ******
user1
  .save()
  .then((res) => {
    console.log("User Data save in Database");
    console.log(res);
  })
  .catch((err) => {
    console.log("Error to Save the user Data ");
    console.log(err);
  });

// *** Search User all ****
// User.find({ age: { $gt: 20 } })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// *** Search User one ****
// User.findOne({ _id: "6a084e8801b9aed1c69cba57" })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// *** Search User by using id  ****
// User.findById("6a084e8801b9aed1c69cba57")
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// *** Update One ****
// User.updateOne({ _id: "6a084e8801b9aed1c69cba57" }, { email: "h@gmail.com" })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// *** Update Many ***
// User.updateMany({ age: { $gt: 39 } }, { __v: 2 })
//   .then((res) => {
//     console.log("Update record Successfully", res.modifiedCount);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// ***** Find One and Update Single User *****
// User.findOneAndUpdate(
//   { _id: "6a094975ec342fafc389d0f4" },
//   { email: "h@gmail.com" },
//   { new: true }, // if true then return the New Modify record otherwise it will return the previus record
// )
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// ***** Delete Single User *****
// User.deleteOne({ age: 50 })
//   .then((res) => {
//     console.log("Delete user Successfully Count : ", res.deletedCount);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// *** Delete Many User ****
// User.deleteMany({ age: 20 })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// *** Delete any User ****
User.findByIdAndDelete({ age: 20 })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
