# Reactjs States and Hooks
These notes follow alongside the PluralSight course by Samer Buna. 

He uses his own self-made playground on [https://jscomplete.com/playground/rgs1.1] which builds off the **Babel** Reactjs library. 

Every module is differed by the first digit ```#.1``` and lessons are the second digit ```1.#```.

This course also utilizes the **React Developer Tools** browser extension.

# State Hooks
Function that let us manage the internal state of components and handle post-rendering side effects directly from our components.

Allows React to keep track of current value of the state from one render to the next.
```
import React, { useState } from 'react';
const [currentState, setCurrentState] = useState();
```
```useState()``` returns the array [_current state_, _state setter_]. The _state setter_ will be a function used to push the _current state_ into a _new state_.

PS: ```{ useState}``` is an example of object destructuring and ```[currentState, setCurrentState]``` an array destructuring one.

```
function Toggle() {
  const [toggle, setToggle] = useState();

  return (
    <div>
      <p>The toggle is {toggle}</p>
      <button onClick={() => setToggle("On")}>On</button>
      <button onClick={() => setToggle("Off")}>Off</button>
    </div>
  );
}
```
```setToggle()``` will update the value of ```toggle``` and re-render the component with the new value.

We now know the basic syntax of creating state is ```const [size, setSize] = useState("");``` for example. 

This syntax is actually utilizing _array destructuring_ and the following is also acceptable:
```
const state = useState("");
const size = state[0];
const setSize = state[1];
```

## Previous State
React updates asynchronously meaning there are some scenarios where code will run before state is finished updating. To avoid, use **callback functions** as best practice.

```
const [count, setCount] = useState(0);
const increment = () => setCount(prevCount => prevCount + 1);
return (
    <div>
      <p>Wow, you've clicked that button: {count} times</p>
      <button onClick={increment}>Click here!</button>
    </div>
  );
```
Since the next value of count depends on its previous value, the callback function is passed instead of a value.

The _state setter callback function_ takes previous count as argument. The value returned is used as next value of count. 

Another way to represent this logic is ```setCount(count + 1)``` 

### Arrays in State
To change an array in state, use _array syntax spread_ aka ```[target.value, ...prev]```

When updating an array in a state, the previous array is replaced with the new changes. ```...prev``` tells React to save over previous data. This is referred to as **array spread syntax**.

Note: when defining an array of static values, define it outside of function so it is not re-rendered per update.
*/

### Objects in State
Main syntax difference is ```useState({})``` and ```{...prev, [name]: value}```

### State Arguments
To use arguments when dealing with states, passing in an argument isn't enough because states require a _function reference_ to work properly, not just an _invocation_.

Take a look at following code, we want to pass in a argument ```props.increment.```
```
const TopMostComponent = () => {
  const [increment, setIncrement] = useState(0);
  const onClickFunction = (increment) => { setIncrement(increment + 1) };

  return (
  	<MyButton 
    increment={increment} 
    onClick={onClickFunction(increment)}
    comment="onClick attribute is incorrect, argument must be wrapped at lower level"
    />
  );
};

const MyButton = () => (

  return <button></button>
);

```
This **doesn't work** and is fixed with using the function wrapper (```() =>```) in the lower component.
```
const MyButton = (props) => (
  return 
  (
    <button onClick = { 
    () => props.onClickFunctions(props.increment) 

    }>{ props.increment }</button>
  );
);
```
For the sake of best practice, keep it as its own reference:
```
const myButton = (props) => (
  const handleClick = () => props.onClickFunction(props.increment);

  return <button onClick={handleClick}></button>;
);

```

## Multiple States
```
function Musical() {
   const [title, setTitle] = useState("Best Musical Ever");
   const [actors, setActors] = useState(["George Wilson", "Tim Hughes", "Larry Clements"]);
   const [locations, setLocations] = useState({
      Chicago: {
        dates: ["1/1", "2/2"], 
        address: "chicago theater"}, 
      SanFrancisco: {
        dates: ["5/2"], 
        address: "sf theater"
      }});
 }
```
Acceptable and better practice to declare multiple states when objects have dynamic attributes.

# Effect Hook
Tells component to do something every time it's rendered or re-rendered. 
```
import { useEffect } from 'react';
```
To import both hooks at once, it is formatted as ```{ useEffect, useState }```

Effect Hooks can be combined with State Hooks.
```
function PageTitle() {
  const [name, setName] = useState('');
 
  useEffect(() => {
    document.title = `Hi, ${name}`;
  });
 
  return (
    <div>
      <p>Use the input field below to rename this page!</p>
      <input onChange={({target}) => setName(target.value)} value={name} type='text' />
    </div>
  );
}
```
```useEffect()``` uses a callback function. Everytime the ```PageTitle``` component renders, the effect runs after.

Everytime the ```input``` changes, ```useEffect()``` updates the document's title with ```document.title```.

#### Template Literal
```
alert(`Count: ${count}`);
```
Designated with the backtick ``` ` ```.

## Cleanup
Cleaning up effects is necessary so that a new event handler doesn't keep being added.
```
useEffect(()=>{
  document.addEventListener('keydown', handleKeyPress);
  // Specify how to clean up after the effect:
  return () => {
    document.removeEventListener('keydown', handleKeyPress);
  };
})
```

### Note on Callback Functions
```
useEffect(() => {
  document.addEventListener('mousedown', increment)
});
```
is the same as:
```
 useEffect = () => {
    document.addEventListener('mousedown', increment)
};
```

## Control when Effects are Called
Sometimes, it could be wanted to skip calling effect on re-renders altogether.
```
useEffect( () => {...}, []);
```
To do so, pass in an empty array as the second argument. This array is called the **dependence array**. React immediately understands the intent with this syntax.
 
Take an example of a timer, when state changes, we don't want the timer to re-render. So pass in ```, [])```.

## Resetting State
To reset state, there are two ways to do so. The first is by re-initializing the base value with the setter function initially providing.
```
const [num, setNum] = useState(0);
// num increments somewhere
setNum(0);  // resets to initial state
```
This is useful when wanting to reset the who ```<App />``` into its starting state **but** will introduce _side effects_ when using ```useEffect()```s. 

A common side effect would be ```setTimeout()```: A timer that starts and constantly is called on each state change. 

To avoid this, at the topmost component, give it a ```key```. The way React _mounts_ nodes is setup in a way that if there is an id provided, React will unmount the old and remount another application when an id change occurs.
```
const StarMatch = () => {
  const [gameId, setGameId] = useState(1);
  return <Game key={gameId} startNewGame={() => setGameId(gameId + 1)}/>;
}
root.render(<StarMatch />);
```
In the code, the id will increment by 1 everytime the ```startNewGame()``` prop is called at a lower level.

## Inline function for state
When declaring to useState, if an infline function is passed, it is called _lazy evaluation_. This means that the function will only run the first time the component renders.
```
const [cart, setCart] = useState(() => {...});
```

## Fetch Data
Controlling fetching is a common use case.
```
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]);
```
In this example, it only re-runs the effect if the value stored by count changes.

### Fetch from API or other part of app
```
useEffect(() => {
    get('/menu').then((response) => {
      setMenu(response.data);
    }); }, []);
