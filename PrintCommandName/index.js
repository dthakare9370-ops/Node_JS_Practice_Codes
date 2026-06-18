// const figlet = require("figlet");
import figlet from "figlet";

figlet("Dadaji Thakare", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(data);
});
