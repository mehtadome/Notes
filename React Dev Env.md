# Setting up a Development Environment
Following alongside the instructions from Pluralsight's **React 17: Getting Started** by _Samer Buna_.

# Node.js 
```npm``` or _Node Package Manager_ is the central tool for building and maintaining and React application.

To test successfull installation, run ```npm -v``` and ```npx -v```. Both should return whatever version is installed.

### Windows
Use the download manager at -> [https://nodejs.org/en/download].

### MacOS
Using _Homebrew_ is more convenient. Download **Homebrew** here -> [https://brew.sh].
Then, in a terminal run: ```brew install node```.

## Create-React-App

### Using ```npx```
To use, run ```npx create-react-app cra-test```.

This installs create-react-app and creates a new application named _cra-test_. Obviously, any name can be provided instead.

The ```x``` in npx means _execute_ so it is running npm with a specific executable. This is better than npm since it grabs the latest version from the npm registry, downloads, and caches it. 

Keep in mind, _it_ is referring to _create-react-app_ in this case.

### Using ```npm```
To use, run ```npm i -g create-react-app && create-react-app cra-test```.

This installs create-react-app and creates a new application named _cra-test_. Obviously, any name can be provided instead.

# Using Create-React-App
## ```npm start```
Once you have ```cd```-ed inside of the application. In this case if post create-react-app installation, do ```cd cra-test```.

Then, run ```npm start```. It will start a web server on your files and open a webpage on your default browser.

Assuming **Visual Studio Code** is installed, you can run ```code .``` to open up a window with the folder as the context.

### ```npm eject```
If, for whatever reason, you want to remove the abstraction of **Create-React-App** automatically compiling JSX, you can run ```npm run eject```. It will locally copy all configs and scripts used by the tool to be modified.

# Using a self-built environment
Follows the guide located at **Reactful** which is consistently updated after every major Node update -> [https://jscomplete.com/learn/1rd-reactful].
Uses:
- Express      (web server)
- Webpack      (module bundler)
- Babel        (JS/JSX compiler)

**OR**

Use the **Reactful** repository that sets all that up for you by running ```npx reactful my-react-app``` where _my-react-app_ can be any name.

# Appendix
Creating a development environment is no easy task and there are a lot of factors to consider. 

### Multiple Tools
- APIs
- Configurations
- Releases

### Multiple Environments
- Development
- Production
- Test

### Different Renderers
- DOM
- SSR
