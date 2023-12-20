/*
Examples on using States and Hooks for different use cases. Contains the following: 

// Standard state usage
ColorPicker(), ToggleLoading(), PhoneNumber(), QuizNavBar()

// Arrays and state
PersonalPizza(), GroceryCart()

// Objects and state
Login()

// Effects
Timer()

Note: The code is syntactically correct but the environment is not setup.
*/
import React, { useState, useEffect } from 'react';


// Change colors with state
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


// Depict a 'Loading' state
export default function ToggleLoading() {
    const [isLoading, setIsLoading] = useState();
    // On the first click, ```true``` is passed and passes the ```isLoading``` condition. On the second click it fails. 
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


// Accept an inputed email
export default function EmailTextInput() {
    const [email, setEmail] = useState('');
    const handleChange = (event) => {
      const updatedEmail = event.target.value;
      setEmail(updatedEmail);
    }
    /*
    On the event change, the new email is recorded. As can be seen in ```useState('')```, 
    passing in a parameter makes the default equal to that parameter. 
    In this case, it is an empty string.
    */
    return (
      <input value={email} onChange={handleChange} />
    );
}


// Record a phone number
export default function PhoneNumber() {
  const validPhoneNumber = /^\d{1,10}$/;
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
  // This has a input box for a phone number. If the input is valid, it records its state and stores it.
  return (
    <div className='phone'>
      <label for='phone-input'>Phone: </label>
      <input id='phone-input' value={phone} onChange={handleChange}/>
    </div>
  );
}


// Toggle between questions
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


// Working with an array to change toppings 
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
  // Create a button for each element using .map()
  return (
    <div>
      {options.map(option => 
      (
        <button 
        value={option} 
        onClick={toggleTopping} 
        key={option}
        comment="selected is is dynamic and based on user input. When a button is clicked, toggleTopping() is called.">
          {selected.includes(option) ? 'Remove ' : 'Add '}
          {option}
        </button>
      ))}
      <p>Order a {selected.join(', ')} pizza</p>
    </div>
  );
}


// A grocery cart that adds and removes items
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


// Login using objects instead
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


// Use an interval
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