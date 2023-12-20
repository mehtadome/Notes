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
}
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