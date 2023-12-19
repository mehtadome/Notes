# React 17: Getting Started
These notes follow alongside the PluralSight course by Samer Buna. 

He uses his own self-made playground on [https://jscomplete.com/playground/rgs1.1] which builds off the **Babel** Reactjs library. 

Every module is differed by the first digit ```#.1``` and lessons are the second digit ```1.#```.

This course also utilizes the **React Developer Tools** browser extension.

# States
State definition stays in top-most parent that builds the components. Usually, this is in the ```<App />``` component.
```
function App() {
	const [counter, setCounter] = useState(0);
    const incrementCounter = (incr) => setCounter(counter+incr);
	return (
        <>
            <Button onClickFunction={incrementCounter} />
            <Display message={counter}/>
        </>
    );}
```

### Props
To use ```props``` in lower components, pass it in the argument of the function like: 
```
function Display(props) {
	return (
  	<div>{props.message}</div>
  );
}
```

### Arguments
To use arguments when dealing with states, passing in an argument isn't enough because states require a _function reference_ to work properly, not just an _invocation_.

Take a look at following code, we want to pass in a argument ```props.increment.```
```
return (
  	<button onClick={
        props.onClickFunctions(props.increment)
    }></button>
);
```
This doesn't work and is fixed with using the function wrapper (```() =>```)
```
<button onClick={ 
    () => props.onClickFunctions(props.increment) 
    }></button>
```
For the sake of best practice, keep it as its own reference:
```
const handleClick = () => props.onClickFunction(props.increment);
<button onClick={handleClick}></button>
```

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


# Appendix
**Reactjs Classes App** [https://jscomplete.com/playground/rgs2.7]
