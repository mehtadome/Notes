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

This allows you to wrap the JSX into different areas of the application for reuse.

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
