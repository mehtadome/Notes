# Organized Reactjs Concepts

Intended for re-explaining React concepts after a higher level of learning has been established.

# 4 Ways to create Components

There are four main ways to create components, all of which has been done in many different applications leading up to these notes.

## Function

In this one, React assumes the `return` will include the render logic.

```
function HelloWorld(props) {
    return (
        <h1>Hello World!</h1>
    );
}
```

## Arrow Function

On-line sentence where arguments go into the `()`.

```
const HelloWorld = (props) => <h1>Hello World!</h1>;
```

This allows you to wrap the JSX into different areas of the application for reuse. There is no `return` because it is inherently assumed from this syntax.

## createClass

Oldest version made. No longer common to see.

```
var HelloWorld = React.createClass({
    render: function() {
        return (
            <h1>Hello World!</h1>
        );
    }
});
```

## JS Class

Also old version which used a class component of JavaScript.

```
class HelloWorld extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <h1>Hello World!</h1>
        );
    }
}
```

# Styling

To import a library or framework to use like **Bootstrap**, it has to be put in the package.json as so:

```
"dependencies": {
    "bootstrap": "5.0.2", ...}
```

and used like such `import "bootstrap/dict/css/bootstrap/min.css";`

At the top level of the application, typically **index.js**, the css imports will go. If a self-made css file is also created, it will join the example Bootstrap one at the top too.

```
import App from "./components/App";
import "bootstrap/dict/css/bootstrap/min.css";
import "./index.css";
```

# Routing

**Routing is used to design the layout of the application.** The routing syntax is as follows:

```
<Route exact path="/" component={HomePage} />
```

The `exact` keyword is used best for the root directory. This is because other pages will all start with a `/`.

Import with:

```
import { Route } from "react-router-dom";
```

## Switches

A `switch` is used to match exact routing once the path has been identified and quit looking for other potential routes.

Switching is more commonly used for **automatically handling 404s**. If no path was identified, the last entry in the Switch is assumed.

```
<Switch>
    <Route exact path="/" component={HomePage} />
    <Route path="/about" component={AboutPage} />
    <Route component={PageNotFound} />
</Switch>
```

Notice how the `<PageNotFound />` component has no `path` declared.

Import with:

```
import { Route, Switch } from "react-router-dom";
```

## Navigation

**Navigation** is setting up the sitemap links accessible somewhere on the page. Usually, it is seen at the top and bottom of the page.

The NavLinks must be wrapped in a `<nav></nav>` tag.

```
<nav>
    <NavLink to="/" activeStyle={activeStyle} exact>
    Home
    </NavLink>
</nav>
```

The `exact` in this means only that lunk will receive the activeStyle when on HomePage.

Import with:

```
import { NavLink } from "react-router-dom";
```

# Shortcuts

## Right-hand Reduction

If an object is being referenced and both the left and right-hand side are the same, it does not need to be stated twice.
`courses: courses` and be simplified to just `courses`.

```
const rootReducer = combineReducers({
  courses,
});
```
