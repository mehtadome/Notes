# Star-Match Game
Game created alongside Samer Buna's Pluralsight course. Used a playground environment located at -> [https://jscomplete.com/playground/rgs3.9].

This folder contains the basic structure needed to build the Star-Match game locally.

## Pre-Reqs
- Node.js (```npm``` and ```npx```) -> [https://nodejs.org/en/download]


## Install 
Run in terminal ```npx reactful Star-Match```.

Do ```npm start``` inside the Star-Match folder to first ensure the basic app is running as intended.

# Implement Star-Match
Pull the structured code for Star-Match and copy into the relevant files. You can easily do this by downloading ```src.zip```, extracting it, and pulling the contents into the root Star-Match directory. It will override the files where changes occurred and leave everything else untouched.

Once again, run ```npm start``` and the code should work. 

## Folder ```components/```

### App.js
Builds the entire game and exports it as ```App``` to be rendered by the **dom** and **server** within the **renderers** folder.

### Game.js
Implements all state and math logic to build the Star-Match game.

### PlayAgain.js
Controls the UI for playing again.

### PlayNumber.js
Controls the UI for color changes.

### StarsDisplay.js
Controls the UI for stars.

## Folder ```renderers/```

### dom.js
Builds the DOM. 

- Slight change to importing the ```App``` because of mismatched exporting/importing syntax.

### server.js
Configures the server. 

- Slight change to importing the ```App``` because of mismatched exporting/importing syntax.

## File ```math-utils.js```
Controls the math-science of the game and is utilized by most files in the **components** folder.