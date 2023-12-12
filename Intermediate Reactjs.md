# Intermediate Reactjs 
Includes more difficult concepts, syntax, and usage. 

# State Hooks
Function that let us manage the internal state of components and handle post-rednering side effects directly from our components.

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

### Color Example
```
export default function ColorPicker() {
  const [color, setColor] = useState();

 const divStyle = {backgroundColor: color};

  return (
    <div style={divStyle}>
      <p>The color is {color}</p>
      <button onClick={() => setColor('Aquamarine')}>
        Aquamarine
      </button>
      <button onClick={() => setColor('BlueViolet')}>
        BlueViolet
      </button>
      <button onClick={() => setColor('Chartreuse')}>
        Chartreuse
      </button>
      <button onClick={() => setColor('CornflowerBlue')}>
        CornflowerBlue
      </button>
    </div>
  );
}
```
### setIsLoading() Example
```
function ToggleLoading() {
  const [isLoading, setIsLoading] = useState();

  return (
    <div>
      <p>The data is {isLoading ? 'Loading' : 'Not Loading'}</p>
      <button onClick={() => setIsLoading(true)}>
        Turn Loading On
      </button>
      <button onClick={() => setIsLoading(false)}>
        Turn Loading Off
      </button>
    </div>
  );
}
```
On the first click, ```true``` is passed and passes the ```isLoading``` condition. On the second click it fails. 
### setEmail() Example
```
export default function EmailTextInput() {
  const [email, setEmail] = useState('');
  const handleChange = (event) => {
    const updatedEmail = event.target.value;
    setEmail(updatedEmail);
  }

  return (
    <input value={email} onChange={handleChange} />
  );
}
```
On the event change, the new email is recorded. As can be seen in ```useState('')```, passing in a parameter makes the default equal to that parameter. In this case, it is an empty string.

### setPhone() Example
```
const validPhoneNumber = /^\d{1,10}$/;

export default function PhoneNumber() {
  // declare current state and state setter 
  const [phone, setPhone] = useState('');

  const handleChange = ({ target })=> {
    const newPhone = target.value;
    const isValid = validPhoneNumber.test(newPhone);
    if (isValid) {
        // update state 
        setPhone(newPhone);
    }
    // just ignore the event, when new value is invalid
  };

  return (
    <div className='phone'>
      <label for='phone-input'>Phone: </label>
      <input id='phone-input' value={phone} onChange={handleChange}/>
    </div>
  );
}
```
This has a input box for a phone number. If the input is valid, it records its state and stores it.

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

### Next Question, Previous Question
```
export default function QuizNavBar({ questions }) {
  const [questionIndex, setQuestionIndex] = useState(0);

  // define event handlers 
  const goBack = () => setQuestionIndex(prevQuestionIndex => prevQuestionIndex - 1); 
  const goToNext = () => setQuestionIndex(prevQuestionIndex => prevQuestionIndex + 1); 
  // determine if on the first question or not 
  const onFirstQuestion = questionIndex == 0;

  const onLastQuestion = questionIndex === questions.length - 1;

  return (
    <nav>
      <span>Question #{questionIndex + 1}</span>
      <div>
        <button onClick={goBack} disabled={onFirstQuestion}>
          Go Back
        </button>
        <button disabled={onLastQuestion} onClick={goToNext}>
          Next Question
        </button>
      </div>
    </nav>
  );
}
```

## Arrays in State
To change an array in state, use _array syntax spread_ aka ```[target.value, ...prev]```

### Change Toppings
```
//Static array of pizza options offered. 
const options = ['Bell Pepper', 'Sausage', 'Pepperoni', 'Pineapple'];

export default function PersonalPizza() {
  const [selected, setSelected] = useState([]);

  const toggleTopping = ({target}) => 
  {
    const clickedTopping = target.value;
    
    setSelected((prev) => 
    {
     // check if clicked topping is already selected
      if (prev.includes(clickedTopping)) 
      {
        // filter the clicked topping out of state
        return prev.filter(t => t !== clickedTopping);
      } else 
      {
        // add the clicked topping to our state
        return [clickedTopping, ...prev];
      }
    });
  };

  return (
    <div>
      {options.map(option => 
      (
        <button 
        value={option} 
        onClick={toggleTopping} 
        key={option}>
          {selected.includes(option) ? 'Remove ' : 'Add '}
          {option}
        </button>
      ))}
      <p>Order a {selected.join(', ')} pizza</p>
    </div>
  );
}
```
```options``` is static and contains names of all toppings. Since it is static, it is defined outside of function to not be re-rendered per update.
In the return, we create a button for each element in options using ```.map()```

```selected``` is dynamic and based on user input. When a button is clicked, ```toggleTopping()``` is called.

When updating an array in a state, the previous array is replaced with the new changes. ```...prev``` tells React to save over previous data. This is referred to as **array spread syntax**.

### Grocery Cart
```
export default function GroceryCart() {
  // declare and initialize state 
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    setCart((prev) => { return [item, ...prev]; });
   };

  const removeItem = (targetIndex) => {
    setCart((prev) => { return prev.filter((item, index) => index !== targetIndex)});
  };

  return (
    <div>
      <h1>Grocery Cart</h1>
      <ul>
        {cart.map((item, index) => (
          <li onClick={() => removeItem(index)} key={index}>
            {item}
          </li>
        ))}
      </ul>
      <h2>Produce</h2>
      <ItemList items={produce} onItemClick={addItem} />
      <h2>Pantry Items</h2>
      <ItemList items={pantryItems} onItemClick={addItem} />
    </div>
  );
}
```

## Objects in State
```
export default function Login() {
  const [formState, setFormState] = useState({});
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormState((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form>
      <input
        value={formState.firstName}
        onChange={handleChange}
        name="firstName"
        type="text"
      />
      <input
        value={formState.password}
        onChange={handleChange}
        type="password"
        name="password"
      />
    </form>
  );
}
```
Main syntax difference is ```useState({})``` and ```{...prev, [name]: value}```

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

Effect Hooks can be combined with State Hooks
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
Cleaning up effects is necessary so that a new event handler keeps being added.
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


### Interval Example
```
export default function Timer() {
  const [time, setTime] = useState(0);
  const [name, setName] = useState("");
  
  // effect uses setInterval() to call setTime() based on previous value of time
  useEffect(() => {
      
      // use a variable for cleanup purposes
      const intervalId = setInterval(() => {
        setTime((prev) => prev + 1)}, 1000);
      
      // cleanup code using JS clearInterval() function
      return () => { clearInterval(intervalId) }; }, []);
  
  // Take in value of user's input and update state variable
  const handleChange = ({target}) =>
    setName(target.value);

  return (
    <>
      <h1>Time: {time}</h1>
      <input 
      value={name}
      onChange={handleChange}
       />
    </>
  );
}
```
```setTime()``` starts initially at 0 so on the first render, ```prev``` = ```0```

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

# Rules of Hooks
1. Only call Hooks at the top level. It should not be nested in conditionals, loops, or nested functions.
2. Only use in React Functions. They belong in components with ```useState()```, ```useEffect()``` or custom-made.

### Hook Placement
```
export default function SocialNetwork() {
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
```
Placing Effects next to their corresponding States is good programming.