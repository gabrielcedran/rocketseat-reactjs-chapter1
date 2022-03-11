# Rocketseat ReactJS Chapter 1

## Setting up the local environment

### Install node and npm

To ease node version management it recommended to use a version manager like nvm. It allows to easily install new versions and switch between them when working on multiple projects that require different versions at the same time.

### Install yarn package manager 

Yarn and npm have a lot of similarities (and compatibility). For many projects it doesn't really matter which one you use as both of them rely on the `package.json` file to manage the necessary dependency.

There are many ways of installing Yarn and one of them is using... npm :). To install using npm execute the command `npm install --global yarn`.

### Install VS Code, the relevant extensions and set up the default configuration

#### Intellij fonts:

To use the same fonts of intellij, download it from the jet brains website (https://www.jetbrains.com/lp/mono/) and install according to the OS.

Linux: extract the fonts into the folder `~/.local/share/fonts` or `/usr/share/fonts`.

MacOS: double click on the files with extension .ttf.

In the configutations search for editor.fontFamily and set it to `JetBrains Mono`.


## Booting up a new project from scratch (without create-react-app)

### Create the project's base structure

In the root path create two directories - `src` and `public`. Inside public add an index.html file.

### Create the package.json file

To create the file using yarn, use the command `yarn init -y`. To use npm `npm init -y`.

### Add react dependency

- react: `yarn add react` - core module
- react-dom: `yarn add react-dom` - module to work with web projects (to allow react to integrate with the dom api)


### Add babel dependency and its configuration

Babel converts new javascript features into javascript code compatible with browsers and their required versions (according to the configurations). It allows developers to use the new features independently of them being browser compatible as it will take care of converting it.

To install babel execute the command `yarn add -D @babel/core @babel/cli @babel/preset-env`.

- core: where most features of babel are in
- cli: it is used to be able to execute babel from the command line (e.g `yarn babel -h`)
- preset-env: it is an extension that helps to identify the environment that application is being executed to convert the code in the best way possible (server side or browser and which browser versions) 


In the root path create a file named `babel.config.js` and add the following content:

```
module.exports = {
    presets: [
        '@babel/preset-env', 
    ]
}
```

To convert files via the command line client, execute the command `yarn babel src/{file}.js --out-file dist/{file}.js`
 
#### Configure babel to support react

By default babel does not support react code (it does not expect html like tags within the javascript code). 

To do so add the react preset dependency (`yarn add -D @babel/preset-react`) and include it in the babel presets config (an extra entry with '@babel/preset-react')


### Configure a bundler tool (webpack in this case)

Bundlers convert the application source into code and files that browsers (or engines) understand. For instance convert sass files into css files and handle file dependencies (usually declared with the import keyword). Webpack uses loaders to perform this operation.

To install webpack run the command `yarn add -D webpack webpack-cli webpack-dev-server`. In the root path, create a file named `webpack.config.js` and add the following content:

```
const path = require('path') // good practice to have the project running independently of OS

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.jsx'), // Entry tells webpack which file it should use to start the bundling process. __dirname means `this directory`. 
    output: { // where the bundled project should be placed
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: { // which type of files webpack should work on
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            { // loader to delegate to the right tool the conversion before carrying out the bundling process. In other words, webpack delegates the conversion from jsx to js to babel before performing its own operations.
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    }
};
```
_To process jsx files, along with the proper configuration it is necessary to install babel-loader dependency `yarn add -D babel-loader`. It is the integration between webpack and babel._

In order to test that the basic configuration is working as expected, create two files: the index.jsx and another one. Import the second one in the index file and run the webpack command via terminal (`yarn webpack`). It should run free of errors and generate the correct file in the dist folder.



