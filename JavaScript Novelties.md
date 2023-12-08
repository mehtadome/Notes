# JavaScript Novelties and more
Concepts / Syntax in Java that will be utilized in JS-based Frameworks frequently.

## Arrow Function Expessions
This is a regular function:
```
myFunction(x) {
    return x * x;
}
```
This is a Arrow function:
```
(x) => {
    return x * x;
}
```
These functions are primarily used in short callback functions like filter, reduce, map. Although they use the ```this``` practicality to function behind the scenes, they cannt be used as constructors. 

More Examples:
```
// Regular function
const square = function(x) {
  return x * x;
}

// Equivalent arrow function 
const square = (x) => {
  return x * x;
}

// Single parameter can omit parentheses
const square = x => {
  return x * x;
}

// Implied return for single-line functions
const square = x => x * x;
```

Callback Example:
```
// Regular function
[1,2,3].map(function(x) {
  return x * 2;
});

// Arrow function
[1,2,3].map(x => x * 2);
```

Objects Example:
```
// 'this' is bound lexically 
const person = {
  name: 'John',
  sayName: () => console.log(this.name)
}

person.sayName(); // 'John'

const person = {
  name: 'John',
  getName: function() {
    return this.name; 
  }
}

// Equivalent arrow function 
const person = {
  name: 'John',
  getName: () => this.name
}
```

## Destructuring Assignments
A JavaScript expression which makes it possible to unpack values from arrays, object properties, into distinct variables.
```
// Array destructuring
const [a, b] = [1, 2];

// Object destructuring 
const { name, age } = { name: 'John', age: 30 }; 

// Function parameter destructuring
function({name}) {
  console.log(name);
}

// Assign default values if the property is undefined
const {name = 'Default', role = 'guest'} = user;
```
Destructuring is clean, increases readability, and reduces errors from incorrect indexing.

### Array Destructuring
```
// Regular assignment
const array = [1, 2, 3];
const a = array[0]; 
const b = array[1];

// Array destructuring
const [a, b] = [1, 2];
```
When using array desctructuring, the variables are set to the values of the array.

When the values are not defined or provided, do:
```
// Default values 
const [a = 0, b = 1] = [];

console.log(a); // 0 
console.log(b); // 1
```
This will auto assigned values to a and b.

```
const [a = first, b = second] = someArray || [];
```
In this example, if the array is empty, ```a``` and ```b``` will equal ```first``` and ```second``` instead of being undefined.

For more use cases, if you don't know the values but want to destructure, it doesn't make a lot of sense logically.

## Rest Parameters
Allow you to represent an indefinite amount of arguments as an ```array```. They are useful when unsure how many arguments a function may be called with.
```
function sum(...args) {
  return args.reduce((a, b) => a + b, 0);
}

sum(1, 2, 3); // 6
```
In this case, ```args``` is an array with values ```[1, 2, 3]```. 

It uses the reducer function ```(a, b) => a + b``` to each element. The argument ```0``` is the initial value of the accumulator. On each iteration, it adds the sum to the new sum.
```
function logger(name, ...args) {
  console.log(name);
  console.log(args);
}

logger('John', 'hello', 'world');
```

## Default Parameters
```
function greeting(name = 'John') {
  console.log(`Hello ${name}!`);
}

greeting(); // Hello John!
greeting('Jane'); // Hello Jane! 
```

## Objects, Ownership
```
// Literal notation
const person = {
  name: 'John',
  walk() {
    console.log(this.name, 'is walking.'); 
  }
};

// Constructor 
const person = new Object();
person.name = 'John';
person.walk();      // John is walking.
```
Properties can be accessed using ```.``` or ```[]``` notation like as follows:
```
person.name;
person['name']; 
```

**Ownership** in js is best described by this example:
```
const person = {
  name: 'John'
};

const anotherPerson = person;
// 'name' is still owned by 'person', not 'anotherPerson'
```

## Enumerability
Refers to whether an object property can be enumerated by certain operations like a for-loop.

By default, all properties defined directly on an object are enumerable. Some properties like getters/setters are not by default.
```
const person = {
  name: 'John',
  walk() {
    // ...
  }  
};

// name is enumerable
for(let key in person) {
  console.log(key); // name
}

// walk is non-enumerable 
for(let key in person) {
  console.log(key); // does not include walk
}
```

A useful feature is manually setting enumerability to ```false``` when not wanted or error-prone.
```
Object.defineProperty(person, 'age', {
  enumerable: false
});
```
This in a real-world scenario would look like:
```
const person = {
  name: 'John',
  walk() {
    //... 
  },

  age: {
    value: 30,
    enumerable: false
  }
};
```
