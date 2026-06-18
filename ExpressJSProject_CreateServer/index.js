import express from "express";
const app = express();

let port = 3000;

app.listen(port, () => {
  console.log(`Server is lisrtening at port : ${port}`);
});

app.use((req, res) => {
  //   console.log(req);
  console.log("Request Receive");

  //   res.send("hello");
  //   res.send("<h1> Dnyaneshwar Thakare");
  res.send({
    name: "Ganesh",
    mobile: 102030,
  });
});

// app.get("/", () => {

// });
