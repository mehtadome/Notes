# Building an Application
These notes follow alongside the Pluralsight course **Managing State in React 18** by _Cory House_.

The goal is to build a ___ over many increments.

### File Structure
```db.json``` has the mock database.

```package.json``` manages dependencies and tells Node to build on localhost:3001. It also has configurations for the api ```json-server``` being used.

```Footer.jsx``` and ```Header.jsx``` are fillers. 

```index.js``` builds the DOM with ```root```.

```App.jsx``` controls the main application logic.

```services/``` folder has pre-made helper functions for working with the mock API.

### Basic Setup of Accompanying Files
Run ```npm install``` within either the **before**/**after** folder.

Run ```npm start``` to run and open the application in a window on default browser.


# State
We know the basic syntax of creating state is ```const [size, setSize] = useState("");``` for example. 

This syntax is actually utilizing _array destructuring_ and the following is also acceptable:
```
const state = useState("");
const size = state[0];
const setSize = state[1];
```

Both _states_ and _effects_ are _**Hooks**_. Hooks cannot be nested within conditionals and must be defined at the root of the component like such:
```
const MyComponent = () => {
    const [size, setSize] = useState("");
    useEffect(() => {.....});

    if (size ...) {.....}

    return (....);
}
```

## The API using Hooks
Error handling (instructions in **APIs.md**).

Loading notifications, accomplished by doing something like this in ```package.json```. The following code helps test its implementation. This is useful when in a real-world environment, the API call takes sometime to complete.
```
    "start-api": "json-server --port 3001 --watch db.json --delay 1000",
```
In code, it looks like:
```
const [loading, setLoading] = useState(true);
useEffect(
    () => {
      getProducts("shoes").then( (response) => setProducts(response))
      .catch( (e) => setError(e) )
      .finally( () => setLoading(false) );
    },
[]);
```
The method ```.finally()``` will run regardless if the pre-existing conditions are false or true. It's more logical to assume it is loading until it renders. 

A cool way to do this is using the provided ```Spinner``` component from the accompanying file ```Spinner.jsx```. Import it and then use it as such right before the return.
```
if (error) throw error;
if (loading) return <Spinner />;
return (...);
```
Refresh the page and you'll see the animated spinner to signify data is loading. 

Refer to the **APIs.md** _Custom Hook_ to see the final version of the API call.

