const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const app = express();
const path = require("path");
const { error } = require("console");
const methodOverride = require("method-override");
const { connected } = require("process");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "Collage",
});

function createRandomUser() {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
}

app.get("/", (req, res) => {
  let q = "select count(*) as count  from user";
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      console.log(result);
      // res.send(`<h1>Number of Record : ${result[0]["count"]}</h1>`);
      let count = result[0]["count"];
      res.render("home.ejs", { count });
    });
  } catch (err) {
    console.log(err);
    res.send("Database Error");
  }
});

app.get("/users", (req, res) => {
  try {
    let q = "select * from user";
    connection.query(q, (err, result) => {
      if (err) throw err;
      // console.log(result);
      res.render("allusers.ejs", { users: result });
      // res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/user/:id/edit", (req, res) => {
  try {
    let { id } = req.params;
    console.log(id);

    let q = `select * from user where id='${id}'`;
    connection.query(q, (err, result) => {
      if (err) throw err;
      console.log(result[0]);
      res.render("edit.ejs", { user: result[0] });
    });
  } catch (err) {
    console.log(err);
  }
});

//Update Username
app.patch("/user/:id", (req, res) => {
  try {
    let { id } = req.params;
    console.log(id);

    let { username: newUsername, password: formPass } = req.body;

    let q = `select * from user where id='${id}'`;
    connection.query(q, (err, result) => {
      if (err) throw err;
      // console.log(result);
      let user = result[0];
      if (formPass != user.password) {
        res.send("Wrong password");
      }
      // console.log(user);
      // res.send(user);

      try {
        let updateQuery = `update user set username='${newUsername}' where id='${id}' `;
        connection.query(updateQuery, (err, result) => {
          if (err) throw err;

          res.send(`
      <script>
         alert("Username Updated Successfully!");
         window.location.href="/users";
      </script>
   `);
        });
      } catch (err) {
        console.log(err);
        // alert("Error on Update password ");
      }
    });
  } catch (err) {
    console.log("Invalide Id or  password");
  }
});

app.get("/user/add", (req, res) => {
  res.render("adduser.ejs");
});

app.post("/user/add", (req, res) => {
  try {
    let { id, username, password, email } = req.body;
    let q = `insert into user(id,username,password,email) values(?,?,?,?)`;
    connection.query(q, [id, username, password, email], (err, result) => {
      if (err) throw err;
      // res.redirect("/users");
      res.send(`
      <script>
         alert("User Add Successfully!");
         window.location.href="/users";
      </script>
   `);
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/user/:id/delete", (req, res) => {
  let { id } = req.params;
  try {
    let q = `delete from user where id='${id}'`;
    connection.query(q, (err, result) => {
      if (err) throw err;
      res.send(`
      <script>
         alert("Delete user id ${id} Successfully!");
         window.location.href="/users";
      </script>
   `);
    });
  } catch (err) {
    console.log(err);
  }
});

//Add New User

// app.post("user/add")

// app.patch("/user/:id", (req, res) => {
//   let { id } = req.params;
//

//   let q = update
// });

// connection.end();

app.listen("8080", () => {
  console.log("Server is Running on port 8080");
});

// try {
//   connection.query("show tables", (err, result) => {
//     if (err) throw err;
//     console.log(result);
//   });
// } catch (err) {
//   console.log(err);
// }

// try {
//   connection.query(q, [data], (err, result, field) => {
//     if (err) throw err;
//     console.log(result);
//   });
// } catch (err) {
//   console.log(err);
// }

// Insert into database?

// let q = "insert into user(id,username,email,password) values ?";
// // let userData = [123, "Ganesh", "ganu@gmail.com", "harish"];

// let data = [];
// for (let i = 1; i <= 100; i++) {
//   data.push(createRandomUser());
// }l
