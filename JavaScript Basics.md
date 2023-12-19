# Getting Started in JavaScript

# Environment
```Node.js``` and _Electron_ for local server development.

When running npm install, use it in the terminal because it is common to run into errors using VSCode's terminal.

Use ```npm install``` to build dependencies and push the project into a runable state.

Use ```npm run start``` to run the application.

## Strict Mode
There is a thing called _Strict Mode_ which will prevent syntax errors, incorrect logic, wrong assignments, etc. from even compiling and making it to the page. 

It is applied to the file being coded in. Call it with ```'use strict';```

# Printing

Use ```console.log``` to print to the browser's _Inspect Element_ debug console. 

The comma ```,``` is used to separate parameters.

Using ```+``` inside the print will concatenate the next value to the string, implicitly converting it. 

# JavaScript in HTML

Use the ```<script>``` tag in an HTML file to code js. However, it's best to use a separate js file using:
```
<script src="./filename.js"></script>
```

The ```./``` will tell the interpreter it is in the same folder at the HTML file.

Libraries that span the webpage should be put up in the ```<head>``` section. The ```<script>``` tag for the js file goes at the bottom, after all the html is loaded, right before ```</body>```.

Using a file with the common-name ```utils.js``` is the standard for self-made modules. It needs to proceed other js file sourcing.


## Manipulating Elements
```
document.getElementByID('message').textContent = "Get a Grip.";
```

This code grabs the content under the _id_ ```message``` and changes its text accordingly.

## Most Common DOM Usage
Button Clicks:
```
const button = document.getElementById('see-review');
button.addEventListener('click', function() {
    console.log('click');
});
```
The function ```function()``` inside the parameters works as an "anonymous" function, its only purpose to server the context it is being used for.

Showing / Hiding Elements
```
const review = document.getElementById('review'); 
review.addEventListener('click', function() {
    review.classList.remove('d-none');
});    
```
When the button is clicked, it shows the review by removing a property in the class keeping it hidden.

## Styling
JS can style but CSS is the standard.
```
const header = document.getElementById('message');
header.style.fontWeight = '800';
```

It is possible to store multiple elements with the same class under a js array.
```
const containers = document.getElementByClassName("container");
```
This can have benefits like ```containers[2].classList.add('d-none');```.

# Objects

To create a basic object, all that is needed is:
```
let person = {
    firstName = "James",
    lastName = "Dean"
};
```
Calling ```person.firstName``` would be using the value "James".
## Private Attributes
There are such thing as private attributes. To implement it, it needs to use the ```[]``` operator as such:
```
let mySalary = 0;
let person = {
    name = "BoB",
    [mySalary] = 120000;
};
```
The attribute ```mySalary``` is not accessible. 
## Functions as Attributes
This is acceptable:
```
let person = {
    name: "BoB",
    age: 32,
    showInfo: function() {
        console.log(this.name, this.age);
    }
};
```
You can also have a function that accepts a parameter.
```
let person = {
    name: "John",
    age: 35.
    showRealInfo: function(realAge) {
        console.log(this.name, "real age is", realAge);
    }
};
person.realAge(40);
```

## Pre-Defined Objects
```
let now = new Date();
loggingFunction( now.toDateString() );
```

## Calling an API
Using the ```fetch()``` and ```then()``` functions to receive and parse the request are the traditional, more inefficient way of waiting for a promise to parse.
```
const fetchData = async () => {
  const resp = await fetch('https://api.github.com');
  const data = await resp.json();
  console.log(data);
};

fetchData();
```
By using ```async``` and ```await```, it gets rid of the ```then()``` synchronous nature.

# Fundamentals

The ```var``` keyword in javascript is no longer best practice. The new standard is ```let```.

```var``` isn't commonly used since it is scope independent. In this following example:
```
if (true) {
    var value = 0
    let value2 = 1
}
console.log(value);
console.log(value2);
```
```value``` _will_ print to the console. ```value2``` _will not_ print to console.

You are able to declare many variables at once.

## "```==```" VS "```===```"

```==``` will do an implicit type coercion between both values being compared. Generally, you use ```===``` as the best practice since implicit type coercion can lead to bugs later down the line.

## Functions
This allowed:
```
let myFunction = function loggingFunction() {
    console.log("Message");
}
myFunction();
loggingFunction();
```

## Arrays
Initialize with ```let values = [1,2,3,4];```

Non-const arrays are mutable with typical methods like ```push()``` and ```pop()```.

While it seems right to make a for loop for searching, use pre-defined libraries for searching as they are optimized and efficient. 
```
const values = [1,2,3,4,5];
const set = values.filter(function(item) {
    return item > 3
});
console.log(set);   // 4, 5
```

## Types

Can use ```typeof``` to determine type in js. 

Use ```++``` when the increment is wanted after the line has been ran. 

## Hoisting
Hoisting is the term for calling a variable or function before it is defined. This can look like:
```
productID = '12345';
myFunction();

let productID = '123';
function myFunction() {
    console.log("Hello World");
}
```
In this code, the ```let productID = '123'``` would cause an error but the function would pass without error. This would make the function **hoisted**.

## Strings

To use a variable inside a string, you do ```"${variable_name}"```.

## Booleans
Considered False (_falsy_):
```
false, 0, "", '', null, undefined, NaN
```
Considered True (_truthy_): **Everything not _falsy_**.

## Do...While
```
let count = 1;
do {
    console.log(count);
    count++;
} while (count < 5);
```

# Classes
Classes ```extend``` from the React's components package. So it must be defined with such:
```
class Card extends React.Component { }
```

## Props
To use props, it uses ```this```.
```
const profile = this.props;
```
An example of how to initiate props. Components which will use the props still need ```props``` passed as a parameter.

Use ```props._name``` where ```_name``` is the props value to be used.

## Constructor
A constructor is required to connect the React class to superclass.
```
constructor(props) {
    super(props);
    this.state = {};
}
```

