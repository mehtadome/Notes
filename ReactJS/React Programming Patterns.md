# Reactjs Programming Patterns
The following topics are covered:
- Separation of presentational from container
- Passing changes between components
- Styling
- Controlled and Uncontrolled components

## Stateful Container Components
Breaking down functional parts of a component to improve readability and decrease bug-proneness.

Separating functional from presentational is typical for React programming patterns.
```
function Presentational(/*...props*/) {
  // body of the component                      
} export default Presentational;

/*Different File*/

import { Presentational } from 'Presentational.js';
function Container() {
  // renders Presentational component
}
```
The _presentational_ component is the section that holds ```return (<div></div>)``` information.

The _container_ component holds stateful information like ```useEffect()``` and ```useState()```.

### Importing from other folders
```
import GuineaPigsSlideShow from "../components/GuineaPigsSlideShow";
import GuineaPigsForm from "../components/GuineaPigsForm";
```
Use ```../``` for directories. Notice how the ```.js``` is not needed.

### Stateless to Stateful Changes
Presentation components are stateless. To communicate changes to a container (stateful) component, the container component must define and provide a way for the presentational component to communicate with it.

To do so, you **create a change handler function** passed as a ```prop```.

This looks something like:
```
function Container() {
  const [isActive, setIsActive] = useState(false);                              
                                
  return (
    <>
      <Presentational active={isActive} toggle={setIsActive}/>
      <OtherPresentational active={isActive}/>
    </>
    );                          
  }
                        
function Presentational(props) {
  return (
    <h1>Engines are {props.active}</h1>
    <button onClick={() => props.toggle(!props.active)}>Engine Toggle</button>
  );
}
                            
function OtherPresentational(props) {
  // render...
}
```
```active``` prop under the defined ```<Presentational />``` component from the ```Container()``` function reaches ```Presentational()``` through ```props.active```.

#### Object Destructuring in Parameter
```
function GuineaPigsForm({favoriteGP, onSelectFavorite, onResetFavorite}) {
//
}
```
Common way of using _object destructuring_ to extract props.

### Exported to main file
```
// stateful code above
return (
    <>
      <GuineaPigsSlideShow 
      src={src}
      isFavorite={currentGP === favoriteGP ? true : false}
      />
      <GuineaPigsForm 
      favoriteGP={favoriteGP}
      onSelectFavorite={favoriteChangeHandler}
      onResetFavorite={resetFavoriteHandler}
      />
  </>
  );
```

#### Component - SlideShow
```
function GuineaPigsSlideShow({src, isFavorite}) {
  return (
      <div data-testid="guineaPigsSlideShow" id="guineaPigsSlideShow">
        <h1>Cute Guinea Pigs</h1>
        <img alt="Guinea Pigs Slideshow" src={src} className={isFavorite? "favorite" : ""}/>
      </div>
  );
} export default GuineaPigsSlideShow;
```
#### Component - Form
```
function GuineaPigsForm({favoriteGP, onSelectFavorite, onResetFavorite}) {
  return (
    <div data-testid="guineaPigsForm" id="guineaPigsForm">	
      <label>Choose Your Favorite Guinea Pig:
        <select value={favoriteGP} onChange={onSelectFavorite}>
          <option value="0">Alex</option>
          <option value="1">Izzy</option>
          <option value="2">Brandon</option>
          <option value="3">DJ</option>
        </select>
      </label>
      <button onClick={onResetFavorite}>Reset Favorite</button>
		</div>
  );
} export default GuineaPigsForm;
```

# Styling React Apps
```
const darkMode = {
  color: 'white',
  background: 'black',
  fontSize: 100
};
return ( <h1 style={darkMode}>Hello world</h1> );
```
As can be seen in this example, we use an _object_ for styling and **inject** the styling object into the JSX.

For JSX styling, we cannot use the ```-``` operator because it is reserved in CSS. Pixels (```px```) is assumed when a number is used. Use string to designate the value if px aren't wanted.

## Structuring
```filename.module.css```
It's best to have separate style sheets per component. Import it with ```import styles from ./filename.module.css```.

Then, you can call it like ```<div className={styles.divStyle}></div>```.

To import it from a directory, it is as follows:
```
import styles from "./styles/filename.module.css";
```

# React Forms
Forms in web-dev need to communicate everything to the server. This means, every character added or deleted must be recorded and updated between both the DOM and the server.

Therefore, forms use the ```onChange``` event handler to re-render the component.
```
function Input() {
  const [userInput, setUserInput] = useState('');
  function handleUserInput(e) {
    setUserInput(e.target.value);
  }
  return (
    <>
      <div className={styles.emailContainer}>
        <h2>Let's stay in touch.</h2>
        <p>
          Sign up for our newsletter to stay up-to-date on the latest products,
          receive exclusive discounts, and connect with other programmers who
          share your passion for all things tech.
        </p>
        <form>
          <label for="email">Email: </label>
          <input id="email" type="text" onChange={handleUserInput} 
          value={userInput}/>
        </form>
      </div>
      <div className={styles.inputDisplay}>
        <h2>Current User Input: </h2>
        <h4>{userInput}</h4>
      </div>
    </>
  );
}

export default Input;
```
Everytime ```handleUserInput(e)``` is called, it sets the state equal to the inputed value.

Within the ```<input>```, the ```onChange``` calls ```handleUserInput``` and has a value ```userInput``` which holds the value written.

Thus doing ```<h4>{userInput}</h4>``` will allow user to see current inputed text. Everytime a character is deleted / added, the ```onChange``` triggers the state to change and ```userInput``` becomes the current state of the text.

## (Un)/controlled Components
```
let input = document.querySelector('input[type="text"]');
// input.value will be equal to whatever text is currently in the text box.
let typedText = input.value; 
```
An _uncontrolled component_ is one that maintains its own internal state. 

A _controlled component_ is one that does not maintain any internal state. Thus, it must be controlled by someone else. 
Controlled components have no memory and can only retrieve information through _props_.

In the previous Email example, when ```<input />``` was given the ```value``` attribute, it became controlled. 

### ```useRef()``` Method
Rather than using a component's own state value, can be called directly from the DOM when needed.
```
const emailRef = React.useRef();

const handleChange = (e) => {
    const email = emailRef.current.value;
}

// later on
return (
    <form onSubmit={handleChange}>
        <input ref={emailRef} />
        <label>{email}</label>
    </form>
);
```

### When to use Uncontrolled?
For the most part, controlled should be chosen because of the pattern of storing mutable data in a component's state.

However, whenever dealing with ```<input type="file" />``` form elements, it should always be uncontrolled. 
