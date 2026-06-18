import axios from "axios";

async function getData() {
  let res = await axios.get("https://jsonplaceholder.typicode.com/users");
  console.log(res.data[0]);
}

console.log("start code");
await getData();
console.log("End Code");
