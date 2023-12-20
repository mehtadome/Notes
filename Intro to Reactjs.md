# **Intoduction to React.js**
**React.js** is a JavaScript library created by Facebook developers. It is commonly compared to another library **jQuery**. 

The main difference is **React.js** is for rendering and building user interfaces and interacts with the _virtual DOM_. **jQuery** is used for DOM manipulation, like modifying existing elements and interacting with the DOM directly.

# Introduction to JSX
JSX is a _syntax extension_ for JavaScript. 

A _syntax extension_ is means that an intermediatary compiler will have to translate the extended code to the targeted language. In this case, a JSX compiler will translate the JSX into regular JavaScript.

A JSX compiler needs to be set up to use correctly. 

```
<h1>Hello World</h1>
```
JSX combines JavaScript and HTML. 

## Syntax
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

```
const myList = (
  <ul> 
    <li></li>
  </ul>
);
root.render(myList);
```
You can also render in specific arguments.

#### Code Academy's Rendering Formula
```
import React from 'react';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<h1>Hello world</h1>);
```

### Virtual DOM
React uses a _virtual DOM_ in that it only updates DOM elements that have changed. This means if the same code is rendered twice, the second render functionally does nothing.

Every time an update is issued,:
1. The entire virtual DOM is updated.
2. It compares previously rendered snapshots of objects to newly to-be rendered objects.
3. Only the changed objects are updates on the _real_ DOM.
4. Screen changes.

## Advanced JSX
There are a lot of grammar similarities to JSX but there are subtle differences to lookout for.

### Attributes
```
<h1 className="big">Title</h1>
```
As seen, you have to use the attribute ```className``` instead of ```class``` as it was in JavaScript.

This is because of the inherent translation extension of JSX.

### Self-Closing Tags
In HTML, there are many tags like ```<img>```, ```<input>```. and ```<br>``` which don't require a closing tag, otherwise known as _self-closing_ tags.

In JSX, it is requires to use a slash at the end of the tag syntax as such:
```
<img />
<input />
<br />
```

#### Fragments
```
return (
    <>
      <h1>{props.songName}</h1>
      <h2>{props.artist}</h2>
    </>
  );
```
The ```<>``` and ```</>``` are called _fragments_. They are used to group children together without adding extra nodes to the DOM. ```<div></div>``` is an example of an extra node.

### JavaScript in JSX
```
root.render(<h1>{2 + 3}</h1>);
```
To use JavaScript logic within a tags context, ```{}``` are required.

Examples:

```
root.render(<h1>2 + 3 = {2 + 3}</h1>);
```
```
const myString = "Hello World";
root.render(<h1>{myString}</h1>);
```

### Event Listeners
```
const kitty = (
	<img 
		src="https://content.codecademy.com/courses/React/react_photo-kitty.jpg" 
		alt="kitty" 
    
    onClick={makeDoggy}
  />
);
```
An event listener is JSX must be a function. It also uses camel case which is different than HTML.

Notice how the function being called does not include ```()```.

### Objects
Same as JavaScript
```
const pics = {
  kitty: 'https://content.codecademy.com/courses/React/react_photo-kitty.jpg',
  doggy: 'https://content.codecademy.com/courses/React/react_photo-puppy.jpeg'
};
```
Remember, you can refer to a objects attributes with ```.``` or ```[]``` notation. 

```
const img = <img src={pics[coinToss() == 'heads' ? 'kitty' : 'doggy']} />;
root.render(img);
```
```[]``` Notation is useful when wanting to induce which attribute to use.

### Conditionals
If-Statement
```
if (coinToss() == 'heads')
{
  img = <img src={pics.kitty} />
} else {
  img = <img src={pics.doggy} />
}
root.render(img);
```

### Ternary Operator 
JSX supports the ternary ```?``` operator.

### && Operator
```
{!judgmental && <li>Nacho Cheez Straight Out The Jar</li>}
```
{**Logic** && **JSX**} If the the logic does not pass, the JSX will not render.

### .map() for Arrays
```
const people = ['Rowe', 'Prevost', 'Gare'];
const peopleList = people.map(person =>
  <li>{person}</li>
);
root.render(<ul>{peopleList}</ul>)
```
Used to create arrays of JSX elements.

### Keys
Keys are unique ```string```s which React will automatically use to pair rendered elements with corresponding item in the array.
```
const peopleList = people.map((person, i) =>
  <li key={'person_'+i}>{person}</li>
);
```

Create an array from a range of numbers and keep track of its keys.
```
const maxRange = 10;
const myArr = utils.range(1, maxRange).map(myID => 
  <button key={myID}>{myID}
  </button>);

const utils = {
  range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i)
};
```

# React Components
React apps are made of **components**, small reusable chunks of code responsible for one job.

### Syntax
```
import React from 'react';
import ReactDOM from 'react-dom/client';
```
The ```'react'``` package is a pre-required dependency. ```React``` is the main object to start utilizing features from the library.

The second import line is necessary since the methods imported from ```'react'``` do not deal with the DOM at all. The DOM isn't part of React itself.

You only need the second import in the file that creates the DOM.

### Functions as Components
```function MyComponent() { }```

Function component names must start with capitalization (PascalCase). This will call compilation issues if not done.

### Exporting
In App.js: ```export default MyComponent;```

In index.js: ```import MyComponent from './App';```

To work with a component from another file, it must be exported within its source file and imported in the other one. Keep in mind the ```./``` states to look in the same folder as our file.

### Using Components
By itself, a component is called like a _self-closing_ tag ```<MyComponent />```

If nested, it needs a closing tag:
```
<MyComponent>
  <OtherComponent />
</MyComponent>
```

