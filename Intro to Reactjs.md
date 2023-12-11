# Intoduction to React.js
**React.js** is a JavaScript library created by Facebook developers. It is commonly compared to another library **jQuery**. 

The main difference is **React.js** is for rendering and building user interfaces and interacts with the _virtual DOM_. **jQuery** is used for DOM manipulation, like modifying existing elements and interacting with the DOM directly.

# JSX
JSX is a _syntax extension_ for JavaScript. 

A _syntax extension_ is means that an intermediatary compiler will have to translate the extended code to the targeted language. In this case, a JSX compiler will translate the JSX into regular JavaScript.

A JSX compiler needs to be set up to use correctly. 

```
<h1>Hello World</h1>
```
JSX combines JavaScript and HTML. 

## JSX Sytax
```
const navBar = <nav>I am a nav bar</nav>;
```
In JSX, you can store the elements into a variable like normal JS.
```
const myTeam = {
  center: <li>Benzo Walli</li>,
  powerForward: <li>Rasha Loa</li>,
  smallForward: <li>Tayshaun Dasmoto</li>,
  shootingGuard: <li>Colmar Cumberbatch</li>,
  pointGuard: <li>Femi Billon</li>
};
```
The same logic can also be applied to objects in JS.

### Attributes
An attribute is referred to the extra information given within the tag itself. 
```
const google = <a href="https://www.google.com">Google</a>;
```
In the href is considered an attribute. 
```
const google = <a href="https://www.google.com" alt="Google Link" id="google">
Google</a>;
```
There can be multiple attributes within a tag.

### Nesting
Nesting is allowed just like in normal HTML.
```
const nested_example = 
(
    <a href="https://www.example.com">
  <h1>
    Click me!
  </h1>
</a>
);
```
In JSX, multi-line expressions use ```()```. 

### Outer Element Rule
Every JSX element can have **only one** outer element.
```
const paragraphs = (
  <p>I am a paragraph.</p> 
  <p>I, too, am a paragraph.</p>
);
```
To fix an error like this, use an outer ```<div>``` element.
```
const paragraphs = 
(
    <div>
        <p>I am a paragraph.</p> 
        <p>I, too, am a paragraph.</p>
    </div>
);
```

## Rendering JSX
```
import React from 'react';
import ReactDOM from 'react-dom';

function App() {
  return <h1>Hello World!</h1>;
}

ReactDOM.render(<App />, document.getElementById('root'));
```
The first two lines are the necessary imports. 

The rest creates an ```App()``` which will return the ```Hello World``` text. 

The function ```render()``` is needed to build the react into the browser. ```root``` is the root DOM element the entire React application is rendered into. 