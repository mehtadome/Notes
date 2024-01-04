# TypeScript

TypeScript is highly-typed language which sacrifices magic for easy type checking. This means there is more _boilerplate_ at the benefit of easier coding when type clashes occur.

A TypeScript file is denoted by a `.tsx` extension.

## Setup

Setup a normal ReactJS project as you would, using Node and your preferred development environment like CRA or jScript.

When the application is setup, use the following to install yarn, a type of package manager like npm -> `npm install --global yarn`.

Finally, run the following within the root directory of the project to build the support for using TypeScript -> `yarn add typescript @types/react @types/react-dom @types/react-router-dom @types/node`.

You should then be able to run `npm install` and `npm start` afterwards.

## Syntax Introduction

TypeScript requires type to be provided within function arguments so it can provide better insight. An example of this is with the Error type:

```
function getError(error, errorInfo) {...}
```

The above is in React. To translate it, it would become:

```
function getError(error: Error, errorInfo: React.ErrorInfo) {...}
```

A handy TypeScript _shortcut_ is to right click on the type itself which will take you to a file within the dependencies dictating the type definition itself.

# Hooks

All hooks require the type to be explicitly defined. The syntax is similar to Java using the `<>` operator.

## State

Use an interface to declare the type and information.

```
interface AuthInfo {
    userData: string;
}
// in function
const [authInfo, setAuthInfo] = useState<AuthInfo>({userData: null})
```

You must also declare the base value to be null instead of simply passing in the empty object with `{}`.

You can nest different interfaces to support different logic. Say you want `userData` to be either the `role` of "ADMIN" or "USER":

```
interface Role {
    role: "USER" | "ADMIN";
}
interface AuthInfo {
    userData: Role | null;
}
```

The the pipe operator `|` is saying it can be one or the other. This means that `userData` can either be a role of ADMIN or USER or null.

## Context

The approach is similarly implemented as useState.

```
interface AuthContextValues {
    isAuthed: boolean;
}
export const AuthContext = createContext<undefined | AuthContextValues>(undefined);
const Provider = AuthContext.Provider;
```

You can also nest the `|` logic directly into the `<>`.

## Effect

useEffect does not explicitly change in its syntax since it already uses an explicit arrow function.

## Ref

useRef is similar to useState in that it requires `<>`.

```
const inputRef = React.useRef<HTMLInputElement>(null);
```

`HTMLInputElement` is a generic built-in element.

## Reducer

A reducer requires slightly more work. Remember a reducer has a `state` and an `action`.

The state can be an interface:

```
interface State {
    title: string;
    description: string;
}
```

The action is defined as a type:

```
type Action = {
    {
      type: "onChange";
      payload: { value: string };
    }
}
```

The reducer's logic is then built with:

```
function formReducer(state: State, action: Action) {
    switch (action.type) {
        case "onChange":
            return {...state, action.payload.value};

        default:
            return state;
    }
}
```

For creating the reducer itself, you can take advantage of interface nesting to set an initialState:

```
const initialState: State = {
    title: "",
    description: "",
};

const [formValues, dispatch] = React.useReducer(formReducer, initialState);
```

Finally, for doing some sort of dispatch, the general syntax stays the same:

```
// located in an event handler
dispatch({
    type: "onChange",
    payload: {
    value: target.value,
    },
});
```

# Components

## Props

To initiate props correctly, the type needs to be specified. This is relatively easy when destructuring props:

```
function NavigationLink({ label: string, value: int }) {...}
```

Unsure if it needs to specified instead with `props explicitly`:

```
function NavigationLink(props: { label: string; value: int }) {...}
```

In the **child component**, the Props must be explicitly defined with an interface as such:

```
interface Props {
    myval: React.ReactNode;
}
export function AuthProvider({ myval }: Props) {...}
```

## Async Function

Falls under a `SyntheticEvent`.

```
async function submitForm (event: React.SyntheticEvent) {...}
```

## Event Handlers

An event falls under `React.ChangeEvent`.

```
function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.current.target;

    const payload = <h1>{target.name} , {target.value}</h1>;
}
```

If an event handler needs to reference more information about the target, it needs to pass in a generic built-in element.

If nothing is passed in, `ChangeEvent`'s default will be just an Element. By overriding it to `HTMLInputElement`, it makes the properties of input elements available from the type definition.

## APIs

The main setup of using an API call will communicate the types:

```
export interface sessionInfo {
  sessionById: sessionInfo_sessionById | null;
  user: sessionInfo_user | null;
}

export interface sessionInfoVariables {
  id: string;
}

const { session_id } = useParams<{ session_id: string }>();

const { loading, error, data } = useQuery<sessionInfo, sessionInfoVariables>(
SESSION_BY_ID,
{
    variables: { id: session_id },
}
);
```
