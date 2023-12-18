# Reactjs
Developed in 2011 by Facebook, been open-sourced since 2013.

In 2014, ```react-native``` was released for mobile applications.

# Why React?
Supported by most large corporations with memorable web-app / mobile experiences. 

1. 140,000+ stars on Github.
2. 1,300+ contributors.
3. Millions of downloads/week.
4. Powers most web-app applications - corporate and user-driven.

### Some Technical
The virtual DOM was innovated because constantly updating the DOM is costly and time-inefficient.

#### Alternative less-heavy bundles:
**React** 35k components
**Inferno** 9k components
**Preact** 3k components

Alternate bundles are great if only specific components are wanted and space is important. Both bundles use the same API as React. 

## Open-sourced projects which use Reactjs
**Fabric** by Microsoft for a feel similar to MSFT Office.
**Material-UI** by Google for development alongside their guidelines.
**React Bootstrap** which is Bootstrap-based React.

# Trade Offs

## Library vs Framework
Light-weight, sprinkle on existing apps, pick what you need.

Compared to:

**Framework**: clear opinions, less setup overhead, cross-team consistency, less decision fatigue.

### Features
For a framework like Angular, most features come bundled up together all at once. 

With React, you select the pieces for your use case and add them in. For example:
1. Testing: _Jest_, _Mocha_
2. Animation: _react-motion_
3. Form Validation: _react-forms_

## Concise vs Explicit

### Concise
In typical JS, for some sort of event change, it follows:
```
let user = 'Cory';
<input 
    type="text"
    value={user}
/>
```
This is called _two-way binding_ and is simplistic code to represent _change_.
### Explicit
In React, you follow _one-way binding_ to represent _change_. The main difference is you code more for the sake of having more control.
```
state = { user: 'Cory' };

function handleChange(event) { 
    this.setState({ 
        user: event.target.value 
        });  
    }

<input
    type = "text"
    value = {this.state.user}
    onChange = {this.handleChange}
/>
```
It is _not_ recommended to mix applications flipping between one to two-way bindings. Plan accordingly.

## Template vs JavaScript

### Template-centric
Angular and other frameworks require you to learn the specificties of the framework _but_ don't force you to learn JavaScript to work with them. They, instead, will take down certain concepts and syntax from JS. 

+ Little JS knowledge required.
+ Avoid confusion w/ JS binding.
+ Rule of least power.

### JavaScript-centic
In contrast, everything would be based around JavaScript and would not need to learn Framework-specific vocabulary. 

+ Little framework-specific syntax
+ Fewer concepts to learn
+ Less code, easy to read
+ Makes you a good JS developer too

## Separate vs Single File

### Model View Component (MVC)
MVC was the most common best practice before React. It consists of three separate files:

```_.js```, ```_.css```, ```_.html```

You split the logic, styling, and html from each other.
### Nested structure
In React, you don't need to be limited to one file for the ```_.js```. In fact, most nested components will exist in their own files dedicate to just one aspect of the component.

## Corporate vs Community
+ React is a corporate-driven library. Although there is not community of individual open-source creators, there are over 1,000 Meta employees consistently contributing.

- Driven by Facebook's needs.

# Why Not React?
- Decision fatigue
- JSX differs from HTML
- Build step
- Potential version conflicts

### Decision Fatigue
React uses many different components that fall under: 

Dev environment, classes or functions, types, state, styling.

Deciding which components to use gets tiring fast.

#### Dev Environment
[https://javascriptstuff.com/react-starter-projects]
Over 200 products to choose from. _Create React App_ is the official devlopment environment supported by Meta.

Some related libraries like _React Router_ for routing and _Redux_ for state management can help down the line.

#### Classes vs Functions
Generally, users prefer Functions

#### Types
Can use PropTypes (built-in props), TypeScript, or Flow. TypeScript is the most common.

#### State
Other libraries include Flux, Redux, MobX. Flux is Meta-created.

Plain React - Component State

Flux - Centralized State

Redux - Centralized State

MobX - Observable State

#### Styling
Majority of React developers continue to use CSS styling in a separate document.

### JSX Differs from HTML
Can use an ```npm``` package to convert HTML to JSX

### Build Step
A more modernly-accepted step that _should_ be explicitly defined more often. Most popular is ```create-react-app```.

Remember that it was used with ```npm create-react-app -g <name>``` most recently.

### Version Conflicts
Can't run two versions of react at the same time on the same page. Standard web components don't have to worry about this because they leverage tools used by the browser.

Meta releases a ```react-codemod``` for automatically upgrading react components.