```
Grabs the data from a pre-defined ```get()``` function. The response is then parsed based the first state ```data``` and the ```response``` received. It is placed into the next state for ```menu```.

Can view ```get()``` function in ```'./Mock Backend/fetch.js'```.

### APIs with Ajax
Combining states, classes, and APIs is common, this is how to do it in a class:
```
class Form extends React.Component { 
    // define the current state
	state = { userName: '' };

    // onClick submit handler
	handleSubmit = async (event) => 
    {
        event.preventDefault(); // stops the page from changing (the default operation)
        // store the response the username passed into current state
        const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);

        // pass in the data from the response to the form's props
        this.props.onSubmit(resp.data);

        // display the new username
        this.setState({ userName: '' });
    };
    // return code
}
```
Context available at [https://jscomplete.com/playground/rgs2.7].

# Rules of Hooks
1. Only call Hooks at the top level. It should not be nested in conditionals, loops, or nested functions.
2. Only use in React Functions. They belong in components with ```useState()```, ```useEffect()``` or custom-made.

### Hook Placement
```
export default function SocialNetwork() 
{
  const [data, setData] = useState(null);

  const [menu, setMenu] = useState(null);
  useEffect(() => {
    get('/menu').then((response) => {
      setMenu(response.data);
    }); }, []);

  const [newsFeed, setNewsFeed] = useState(null);
  useEffect(() => {
    get('/news-feed').then((response) => {
      setNewsFeed(response.data);
    });
  }, []);

  const [friends, setFriends] = useState(null);
  useEffect(() => {
    get('/friends').then((response) => {
      setFriends(response.data);
    });
  }, []);

  return (...);
}
```
Placing Effects next to their corresponding States is good programming.

# Refs
```useRef()```s are used to store a value that's stable between renders. Unlike state, you can mutate the ref's value directly and doesn't automatically re-render when unchanged.
```
import React, { useRef } from 'React';

