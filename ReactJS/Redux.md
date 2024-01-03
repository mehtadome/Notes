# Syntax Notes on Redux

Redux is an object-store alternative to handling state in React.

Instead of using props or context, all state changes are monitored by a single store that sits next to the application. The store itself updates when any new data is added and rerenders components dependent on that data.

To trigger a change in the store, an action must occur or a reducer must pass an update. **Immutability** in React means that to change state, return a new object.

## Store

To create the store, we do:

```
let store = createStore(reducer);
```

The store itself has a couple methods at its disposal:

```
store.dispatch( action )
store.subscribe( listener )
store.getState()
replaceReducer( nextReducer )
```

## Actions

To create an action, a type and a value is required. This is called an _Action Creator_ and looks like:

```
return { type: RATE_COURSE, rating: 5 }
```

## Reducers

Reducers are created as they are in regular JSX. The main difference is that when connected to the store, all reducers run on each dispatch.

Since not every reducer will follow a certain action, returning the same state is highly advised for the `default` option in the switch statement.

```
function myReducer(state, action) {
    switch(action.type) {
        case "INCREMENT":
            return { ...state, counter: state.counter + 1};
        default:
            return state
    }
}
```

Remember that the store is created using the reducer passed in as a paramater.

# Connect Redux to React

The library is called `react-redux`.

Identify which components need Redux and which don't. Presentational components won't need Redux because they don't handle any state. Changes can still be passed down as props when needed.

Container components _will_ need to be aware of Redux.

## Provider and Connect

There are two core components, provider and connect.

`Provider` attaches app to the store.

```
<Provider store={this.props.store}>
    <App />
</Provider>
```

Note how the Provider component is using React's context.

`Connect` creates container components.

```
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthorPage);
```

Everytime the component updates, `mapStateToProps` will be called. It determines what state is available on the container component. Consider "What state should I expose as props?"

```
function mapStateToProps(state) {
    return {
        users: state.users
    };
}
```

This is telling the state to be stores is an object with users set to the current state's users.

The second argument `mapDispatchToProps` which specifies what action are exposed as props.

```
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(action, dispatch)
    };
}
```

Used a Redux-brought function called `bindActionCreators` which wraps the _action creators_ in a dispatch call for you.

There are 3 other ways to do so, ignore it since it's an optional argument, manually wrap it in dispatch, or return object. Return object looks like:

```
const matchDispatchToProps = { incrementCounter };
```

This and `bindActionCreators` seem to be the most widely accepted ways of doing so.
