const mongoose = require("mongoose");
const Chat = require("./Models/chat.js");

main()
  .then(() => {
    console.log("Datanase Connection Successfull !!");
  })
  .catch(() => {
    console.log("Error to Connect With Database");
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Whatsapp");
}

let allChats = [
  {
    to: "ganu",
    from: "Harish",
    message: "Hi I am Ganu",
    created_at: new Date(),
  },
  {
    to: "Rahul",
    from: "Amit",
    message: "Hello Rahul, how are you?",
    created_at: new Date(),
  },
  {
    to: "Sneha",
    from: "Priya",
    message: "Meeting at 5 PM today",
    created_at: new Date(),
  },
  {
    to: "Rohit",
    from: "Karan",
    message: "Send me the project files",
    created_at: new Date(),
  },
  {
    to: "Neha",
    from: "Pooja",
    message: "Happy Birthday 🎉",
    created_at: new Date(),
  },
  {
    to: "Vikas",
    from: "Anjali",
    message: "Let's go for lunch",
    created_at: new Date(),
  },
  {
    to: "Aditya",
    from: "Sakshi",
    message: "Assignment completed?",
    created_at: new Date(),
  },
];

Chat.insertMany(allChats);
