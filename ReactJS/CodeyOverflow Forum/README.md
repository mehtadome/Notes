# CodeyOverflow Forum
Project to create a basic forum alongside the Coding Academy tutorial on React-101

## File Breakdown

### index.js
Largely responsible for only rendering the ```App``` component.

### App.js
Top-level component responsible for returning the interface to be rendered. 

Returns instance of the ```Card``` component for every comment in **commentData.js**. 

### Card.js
Returns an instance of Header and Body with the relevant props passed in.

```commentObject``` represents each element in the array of comments from **commentData.js**. 

### Header.js
Responsible for displaying the ```username``` and ```profileImg``` within each comment in **commentData.js**.

### Body.js
Responsible for displaying the ```comment``` within each post in **commentData.js**.

### commentData.js
Contains the data of each forum post. Each element has a ```profileImg```, ```username```, and ```comment```.

### index.html and style.css
Contains formatting for the webpage.