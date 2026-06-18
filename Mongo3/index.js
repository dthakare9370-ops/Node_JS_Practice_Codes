const express = require("express");
const mongoose = require("mongoose");
const Chat = require("./Models/chat.js");
const path = require("path");
const { compose } = require("stream");
const methodOverride = require("method-override");

const app = express();

app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

app.listen("8080", (req, res) => {
  console.log("Server run on Port : 8080");
});

app.get("/", (req, res) => {
  res.send("<h1>Server is Running</h1>");
});

app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  // console.log(chats);
  //   res.send(chats);
  //   res.send("Chats read Successfull");
  res.render("index.ejs", { chats });
});

app.get("/chats/add", (req, res) => {
  res.render("addchat.ejs");
});

app.post("/chats", async (req, res) => {
  // console.log(req.body);
  try {
    const { to, from, message, created_at } = req.body;
    let chatData = new Chat({
      to,
      from,
      message,
      created_at,
    });

    const data = await chatData.save();
    // res.status(200).send({ data });
    console.log("Chat add into Database");
    res.redirect("/Chats");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

//Edit Data
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  try {
    let chat = await Chat.findById(id);
    // console.log(chat);
    res.render("editChat.ejs", { chat });
  } catch (err) {
    console.log(err);
  }
});

app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;

  let { newmsg } = req.body;
  let updateChat = await Chat.findByIdAndUpdate(
    id,
    { message: newmsg },
    { runValidator: true, new: true },
  );
  console.log(updateChat);
  res.redirect("/chats");
});

app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let data = await Chat.findByIdAndDelete(id);
  res.redirect("/chats");
});
