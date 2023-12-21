# Notes on HTML / CSS / JS

## HTML

If manually styling is wanted, it must be defined in ```<head>```.
```
<head>
<link rel="stylesheet" href="styles.css">
</head>
```

### HTML5 Flowchart
Provides useful feedback on which tag to use based on different use cases / wants. 

Generally speaking, using a ```<div>``` or ```<p>``` consistently is bad practice. Using a flowchart helps you find better alternative tags which are more _descriptive_. A good alternate to a div is a ```<section>```. 

## JavaScript (JS)

Can use the Inspect Element _console_ to script .js directly.

```const``` is used for constants. It's great for math, operations, and more.

```
let links = document.querySelectorAll(".tag");
links.foreach(function(link) {
    link.setAttribute("target", "_blank");
});
```
An example of how JS can select all selectors with the class "tag" and then edit their content.

In the foreach loop, the link variable is a different link on the page per iteration.

This code finds every link under the _class_ tag and adds an attribute "target" to it (aka pop open a new tab).

### Classlist

Because ```class``` is a dedicated keyword in JS, you can use classList to refer to a _class_. 
```
let card = document.querySelector(".card");
card.classList.add("dark");   // you don't use the dot when not selecting.
```


## CSS

### Selectors

```
container p:first-child::first-letter {
    font-size: 42px;
    text-transform: uppercase;
}
```
1. Look for an element with the class name 'container'.
2. Find the _paragraph_ inside of it.
3. Locate its _first_ element.
4. Apply the style only to the _first letter_ of that element.

```
img[src="https://fakelink.org"] {
    border: solid 3px #39f;
}
```
tag -> attribute with that specific _src_ -> apply those rules.

```
h1, h2 {
    border: solid 1pc #ccc;
}
```
Can group multiple identities into one selector's ruleset.
```
.class-name > p {
    font-size: 1.5em;
}
```
Any _paragraph_ inside ```.class-name``` gets the specified styling.

### Cascading and Specificity

CSS cascading means if the same element is styled later in code, it will be overwritten by the new styling.

However, with specificity (aka using ```class="example"```), styling for the class (```.example {}```) will always take precedence.

If a separate styles.css is used and there is styling in the head of the html doc, head takes precedance.
If there is then styling specified within the actual element, that takes precedance.

### Inheritance

Many styles are inherited from the parent. Some won't be and will need to specified separately.

### Live Styling

Developing CSS within the _Inspect Element_ of the webpage allows for dynamic styling. The window lets you check/uncheck style rules and view updates synchronously.

**Do not refresh page, make sure to CTRL+C/P into local document first.**

### Box Structure
Border -> Margin -> Padding 
_Padding_ is the amount of space between an element's border and the content inside.

Classic Box Approach:
```
Width + Padding + Margin = Width
150px + 10px    + 10px   = 170px
```
Box Sizing Approach:
```
Width + Padding + Margin = Width
150px + 10px    + 10px   = 150px
```
To use it, ```box-sizing: border-box;```
Example to force it on all elements is to:
```
html {
    box-sizing: border-box;
}
*, *:before, *:after {
    box-sizing: inherit;
}
```
### Flexbox
Using Flex like in this example allows for easier designing.
```
.columns {
    border: solid 1px #39f;
    display: flex;
}
.columns > div {
    border: solid 1px #ccc;
    flex: 1;
}
```
It will automatically, dynamically adjust elements. 
### Media Query
Good for targeting layouts for different contexts.
```
@media print { .mobile { display: none; } }
```
When the use is trying to print the page, it hides whatever element. 
```
@media screen and (min-width: 768px) {
    .mobile { display: None; }
    .desktop { display: block; }
}
```
Screen changes when condition passes.
### Can I use?
Gives information on what browsers/devices support which design elements.
```https://caniuse.com```
