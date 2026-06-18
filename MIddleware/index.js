const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Middleware
// app.use(Path,callback,next)

// middleware आपण जेव्हा एखादा यूजर डायरेक्ट api अॅक्सेस करायचं try करत असेल तर middleware ने आपण चेक करायच यूजर लॉगिन आहे का किवहा तीला अॅक्सेस आहे का मग api access karude
//app.use हे नंतर ईहून चालत नाही पहिले लिहायला पाहिजे
//आणि लास्ट ला पान लिहू शकतो पान टी साथी 404 एरर दातही

// app.use("/", (req, res, next) => {
//   console.log("Middleware 1");
//   next();
// });

const checkToken = (req, res, next) => {
  let { token } = req.query;
  if (token === "giveaccess") {
    return next();
  }
  res.send("Access denide !!!");
};

app.use("/api", checkToken, (req, res) => {
  res.send("Welcome Dnyaneshwar Thakare in Java Course");
});

app.get("/", (req, res) => {
  res.send("Server is Running ");
});

app.listen(8080, () => {
  console.log("Server is run on Port : 8080");
});