function TextInputButton() {
  const input1 = useRef(null);
  const onClick = () => input1.current.focus();

  return (
    <>
      <input ref={input1} type ="text" />
      <button onClick={onClick}>Focus input button</button>
    </>
  );
}
```
The ```ref``` prop is unique to React. It provides a direct reference to the underlying DOM element with the ```.current``` property. 

Refs make it such that the HTML input is the source of truth instead of React's state.

## Difference to useState
A useState looks like such:
```
const [sku, setSku] = useState("");
// later
return (
  <select value={sku} onChange={(e) => setSku(e.target.value)}></select>

  <button onClick={() =>
    props.addToCart(sku);
  }>
);
```

A ref looks like:
```
const skuRef = useRef();
// later
return (
  <select value={sku} onChange={(e) => setSku(e.target.value)}></select>

  <button onClick={() =>
    const sku = skuRef.current.value;
    props.addToCart(sku);
  }>
);
```
```skuRef```'s ```current``` is the ```<select>``` element. That element has an attribute ```value``` which equals the ```{sku}```.

Using refs to manage state turns the component into an uncontrolled one.

Generally, it is not recommended unless there are extreme performance requirements or when working with non-React libraries.

## useRef to store previous value
By using useRef, we can judge whether the ```.current``` urls are equal to the urls passed. If they are, simply return. If they aren't equal, change it.
```
const prevUrls = useRef([]);

useEffect(() => {
  if (areEqual(prevUrls.current, urls)) => return;
  
  prevUrls.current = urls;
  // fetch logic  
});
```

# useReducer
```useReducer()``` requires a _pure function_ that accepts state and an action. Whatever is **returned** becomes the new state. 

The function is passed to the useReducer hook which returns the initial state and a _dispatch function_. The dispatch function will _dispatch_ actions to change state. 

useReducer is great for extracting state logic outside of the component completely. It's better for scalability due to its reusability and unit testing.

## Syntax
```
export default function cartReducer(state, action) {
  switch (action.type) {
    case "empty" :
      return [];
    ...
    default: 
      throw new Error("Unhandled action " + action.type);
  }
}
```
The syntax requires some state passed and an action. To refer to a specific action, you must use ```.type```. It is best practice to use the ```switch``` statement in a useReducer. 
+ It's good practice to have a default.

### Multiple Arguments
The pure function requires two arguments but is not limited to two. This means that any argument at position 2 and after will be considered an action.
```
const { id, sku } = action;
```
Then, we can use destructuring to refer to the different actions passed in.

When destructuring similar values in different cases, confine the case within ```{}``` to signify scope.
```
case "add":{
  const { sku, qty } = action; }

case "update": {
  const { id, qty } = action; }
```
## Setting up useReducer
```
// outside App
let initialCart = [];
// inside App
const [cart, dispatch] = useReducer(cartReducer, initialCart);

return (
  <>
    <Routes>
      <Route 
      path="/cart"
      element={<Cart cart={cart } dispatch={dispatch} />}
      />
    </Routes>
  </>
);

// Separate file using props
export default function Cart({ cart, dispatch }) {
  // other logic
  return (
    <button onClick={() => {
      props.dispatch({ type: "add", id, sku });
    }}>
  )
}
```

## useState vs useReducer
useState
+ Easy to implement for most scenarios. 
+ Easy to learn.

useReducer
+ Manage complex states like: Transitions, Multiple-sub values, Next state depends on previous.
+ Isolate state and still testable.
+ Reusable (can place in separate file).

# Context
Having a context provider is useful when multiple components need some sort of value passed down by the topmost component but don't need to share props with others. 

For example, if the app structure is a tree like such and 3 needs a prop from 1, it cannot grab it without it passing to 2 first.
1
 2
  3
By using context, that can be avoided.

## Setup
To setup context, create something like such in a new file ```_Context.js```:
```export const CartContext = React.createContext(null);```

This file will keep all the context for the app and be used as its own component.

Then, in the topmost ```<App />``` layout component, wrap everything within 
```
import { CartContext } from ...;

App() {
  return (
    <CartContext.Provider>
      <Routes>
        <Route
        path="/cart"
        element={<Cart />}
        >
      </Routes>
    </CartContext.Provider>
  );
}
```
Note: _Provider_ tells React we want that tag to be used to provide context. Also, the ```<Cart />``` component no longer passes down props anymore.

Now, in the file that needs the props, it can be easily replaced like such:
```
import React, { useContext } from "react";
import { CartContext } from ...;
export default function Cart() 
{
  const { cart, dispatch } = useContext(CartContext);
  // other logic
}
```
Old-version:
```
Cart({ cart, dispatch }) {...}
```

## Carved Rock Fitness
Refer to the **Carved Rock Fitness** project to see this in action. The file for examination is ```src/cartContext.js```.

# Appendix

## Code Examples
The file ```States and Hooks Examples.js``` as an accompanying file with examples of states and hooks.

It contains the following examples:
- ColorPicker(), ToggleLoading(), PhoneNumber(), QuizNavBar()
- PersonalPizza(), GroceryCart()
- Login()
- Timer()

## Links
**Star-Match Game** [https://jscomplete.com/playground/rgs3.9]

**Reactjs Classes App** [https://jscomplete.com/playground/rgs2.7]