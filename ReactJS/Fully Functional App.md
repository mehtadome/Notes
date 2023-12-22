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