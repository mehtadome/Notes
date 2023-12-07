# Getting Started in JavaScript

## Environment
```Node.js``` and _Electron_ for local server development.

When running npm install, use it in the terminal because it is common to run into errors using VSCode's terminal.

Use ```npm install``` to build dependencies and push the project into a runable state.

Use ```npm run start``` to run the application.

## JavaScript in HTML

Use the ```<script>``` tag in an HTML file to code js. However, it's best to use a separate js file using 

```<script src="./filename.js"></script>```

The ```./``` will tell the interpreter it is in the same folder at the HTML file.

Libraries that span the webpage should be put up in the ```<head>``` section. The ```<script>``` tag for the js file goes at the bottom, after all the html is loaded, right before ```</body>```.

Using a file with the common-name ```utils.js``` is the standard for self-made modules. It needs to proceed other js file sourcing.

## JavaScript Fundamentals

The ```var``` keyword in javascript is no longer best practice. The new standard is ```let```.

You are able to declare many variables at once.