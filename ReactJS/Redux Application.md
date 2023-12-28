# Intro to working with Redux

Redux is a centralized state store for React. The way it enforces this is different than traditional React.

**Redux enforces keeping all state in a single, centralized object graph.** It makes the app easier to understand and avoids the complexity of handling interations between multiple stores.

### Application Dependencie

Webpack, Babel, Node, ESLint.

## Build the App

In the root directory, run `npm install` to build the node_modules. Then, run `npm start`.

Incase you get the error `EADDRINUSE` which causes a build failure, change the port in package.json:
`"start": "webpack serve --config webpack.config.dev.js --port 3000"`
