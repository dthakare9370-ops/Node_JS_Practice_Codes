import express from "express";
const app = express();

let port = 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.listen(port, () => {
  console.log(`Server is running on Port : ${port}`);
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/register", (req, res) => {
  let { user, pass } = req.query;
  res.send(`Username : ${user} <br> Pass : ${pass}`);
});

app.post("/register", (req, res) => {
  let { user, pass } = req.body;
  res.send(`Username : ${user} <br> Pass : ${pass}`);
});
