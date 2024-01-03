# Intro to working with Redux

Redux is a centralized state store for React. The way it enforces this is different than traditional React.

**Redux enforces keeping all state in a single, centralized object graph.** It makes the app easier to understand and avoids the complexity of handling interations between multiple stores.

Anytime a component accepts a new change, that change is reflected in the Redux's object store and any other components dependent on that data will re-render to follow the new user data.

## 3 Principles

The store itself cannot be changed directly making it **one immutable store**. To communicate a change, **actions triggers change** and/or **reducers update state**.

```
{
    type: SUBMIT_CONTACT_FORM,
    message: "Hi."
}
```

## Build the App

In the root directory, run `npm install` to build the node_modules. Then, run `npm start`.

Incase you get the error `EADDRINUSE` which causes a build failure, change the port in package.json:
`"start": "webpack serve --config webpack.config.dev.js --port 3000"`

## App Structure

Led by an **index.js** file in **src**. It imports an `<App />` component from **components**. The App component contains the routing for the application.

### Application Dependencie

Webpack, Babel, Node, ESLint.

This app will hold the courses in an array but for bigger data structures, use a JSON rooted by IDs.

Implemented:

```
const courses = [
    { id: 1, title: "Course 1" },
    { id: 2, title: "Course 2"}
]
courses.find(c => c.id == 2)
```

Suggested:

```
const courses = {
    1: { id: 1, title: "Course 1" },
    2: { id: 2, title: "Course 2"}
}
courses[2]
```

# Creating the Redux Store

In its base form, the Redux store looks like:

```
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/index";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";

export default function configureStore(initialState) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(reduxImmutableStateInvariant()))
  );
}
```

`applyMiddleware` allows the store to have other enhancements like having the _immutability invariant_, which means it will not allow any mutating of state when being used.

`composeEnhancers` allows the inspect window of the application use better devtools for Redux and enforces it onto the user.

Then, import it into the root **index.js** file of the entire application like such:

```
import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";

const store = configureStore();
```

and wrap `<ReduxProvider store={store}>` around the application.

## Middleware

Having middleware enhances the store's ability to efficiently manage itself and other components in the application.

API calls in Redux can be inefficient so using a 3rd-party library is common. One such library is **Thunk**. Thunk refers to a function that wraps an expression to delay its evaluation. Thunk code looks like:

```
export function deleteAuthor(authorId) {
  return (dispatch, getState) =>
  {
    return AuthorApi.deleteAuthor(authorId)/then(() =>
    {
      dispatch(deleteAuthor(authorId));
    })
    .catch(handleError);
  };
}
```

Thunks allow components to call sync and async actions the same way, plus they don't have to worry about the dispatch.

Import with:

```
import thunk from 'redux-thunk';
```
