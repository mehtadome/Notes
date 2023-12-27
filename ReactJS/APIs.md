# ReactJS Information on APIs
Contains information and examples on how to work with APIs in React.

There are 4  ways of handling calls in React.

## Inline (Not Recommended)
```
export default function Demo() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('users');
        .then(resp => resp.json())
        .then(json => setUsers(json));
    }), [];
    return users[0].name
}
```
Inline calls are hard to handle consistently across the app. This API call can't be reused when coded like such.

## Centralized Functions
Calls a separate function imported from another file. 
```
import { getProducts } from "./services/productService";

{
    useEffect(() => {
        getProducts("shoes").then( (response) => setProducts(response));
    }, []);
}

// productService.js
export async function getProducts(category) {
  const response = await fetch(baseUrl + "products?category=" + category);
  if (response.ok) return response.json();
  throw response;
}
```

## Create a Custom Hook
### useFetch(url)
```
const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function useFetch(url) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function init() {
          try {
            const response = await fetch(baseUrl + url);
            if (response.ok) 
            {
                const myjson = await response.json();
                setData(myjson);
            } else {
                throw response;
            }
          } catch (e) {
            setError(e);
          
          } finally {
            setLoading(false);
          }
        }
        init();
      }, [url]);

    return { data, error, loading };
}
```
By using a custom hook, it takes care of all relevant states, data fetching, error handling, and the final parsing and passing of data back to the main ```<App />```.
### useFetchAll(urls)
Can utilize a built-in JS function ```Promise()``` to make multiple requests at once. 

Refer to the **useFetchAll.js** file. 

## Library
Call a third-party library that handles it all for you and more.

Some that do this are:
- react-query
- swr

(final module)

# Error Handling
In React, what is called an _Error Boundary_ is used like an exception -> [https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary].
- Copy code into a new file under **src/** named ```ErrorBoundary.jsx```.

Wrap it as such in whatever file builds the DOM:
```
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
);
```
With this, any error that occurs in our application will be caught. Obviously, it won't catch **all** errors. Not caught:
- Event handlers
- Asynchronous code (setTimeout, etc callbacks)
- Server side rendering
- Errors thrown in boundary itself (not children)

## Async error workaround
```
const [error, setError] = useState(null);
useEffect(
    () => {
      getProducts("shoes").then( (response) => setProducts(response))
      .catch( (e) => setError(e) );
    }, []);

// right before return
if (error) throw error;
retun (.....);
```
Can use a state to determine if an error has occurred, catch, and throw it.