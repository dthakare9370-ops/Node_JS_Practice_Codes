//Constructor using the Function

// function Person(name, age) {
//   this.age = age;
//   this.name = name;
// }

// Person.prototype.talk = function () {
//   console.log(`hi i am ${this.name}`);
// };

// let p1 = new Person("ganu", 25);
// let p2 = new Person("Harish", 23);

//Constructor Using the Classes and object

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  talk() {
    console.log(`hi i am ${this.name}`);
  }

  //   talk = () => {
  //     console.log(`hi i am ${this.name}`);
  //   };
}

let p1 = new Person("Tanmay ", 25);
let p2 = new Person("Harish", 23);
