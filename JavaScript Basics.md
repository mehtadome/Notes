# Getting Started in JavaScript

## Environment
```Node.js``` and _Electron_ for local server development.

When running npm install, use it in the terminal because it is common to run into errors using VSCode's terminal.

Use ```npm install``` to build dependencies and push the project into a runable state.

Use ```npm run start``` to run the application.

## Printing

Use ```console.log``` to print to the browser's _Inspect Element_ debug console. 

The comma ```,``` is used to separate parameters.

Using ```+``` inside the print will concatenate the next value to the string, implicitly converting it. 

## JavaScript in HTML

Use the ```<script>``` tag in an HTML file to code js. However, it's best to use a separate js file using:
```
<script src="./filename.js"></script>
```

The ```./``` will tell the interpreter it is in the same folder at the HTML file.

Libraries that span the webpage should be put up in the ```<head>``` section. The ```<script>``` tag for the js file goes at the bottom, after all the html is loaded, right before ```</body>```.

Using a file with the common-name ```utils.js``` is the standard for self-made modules. It needs to proceed other js file sourcing.

### Manipulating Elements
```
document.getElementByID('message').textContent = "Get a Grip.";
```

This code grabs the content under the _id_ ```message``` and changes its text accordingly.

## JavaScript Fundamentals

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

### Objects

To create a basic object, all that is needed is:
```
let person = {
    firstName = "James",
    lastName = "Dean"
}
```
Calling ```person.firstName``` would be using the value "James".

### "```==```" VS "```===```"

```==``` will do an implicit type coercion between both values being compared. Generally, you use ```===``` as the best practice since implicit type coercion can lead to bugs later down the line.

### Functions
This allowed:
```
let myFunction = function loggingFunction() {
    console.log("Message");
}
myFunction();
loggingFunction();
```

### Types

Can use ```typeof``` to determine type in js. 

Use ```++``` when the increment is wanted after the line has been ran. 

### Strings

To use a variable inside a string, you do ```"${variable_name}"```.

### Booleans
Considered False (_falsy_):
```
false, 0, "", '', null, undefined, NaN
```
Considered True (_truthy_): **Everything not _falsy_**.

### Do...While
```
let count = 1;
do {
    console.log(count);
    count++;
} while (count < 5);
```