You can call the component with ```root.render(<MyComponent />);```

### Rendering Components
```
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<MyComponent />);
```
The call to ```'app'``` returns a DOM element from ```index.html```, a basic file with just the **HTML:5** template.

```
function App() {
  return <Friend />;
}
export default App
```
Another way to render the DOM is to call ```App```, a keyword itself, which React can use to create the DOM without extra steps.

### Important Note on Importing / Exporting the ```<App />```
There are two types of imports, a _default_ import and a regular one. Mismatching will cause errors.

A regular import consists of 
```
export function App() {...}

// import as
import { App } from '../components/App';
```
For a regular import, you omit ```default``` and use the ```{}``` braces.

A default import consists of
```
// App.js
export default function App() {...}

// import as
import App from '../components/App';
```
For a default import, you tell it to be ```default``` and **do not** use the ```{}``` braces.

## Using Components Examples
To call another component within the same file, you use the same self-closing tag syntax:
```
function Picture() { }
function Profile() {
  return (
    <>
      <Picture />
    </>
  );
}
export default Profile;
```

### Objects within Components
```
const owl = {
  title: 'Excellent Owl',
  src: 'https://content.codecademy.com/courses/React/react_photo-owl.jpg'
};

function Owl()
{
  return (
    <div>
      <h1>{owl.title}</h1>
      <img src={owl.src} alt={owl.title} />
    </div>
  );
}
export default Owl;
```
Using objects and components together is common.

Obviously, components can have their own logic before the ```return``` statement to preare for the return.

### Event Listeners and Handlers in a Component
```
function SubmitButton() {
  function handleClick() {
    alert('Submission Successful.');
  }
  return <button onClick={handleClick}>Submit</button>;
}

export default SubmitButton;
```

```onClick```'s can also be used with arrow function expressions for easier coding:
```
<button onClick={() => {alert("Purchase Complete")}  }>Purchase</button>
```
The first pair of ```{}``` tell React we're using JS code and then second pair ```{}``` are for the function. 

### First React App
Look through the code of ```My First React App``` to see how components are put together to build an app.

## Props
Props refer to components interacting and _passing information_ to each other.

### Syntax
Every component has a ```props``` which is information about the component. To use props, it must be passed as a parameter in the defining function ```function Greeting(props) {}```

An example of using props is as follows:
```
<Greeting 
  name="The Queen Mary" 
  city="Long Beach, California" 
  age={56} 
  haunted={true} 
/>
```
The code uses a created component ```<Greeting />``` with many different self-created attributes.

### Usage
```
function PropsDisplayer(props) {
  	const stringProps = JSON.stringify(props);
    return (
      <div>
        <h1>CHECK OUT MY PROPS OBJECT</h1>
        <h2>{stringProps}</h2>
      </div>
    );
}
export default PropsDisplayer;

import PropsDisplayer from './PropsDisplayer';
function App() {
  return <PropsDisplayer myProp="Hello"/>;
}
```

The function tells React we want to use ```props``` and will stringify the props we pass in when calling the component.

The second function defines the ```props``` we want. 

Another Example:
```
function Product(props) {
  return (
    <div>
      <h1>{props.name}</h1>
      <h2>{props.price}</h2>
      <h3></h3>
    </div>       
  );
} export default Product;

/*Separate File*/

import Product from './Product'
function App() {
  return <Product name="Apple Watch" price = {399} rating = "4.5/5.0" />;
} export default App;
```
Can use ```.``` notation to refer to the _object_ ```props``` attributes.

### Functions as Props
```
function Button(props) {
  return (
    <button onClick={props.talk}>
      Click me!
    </button>
  );
} export default Button;

/*Separate File*/

function Talker() {
  function talk() {
    let speech = '';
    for (let i = 0; i < 10000; i++) {
      speech += 'blah ';
    }
    alert(speech);
	}
  return <Button talk={talk}/>;
} 
export default Talker;
```
It is bad practice to keep name _event handlers_ without the ```on``` prefix. To fix it, you would rename the method to something like ```handleClick``` and the props attribute to ```onClick```.

Althought HTML does use the keyword ```onClick``` as well, it does not apply in this case as ```Button()``` was specifically defined as a component. 

Can use arrow functions with props too:
```
const MyNumber = props => (
  <button>{props.number}
  </button>
);
```

### Props.Children
```props.children``` refers to all the context between the opening and closing tags of a component. Recall you could also call a component as ```<MyComponent></MyComponent>```

When the component is called, anything within and referred to as ```props.children``` in its definition will display:
```
function List(props) {
  let titleText = `Favorite ${props.type}`;
  if (props.children instanceof Array) {
    titleText += 's';
  }
  return (
    <div>
      <h1>{titleText}</h1>
      <ul>{props.children}</ul>
    </div>
  );
} export default List;

...
return (
  <List>
    <li>Wario</li>
    <li>Ouchies</li>
  </list>
);
```

### Props Default Text
1. Override static property of component:
```
function Example(props) {
  return <h1>{props.text}</h1>
}

Example.defaultProps = {
  text: 'This is default text',
};
```
2. Specify default value in function definition:
```
function Example({text='This is default text'}) {
   return <h1>{text}</h1>
}
```
3. Default value in function body.
```
function Example(props) {
  const {text = 'This is default text'} = props;
  return <h1>{text}</h1>
}
```

## React Developer Tools
Chrome has an extension called React Developer Tools.
```https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi```

When an ```npm start``` has occurred, the extension will become available to use in Chrome.

# CodeyOverflow Forum
Please look at the **README.md** to get an idea of the project.