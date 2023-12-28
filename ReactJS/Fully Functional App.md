# Building the Application
These notes follow alongside the Pluralsight course **Managing State in React 18** by _Cory House_.

The goal is to build the **Rock Fitness** store over 9 increments.

## File Structure
```db.json``` has the mock database.

```package.json``` manages dependencies and tells Node to build on localhost:3001. It also has configurations for the api ```json-server``` being used.

```Footer.jsx``` and ```Header.jsx``` are fillers. 

```index.js``` builds the DOM with ```root```.

```App.jsx``` controls the main application logic.

```services/``` folder has pre-made helper functions for working with the mock API.

### Basic Setup of Accompanying Files
Run ```npm install``` within either the **before**/**after** folder.

Run ```npm start``` to run and open the application in a window on default browser.


# Step 1: Local and Remote State

## Error Handling
The following was implemented:
- Error handling (instructions in **APIs.md**).


## Loading notifications.

Loading notifications were accomplished by doing something like this in ```package.json```. 
```
    "start-api": "json-server --port 3001 --watch db.json --delay 1000",
```
The code helps test its implementation. This is useful when in a real-world environment, where API calls can realistically take sometime to complete.

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
The method ```.finally()``` will run regardless of whether the pre-existing conditions are false or true. It's more logical to assume it is loading until it renders. 

A cool way to do this is using the provided ```Spinner``` component from the accompanying file ```Spinner.jsx```. Import it and then use it as such right before the return.
```
if (error) throw error;
if (loading) return <Spinner />;
return (...);
```
Refresh the page and you'll see the animated spinner to signify data is loading. 

## The Custom Hook 
Refer to the **APIs.md** _Custom Hook_ to see the final version of the API call.
- Note: Store any custom hooks in their own file.

# Step 2: Routing 
In a real app, pages have unique URLs. State will therefore be stored within the URL itself. 
- Uses **React Router**, a separate open source project. It is client-side routing.

## Configure React Router's Entry Point
```import { BrowserRouter } from 'react-router-dom';```

Place the component within the ```<ErrorBoundary>``` and around the ```<App />```.
```
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
```
This allows all child components too declare routes. 

## Creating App Layout
App.js should only contain the main layout of the page, meaning that it should only have a return which looks something like this:
```
export default function App() {
  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Products />
        </main>
      </div>
      <Footer />
    </>
  );
}
```
This would mean breaking down whatever else into a separate component (and file).

## Declaring Routes
```import { Routes, Route } from 'react-router-dom';```

Within the ```App()``` return, start using the ```<Routes>``` and ```<Route />``` component to create the webpage layout.
```
<main>
    <Routes>
        <Route path="/" element={ <Products />} />
        <Route path="/detail" element={ <Detail />} />
        <Route path="/cart" element={ <Cart />} />
    </Routes>
</main>
```
Dyanmically-based URL: ```<Route path="/:category" element={ <Products />} />```

In this code, the _colon_ signifies a category is going to be passed. So, if in the browser you typed in ```/shoes``` after localhost, it would take it to the ```<Product />``` webpage showing the shoes. This is because in the ```fetch()```, the url provided was ```"products?category=" + category```.
```
const { data: products, loading, error } = useFetch(
    "products?category=" + category
  );
```
Now the category is completely dynamic.

Dynamic placeholders can be nested like ```"/:category/:id"```. With this, we can do: 
```
<Link to={'/${category}/${p.id'}}>
```
Using a template string, we dynamically set category and id, letting the user click on the product and see whatever component is tied to the url ```"/:category/:id```.

## 404
To implement a 404 routing, we simply add a return in the topmost component.
```
if (products.length === 0) return <PageNotFound />;
```

## Client-side Navigation
```<Link />```s are used to store client-side data, make the process uber fast, and convenient to work with. It is imported from ```react-router-dom```. It functionally works under ```<li>``` from HTML.

It should be used within the ```<Header />``` like:
```
<li>
    <Link to="/">
        <img alt="Carved Rock Fitness" src="/images/logo.png" />
    </Link>
</li>
```

#### NavLink
```<NavLink>```s accept another prop for styling, making them more useful.

## useParams()
With _dyamic links_, we can connect ```useParams()``` to the link to destructure information from the url. 

Here, ```id``` is extracted from the url ```/:category/:id```.
```
const { id } = useParams();
```
By extracting the id, we can then use it inside a template literal string to navigate dynamically like so:
```
<Link to={`/${category}/${p.id}`}>
```

## Redirects
To include an onClick redirect, import it with ```import { useNavigate } from 'react-router-dom';``` and apply it as such:
```
// initialize it before return
const navigate = useNavigate();
// inside a tag:
onClick={() => navigate("/cart")}
```

# Step 3: Shared, Derived, and Immutable State

#### Shared State
Shared state entails creating it in the top-most shared component. In our app, Cart and Detail are closely tied together at the same level. Their parent is the App itself, so state is defined in ```<App />``` and shared between ```<Detail />``` and ```<Cart />```.

#### Derived State
When it comes to deriving state, it should be updated using a function. Referencing existing state in just the argument leads to batching and potentially slower response times.

So, do ```setCount((count) => count + 1);```.

Do not use ```setCount(count + 1);```.

#### Immutable State
In React, state is immutable for way better performance optimizations. Overriding a value in memory is actually cheaper than mutating a variable, data structure, or state.

Immutability follows the idea that state shouldn't be incremented as such -> ```count++;``` It can also eliminate different checks like:
```
if (prevState !== state) {...}
```
Mutable:
- Objects, Arrays, Functions.

So, to change state, return a new value. When passing objects or arrays into state, an inherently immutable practice, extra steps taken are:
### Object.assign
```Object.assign({}, state, { role: "admin" });```
- Creates an empty object. 
- Mix new object together with existing state. 
- Implement the change wanted. In this case, changing the role to admin.

### { ...myObj }
```
const newState = { ...state, role: "admin" };
const newUsers = [ ...state.users ];
```
- Spread syntax, indicated by ```...``` means to create a new object with the copy of state.
- Then change the value.

+ Spread syntax is more commonly seen because it is less code.

#### Nested Objects
Both ```Object.assign``` and ```...``` notation doesn't apply to nested objects. 
```
const user = {
  name: 'Cory',
  address: {
    state: 'CA'
  }
}
const userCopy = { ...user };
```
If ```user``` is the object and it is copied into a new state using either method, the nested ```address``` object isn't copied over. This is because both methods only do _shallow copying_.

Fix it with ```const userCopy = { ...user, address: {...user.address }};```

Using one state for nested objects is **ill-advised**. It is far more acceptable to create as many states as necessary if mutating nested objects is the goal:
```
const [user, setUser] = useState(user);
const [address, setAddress] = useState(user.address);
```
Using this method also makes it easier to send data back to server if needed. The two objects are easy to merge.

It is best practice to **avoid deep cloning** because it is expensive and wasteful. **Only clone what changes**.

### .map
For arrays, avoid ```push``` and ```pop```. Instead, use:
```
map(), filter(), reduce(), concat(), spread()
```
These methods return a new array. 

## .filter
We know we use ```.filter()``` for items we want to keep. This can be used to delete items we no longer need as well. Simply put, it looks like this:
```
if (quantity === 0) {
  items.filter((i) => i.sku !== sku);
}
```
In this example, we filter out any sku whose quantity = 0.

## useMemo
An alternate way to reduce expensive calculations. Only when the value changes will the function actually trigger, instead on each render.
```
const numItemsInCart = useMemo(
  () => cart.reduce((total, item) => total + item.quantity, 0), [cart]
);
```

### Expressing when plural
A neat way to label a string with its plural value when plural.
```
<h1>
  {numItemsInCart === 0
    ? "Your cart is empty"
    : `${numItemsInCart} Item${numItemsInCart > 1 ? "s" : ""} in My Cart`}
</h1>
```
This can display "10 Items in My Cart".

## localStorage
```localStorage``` is one of the many _Web Storage_ options available to be used to store information between reloads. To use it:
```
// stored in an effect
useEffect(() => localStorage.setItem(  
  // provide a key
    "cart",
  // what is wanted to be stored
    JSON.stringify(cart)), 
  // only when the cart changes  
    [cart]);
```
To make use of the new storage in use, you can use an inline state function to retrieve the data.
```
const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) 
      // nullish coalescing operator { whatever is on left of ?? is null/undefined, use value on the right }
      ?? [];
    } catch {
      console.error("The cart could not be parsed into JSON.");
      return [];
    }
});
```

# Step 6: Form State and Validation

## .persist
When using event targets and states, the event must be _persisted_. This means to tell React not to garbage collect it. 
```function handleChange(e) { e.persist(); }```

- Depracated in React 17 or newer because it automatically persists. 

## Form Validation
Handles many states, inputs, and errors for its scope. In our app, it oversees
+ touched: 

What fields have been touched?
+ submitted: 

Has the form been submitted?
+ isSubmitting: 

Is a submission in progress?
+ isValid: 

Is the form currently valid?
+ errors: 

What are the errors for each field?
+ dirty: 

Has the form changed?

## State Enums
Something like this can sometimes occur:
```
const [submitting, setSubmitting] = useState(false); // Submit in progress
const [submitted, setSubmitted] = useState(false);   // Submitted with errors
const [completed, setCompleted] = useState(false);   // Submitted w/out errors
```
This will become a hassle because the form can only be in one of 3 states at a given time. To combat this, we can use a _single status "enum"_ instead.
```
const STATUS = {
  IDLE:       "IDLE",
  SUBMITTING: "SUBMITTING",
  SUBMITTED:  "SUBMITTED",
  COMPLETED:  "COMPLETED",
};

const [status, setStatus] = useState(STATUS.IDLE);
```
JS doesn't have built-in enumerations but you can replicate the logic with an object like ```STATUS``` as above. An _enumeration_ is a list of options.

Used like:
```
async function handleSubmit(event) {
    event.preventDefault();     // prevents form from POSTing back
    setStatus(STATUS.SUBMITTING);
    try {
      await saveShippingAddress(address);
      emptyCart();
      setStatus(STATUS.COMPLETED);
    } catch(e) {
      setSaveError(e);
    }
  }
if (STATUS.COMPLETED) { return <h1>Thanks for shopping with us!</h1>; }
```

### Finite State Machine
Only _one_ state can be active at the same time. The machine transitions from state to another.

A reliable, popular open-source one is **XState**. It is an alternate to the state enum pattern used above.

# Step 7: Managing State with Refs
When an API call occurs, it isn't guaranteed to execute fast all the time. This can lead to an error on what's called un-mounted nodes. 

Set the ```"start-api"``` delay to 1500 within **package.json** and launch developer tools. 

When navigating to Shoes and back immediately, React may issue a warning. This is because when the call is completed, the component is no longer mounted.
```
const isMounted = useRef(false);

// we know a component is mounted when effect renders
useEffect(() => {
  isMounted.current = true;
  // other logic
  if (isMounted) setData(json);
}
return () => { isMounted.current = false; }
, []);
```
**useFetchAll.js** manages an array of urls. We'd like it to not re-run if the urls hasn't changed but we can't pass in ```urls``` into the dependency array because it causes an infinite loop.

So, by using useRef, we can judge whether the ```.current``` urls are equal to the urls passed. If they are, simply return without many any Promises. If they aren't equal, store it.
```
const prevUrls = useRef([]);

useEffect(() => {
  if (areEqual(prevUrls.current, urls)) => return;
  
  prevUrls.current = urls;
  // fetch logic  
});
```

#### Handy areEqual() for Arrays
```
function areEqual(array1, array2) {
  return (
    array1.length === array2.length &&
    array1.every((value, index) => value === array2[index])
  );
}
```

# Step 8: Managing Complex State with useReducer
```useReducer()``` is a _pure function_ that accepts state and an action. Whatever is returned becomes the new state. 

The function is passed to the useReducer hook which returns the initial state and a _dispatch function_. The dispatch function will _dispatch_ actions to change state. 

useReducer is great for extracting state logic outside of the component completely. It's better for scalability due to its reusability and unit testing.

# Step 9: Sharing State and Functions via Context
Can use **Redux** or a **User Context Provider**. 
+ Redux is covered later.

Context has two pieces, a _Provider_ which provides data and functions, and a _Consumer_ which consumes that data and functions.

Wrapping the context in some sort of ```useContext()``` hook makes it easier to understand when to use the context wanted. Finally, make sure to catch any errors with a helpful message to force a context provider to be used.

# Step 10: Managing State in Thid Party Libraries
Realistically, using third-party libraries is easier than creating it yourself. 

Refer to ```managing-state-via-third-party-libraries-slides.pdf``` for a great summary of information on the different libraries.

# Step 11: Suggested Improvements
Add backpacks to the store. There are images in the **public/** folder. 

Finish checkout process:
+ Accept billing info and payment.
+ Save partially completed checkout (billing/payment omitted).
+ Display order confirmation.

Display cart quantity in navigation next to cart link.

Try using **react-query** or **swr**.
